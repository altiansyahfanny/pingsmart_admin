import React, { useState } from 'react';
import InputSelect from './InputSelect';
import InputKelas from './InputKelas';

const InputPelajaran = ({ loadedPelajaran, guruMengajarPelajaranId }) => {
	const [pelajaran, setPelajaran] = useState({});

	let filteredPelajaran;

	if (guruMengajarPelajaranId.length > 0) {
		filteredPelajaran = guruMengajarPelajaranId.map((pelajaran_id) => {
			const result = loadedPelajaran.find((item) => {
				return item.pelajaran_id === pelajaran_id;
			});
			return result;
		});
	}

	return (
		<div className="flex flex-col gap-y-2">
			<InputSelect
				label="Pelajaran"
				data={filteredPelajaran}
				pelajaran={pelajaran}
				setPelajaran={setPelajaran}
			/>
			{pelajaran.pelajaran_id && <InputKelas />}
		</div>
	);
};

export default InputPelajaran;
