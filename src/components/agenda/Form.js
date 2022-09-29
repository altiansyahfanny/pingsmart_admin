import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateAgendaMutation, useGetPelajaranQuery } from '../../features';
import { setForm } from '../../features/agenda/agendaSlice';
import { useFetchAllGuruQuery } from '../../features/guru/guruApiSlice';
import { DateFormatForInput, errorToast, successToast } from '../../utils';
import { validationAgenda } from '../../utils/FormValidation';
import FormButton from '../FormButton';
import InputFile from '../InputFile';
import TextArea from '../TextArea';
import TextInput from '../TextInput';
import InputPelajaran from './InputPelajaran';

const getUnique = (array) => {
	const uniqueArray = [];

	for (let i = 0; i < array.length; i++) {
		if (uniqueArray.indexOf(array[i]) === -1) {
			uniqueArray.push(array[i]);
		}
	}
	return uniqueArray;
};

const Form = ({ closeModal }) => {
	const dispatch = useDispatch();
	const { data: loadedGuru } = useFetchAllGuruQuery();
	const { data: loadedPelajaran } = useGetPelajaranQuery();
	const [createAgenda, { isLoading: isLoadingCreateAgenda }] = useCreateAgendaMutation();

	const [suggentions, setSuggentions] = useState();
	const [guruMengajarPelajaranId, setGuruMengajarPelajaranId] = useState([]);

	const [inputGuru, setInputGuru] = useState('');
	const [errorInputGuru, setErrorInputGuru] = useState('');
	const handleInputGuru = (e) => {
		const value = e.target.value;

		let matches = [];
		if (value.length > 0) {
			matches = loadedGuru.filter((guru) => {
				const regex = new RegExp(`${value}`, 'gi');
				return guru.guru_nama.match(regex);
			});
		}

		setSuggentions(matches);
		setInputGuru(value);

		// to hide input pelajaran
		setGuruMengajarPelajaranId([]);
	};

	const handleSelectGuru = (guru) => {
		setInputGuru(guru.guru_nama);

		const duplicateGuruMengajarPelajaranId = guru.guru_mengajar.map((guru_mengajar) => {
			return guru_mengajar?.pelajaran_kelas?.pelajaran_id;
		});

		setGuruMengajarPelajaranId(getUnique(duplicateGuruMengajarPelajaranId));
		dispatch(
			setForm({
				type: 'guruMengajar',
				data: guru.guru_mengajar,
			})
		);
	};

	const attcRef = useRef();
	const [file, setFile] = useState(null);
	const [attcPrev, setAttcPrev] = useState('');

	const onFileUpload = (e) => {
		const file = e.target.files[0];
		setFile(file);
		setAttcPrev(file.name);
	};

	const { kelasId: formKelas, pelajaranKelasId: formPelajaranKelas } = useSelector(
		(state) => state.agenda.form
	);

	const handleSubmit = async (form) => {
		console.log(form);

		if (!inputGuru.length) {
			setErrorInputGuru('Guru tidak boleh kosong.');
		} else if (formKelas.length < 1 || formPelajaranKelas.length < 1) {
			errorToast('Semua field harus terisi');
		} else {
			const post = new FormData();

			for (const key in form) {
				post.append(key, form[key]);
			}

			post.append('path_materi', file);

			for (let i = 0; i < formKelas.length; i++) {
				post.append('kelas_id[]', formKelas[i]);
			}

			for (let i = 0; i < formPelajaranKelas.length; i++) {
				post.append('pelajaran_kelas_id[]', formPelajaranKelas[i]);
			}

			for (var pair of post.entries()) {
				console.log(pair[0] + ', ' + pair[1]);
			}

			await createAgenda(post)
				.then((res) => {
					if (res.error) {
						const err = new Error('Ada Error Guys');
						err.message = res?.error?.data?.message ?? 'Erorr uy';
						throw err;
					} else {
						closeModal();
						successToast('Sukses menambah data');
					}
				})
				.catch((err) => {
					if (err?.message) {
						errorToast(err?.message);
					}
				});
		}
	};

	const initialValues = {
		agenda_id: '',
		tanggal_mulai: DateFormatForInput(new Date()),
		tanggal_selesai: '',
		agenda_nama: '',
		agenda_deskripsi: '',
		agenda_status: '1',
		guru_id: '',
		pelajaran_id: '',
	};

	const formik = useFormik({
		initialValues,
		validationSchema: validationAgenda,
		onSubmit: handleSubmit,
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="flex flex-col gap-y-2">
				<div className="relative">
					<TextInput
						label="Guru"
						type="text"
						name="guru_nama"
						className="w-full block"
						error={errorInputGuru}
						onChange={handleInputGuru}
						value={inputGuru}
						placeholder="Nama Guru"
						onBlur={() =>
							setTimeout(() => {
								setSuggentions([]);
							}, 300)
						}
					/>
					{suggentions?.length > 0 && (
						<div className="border mt-2 rounded-lg absolute top-16 bg-white inset-x-0 divide-y overflow-hidden shadow-lg">
							{suggentions.slice(0, 6).map((guru) => (
								<div
									key={guru.guru_id}
									className="py-1 px-3 hover:bg-gray-100 cursor-pointer"
									onClick={() => handleSelectGuru(guru)}
								>
									{guru.guru_nama}
								</div>
							))}
						</div>
					)}
				</div>
				{guruMengajarPelajaranId.length > 0 && (
					<InputPelajaran
						loadedPelajaran={loadedPelajaran}
						guruMengajarPelajaranId={guruMengajarPelajaranId}
					/>
				)}
				<TextInput
					label="Judul"
					type="text"
					name="agenda_nama"
					error={formik.errors.agenda_nama}
					className="w-full block"
					onChange={formik.handleChange}
					value={formik.values.agenda_nama}
					placeholder="Judul Agenda"
				/>
				<div className="grid grid-cols-2 gap-2">
					<TextInput
						label="Tanggal"
						type="date"
						name="tanggal_mulai"
						error={formik.errors.tanggal_mulai}
						className="w-full block"
						onChange={formik.handleChange}
						value={formik.values.tanggal_mulai}
						disabled
					/>
					<TextInput
						label="Batas Waktu"
						type="date"
						name="tanggal_selesai"
						error={formik.errors.tanggal_selesai}
						className="w-full block"
						onChange={formik.handleChange}
						value={DateFormatForInput(formik.values.tanggal_selesai)}
					/>
				</div>
				<TextArea
					label="Deskripsi"
					type="text"
					name="agenda_deskripsi"
					error={formik.errors.agenda_deskripsi}
					className="w-full block"
					onChange={formik.handleChange}
					value={formik.values.agenda_deskripsi}
					placeholder="Deskripsi Agenda"
				/>

				<div>
					<InputFile imageRef={attcRef} handleChange={onFileUpload} />
					<FormButton
						text={`Lampiran ${attcPrev && ': ' + attcPrev}`}
						type="button"
						className="bg-red-500  hover:bg-red-600 active:bg-red-500 w-full"
						disabled={false}
						onClick={() => attcRef.current.click()}
					/>
				</div>

				<div className="flex place-content-end items-center gap-x-2">
					<FormButton
						text="Batal"
						className="bg-gray-100 hover:bg-gray-200 active:bg-gray-100 text-gray-600"
						type="button"
						disabled={isLoadingCreateAgenda}
						onClick={closeModal}
					/>
					<FormButton
						text="Simpan"
						className="bg-blue-500 hover:bg-blue-600 active:bg-blue-500"
						type="submit"
						disabled={isLoadingCreateAgenda}
					/>
				</div>
			</div>
		</form>
	);
};

export default Form;
