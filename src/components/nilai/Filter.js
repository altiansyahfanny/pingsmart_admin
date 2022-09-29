import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetJurusanQuery } from '../../features/jurusan/jurusanApiSlice';
import { resetFilter, selectFilter, setFilter } from '../../features/nilai/nilaiSlice';
import Button from '../Button';
import FormButton from '../FormButton';
import ModalFilter from '../ModalFilter';
import TextInput from '../TextInput';
import InputJurusan from './InputJurusan';
import InputKelas from './InputKelas';
import InputMKelas from './InputMKelas';
import InputPelajaran from './InputPelajaran';
import InputSelect from './InputSelect';

const Filter = ({ setParams }) => {
	const dispatch = useDispatch();
	const filter = useSelector(selectFilter);
	const {
		selectedMKelasByJurusan,
		selectedJurusan,
		selectedKelasByMKelasAndJurusan,
		selectedPelajaranKelasByKelasAndMKelasAndJurusan,
		selectedPelajaran,
		selectedKelas,
		isFilter,
	} = useSelector(selectFilter);

	const [isOpenModal, setIsOpenModal] = useState(false);

	const {
		data: jurusan,
		isLoading,
		isError,
		error,
	} = useGetJurusanQuery({
		search: '',
		page: 1,
		per_page: 100,
	});

	// console.log('jurusan : ', jurusan);
	// console.log('filter : ', filter);

	const handleCloseModal = () => {
		setIsOpenModal(false);
		dispatch(resetFilter());
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setParams({
			pelajaran_id: selectedPelajaran.pelajaran_id,
			kelas_id: selectedKelas.kelas_id,
			periode_id: 1,
		});

		dispatch(
			setFilter({
				type: 'isFilter',
				data: true,
			})
		);

		setIsOpenModal(false);
	};

	const canSubmit =
		[selectedPelajaran.pelajaran_id, selectedKelas.kelas_id].every(Boolean) && !isLoading;

	return (
		<div>
			<Button
				onClick={() => setIsOpenModal(true)}
				className={
					!isFilter && 'bg-gray-100 text-ps-primary border border-gray-300 hover:bg-gray-200'
				}
			>
				Filter
			</Button>
			<ModalFilter isOpen={isOpenModal} closeModal={handleCloseModal} title="Filter">
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-y-2">
						<InputSelect data={jurusan} label="Jurusan" />
						{selectedMKelasByJurusan.length > 0 && <InputMKelas label="Kelas" />}
						{selectedKelasByMKelasAndJurusan.length > 0 && <InputKelas label="Sub Kelas" />}
						{selectedPelajaranKelasByKelasAndMKelasAndJurusan.length > 0 && (
							<InputPelajaran label="Pelajaran" />
						)}
						<div className="flex place-content-end items-center gap-x-2">
							<FormButton
								text="Batal"
								className="bg-gray-100 hover:bg-gray-200 active:bg-gray-100 text-gray-600 border border-gray-300"
								type="button"
								onClick={() => setIsOpenModal(false)}
							/>
							<FormButton
								text="Filter"
								className="bg-blue-500 hover:bg-blue-600 active:bg-blue-500 disabled:bg-gray-100  disabled:text-gray-600 disabled:border border-gray-300"
								type="submit"
								disabled={!canSubmit}
							/>
						</div>
					</div>
				</form>
			</ModalFilter>
		</div>
	);
};

export default Filter;
