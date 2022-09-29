import { useFormik } from 'formik';
import React from 'react';
import TextInput from '../TextInput';

const Form = ({ closeModal }) => {
	const isLoading = false;

	const initialValues = {
		tipe_guru_id: '',
		status_guru_id: '',
		agama_id: '',
		guru_nik: '',
		guru_npwp: '',
		guru_nip: '',
		guru_nama: '',
		guru_jenis_kelamin: '',
		guru_alamat: '',
		guru_email: '',
		guru_telepon: '',
		guru_tempat_lahir: '',
		guru_tanggal_lahir: '',
		guru_tanggal_bergabung: '',
		guru_status_nikah: '',

		path_foto: '',
		path_kartu_keluarga: '',
	};

	const onSubmit = async (form) => {
		console.log('submit : ', form);
	};

	const formik = useFormik({
		initialValues,
		// validationSchema: validationGuru,
		onSubmit: onSubmit,
	});

	return (
		<form className="form" onSubmit={formik.handleSubmit}>
			<div className="flex flex-col gap-y-2">
				<div className="grid grid-cols-2 gap-4">
					<TextInput
						type="text"
						label="Nama"
						name="guru_nama"
						className="w-full block"
						// rest params
						onChange={formik.handleChange}
						value={formik.values.guru_nama}
						placeholder="Nama"
					/>
					<TextInput
						type="number"
						label="NIP"
						name="guru_nip"
						className="w-full block"
						onChange={formik.handleChange}
						value={formik.values.guru_nip}
						placeholder="NIP"
					/>
				</div>

				<div className="flex place-content-end items-center gap-2">
					<button
						type="button"
						className="bg-gray-100 border border-dashed px-3 py-1 rounded-lg hover:bg-gray-200 active:bg-gray-200 transition text-gray-600"
						disabled={isLoading}
						onClick={closeModal}
					>
						Batal
					</button>
					<button
						className="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600 active:bg-blue-300 transition text-white"
						disabled={isLoading}
					>
						Simpan
					</button>
				</div>
			</div>
		</form>
	);
};

export default Form;
