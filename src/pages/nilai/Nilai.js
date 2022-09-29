import React, { useState } from 'react';
import { Button, HeadingContent } from '../../components';
import Filter from '../../components/nilai/Filter';

const Nilai = () => {
	const [params, setParams] = useState({
		pelajaran_id: 1,
		kelas_id: 1,
		periode_id: 1,
	});

	console.log('params : ', params);

	return (
		<div>
			<HeadingContent title={'Nilai'} />
			<div className="flex items-center justify-end gap-x-2">
				<Filter setParams={setParams} />
				<Button onClick={() => {}}>Tambah Nilai</Button>
			</div>
		</div>
	);
};

export default Nilai;
