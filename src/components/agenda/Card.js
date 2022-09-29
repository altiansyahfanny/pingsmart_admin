import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import { BiInfoSquare } from 'react-icons/bi';
import { DateFormat } from '../../utils';

const KelasPill = ({ kelas }) => (
	<span
		className={`w-8 aspect-square bg-${kelas.m_kelas.jurusan.warna}-500 grid place-content-center text-white font-medium rounded-full text-xs`}
	>
		{kelas.m_kelas.m_kelas_nama + '' + kelas.sub_kelas.sub_kelas_nama}
	</span>
);

const Card = ({ agenda, setShowDetail, setSelectedAgenda, setShowAlert }) => {
	const [showAction, setShowAction] = useState(false);

	const handleClickInfo = () => {
		setShowDetail(true);
		setShowAction(false);
		setSelectedAgenda(agenda);
	};

	const handleClickHapus = () => {
		setShowDetail(false);
		setShowAlert(true);
		setShowAction(false);
		setSelectedAgenda(agenda);
	};

	return (
		<div className="relative">
			<div
				className="relative z-10 bg-white flex-1 border rounded-lg shadow cursor-pointer hover:bg-gray-100"
				onClick={() => setShowAction(!showAction)}
			>
				<div className="flex items-center justify-between border-b py-2 px-4">
					<h2 className="font-pasicico text-lg text-gray-700">
						{agenda.pelajaran_kelas[0].pelajaran.pelajaran_nama}
					</h2>
					<div className="flex items-center gap-1">
						{agenda.kelas.map((kelas) => (
							<KelasPill key={kelas.kelas_id} kelas={kelas} />
						))}
					</div>
				</div>
				<div className="py-2 px-4">
					<h3 className="text-gray-700 font-medium text-lg">{agenda.agenda_nama}</h3>
					<p className="text-gray-500">{agenda.agenda_deskripsi}</p>

					<div className="mt-4">
						<span>Batas Akhir : </span>
						<span className="text-gray-100 text-sm bg-ps-primary py-1 px-2 rounded-lg">
							{DateFormat(agenda.tanggal_selesai)}
						</span>
					</div>
				</div>
			</div>
			<div
				className={` ${
					showAction ? 'translate-x-48  opacity-100' : 'opacity-0'
				} absolute top-0 bottom-0 bg-white flex-1 border right-1 p-4 z-0 rounded-lg transition-all duration-500 ease-in-out`}
			>
				<div className="w-36 flex flex-col justify-between h-full">
					<button
						className="w-full border rounded-lg px-3 py-1.5 flex items-center gap-x-4 hover:bg-gray-200 text-ps-primary text-sm font-medium"
						onClick={() => setShowAction(false)}
					>
						<BiEdit size={20} />
						<span>Edit</span>
					</button>
					<button
						className="w-full border rounded-lg px-3 py-1.5 flex items-center gap-x-4 hover:bg-gray-200 text-ps-primary text-sm font-medium"
						onClick={handleClickHapus}
					>
						<FiTrash2 size={20} />
						<span>Hapus</span>
					</button>
					<button
						className="w-full border rounded-lg px-3 py-1.5 flex items-center gap-x-4 hover:bg-gray-200 text-ps-primary text-sm font-medium"
						onClick={handleClickInfo}
					>
						<BiInfoSquare size={20} />
						<span>Info</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
