import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setForm } from '../../features/agenda/agendaSlice';

const InputKelas = () => {
	const dispatch = useDispatch();
	const { guruMengajar, pelajaranId, kelasId, pelajaranKelasId } = useSelector(
		(state) => state.agenda.form
	);

	// const [selectedPelajaranKelas, setSelectedPelajaranKelas] = useState(pelajaranKelasId);
	// const [formKelas, setFormKelas] = useState(kelasId);

	const filteredGuruMengajar = guruMengajar?.filter((guruMengajar) => {
		return guruMengajar.pelajaran_kelas.pelajaran_id === pelajaranId;
	});

	const pelajaranKelas = filteredGuruMengajar?.map((guruMengajar) => guruMengajar.pelajaran_kelas);

	const handleClick = (pk) => {
		if (pelajaranKelasId.includes(pk.pelajaran_kelas_id)) {
			const index = pelajaranKelasId.indexOf(pk.pelajaran_kelas_id);

			const temp = [...pelajaranKelasId];
			temp.splice(index, 1);

			dispatch(
				setForm({
					type: 'pelajaranKelasId',
					data: [...temp],
				})
			);
		} else {
			dispatch(
				setForm({
					type: 'pelajaranKelasId',
					data: [...pelajaranKelasId, pk.pelajaran_kelas_id],
				})
			);
		}

		if (kelasId.includes(pk.kelas_id)) {
			const index = kelasId.indexOf(pk.kelas_id);

			const temp = [...kelasId];
			temp.splice(index, 1);

			dispatch(
				setForm({
					type: 'kelasId',
					data: [...temp],
				})
			);
		} else {
			dispatch(
				setForm({
					type: 'kelasId',
					data: [...kelasId, pk.kelas_id],
				})
			);
		}
	};

	return (
		<div>
			<div
				className="block font-medium text-gray-600 text-sm tracking-wide mb-2"
				onClick={() => console.log(pelajaranKelasId)}
			>
				Daftar Kelas :
			</div>
			<div className="flex items-center gap-x-2">
				{pelajaranKelas?.map((pk) => (
					<div
						key={pk.pelajaran_kelas_id}
						className={`rounded-lg ${
							pelajaranKelasId.includes(pk.pelajaran_kelas_id)
								? 'bg-blue-500 border-blue-500'
								: 'bg-white hover:bg-gray-100'
						}  px-2 py-1 inline-block  cursor-pointer group border transition-all duration-200`}
						onClick={() => handleClick(pk)}
					>
						<span
							className={`${
								pelajaranKelasId.includes(pk.pelajaran_kelas_id) ? 'text-gray-100' : 'text-gray-700'
							} text-sm `}
						>
							{pk.kelas?.m_kelas?.m_kelas_nama}
							{pk.kelas?.sub_kelas?.sub_kelas_nama} - {pk.kelas?.m_kelas?.jurusan?.jurusan_nama}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default InputKelas;
