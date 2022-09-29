import React from 'react';
import { DateFormatForInput } from '../../utils';

const KelasPill = ({ kelas }) => (
	<span
		className={`w-8 aspect-square bg-${kelas.m_kelas.jurusan.warna}-500 grid place-content-center text-white font-medium rounded-full text-xs`}
	>
		{kelas.m_kelas.m_kelas_nama + '' + kelas.sub_kelas.sub_kelas_nama}
	</span>
);

const CardDetail = ({ agenda, setShowDetail }) => {
	return (
		<div className="border rounded-lg p-4 shadow flex-col flex gap-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl text-gray-700">
					{agenda?.pelajaran_kelas[0]?.pelajaran?.pelajaran_nama}
				</h1>
				<button
					type="button"
					className="font-medium cursor-pointer bg-gray-200 w-7 rounded-full text-gray-800 aspect-square grid place-content-center hover:bg-gray-300 transition"
					onClick={() => setShowDetail(false)}
				>
					X
				</button>
			</div>

			<div>
				<h2 className="text-gray-700 font-medium text-lg">{agenda?.agenda_nama}</h2>
				<p className="text-gray-500 text-sm">{agenda?.agenda_deskripsi}</p>
			</div>

			<div className="">
				<h5 className="font-pasicico text-gray-700">Kelas :</h5>
				<div className="flex items-center gap-1 mt-2">
					{agenda?.kelas.map((kelas) => (
						<KelasPill key={kelas.kelas_id} kelas={kelas} />
					))}
				</div>
			</div>

			<p className=" text-sm text-gray-500">
				{DateFormatForInput(agenda?.tanggal_mulai)}
				{' - '}
				<span className="bg-ps-primary px-3 py-0.5 text-white rounded-lg">
					{DateFormatForInput(agenda?.tanggal_selesai)}
				</span>
			</p>
		</div>
	);
};

export default CardDetail;
