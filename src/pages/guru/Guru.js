import React, { useState } from 'react';
import { Button, HeadingContent, Loader, Table } from '../../components';
import { useGetGuruQuery } from '../../features';
import { BiEdit } from 'react-icons/bi';
import Modal from '../../components/Modal';
import Form from '../../components/guru/Form';

const ButtonAdd = ({ setIsOpen }) => (
	<button
		onClick={() => setIsOpen(true)}
		className="bg-ps-primary px-3 py-1 rounded-lg text-gray-200 font-medium hover:bg-gray-700 transition"
	>
		Tambah Guru
	</button>
);

const Guru = () => {
	const per_page = 4;
	const [counter, setcounter] = useState(1);
	const [keyword, setKeyword] = useState('');
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('');

	const [isOpen, setIsOpen] = useState(false);

	const {
		data: guru,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetGuruQuery({
		search: search,
		page: counter,
		per_page,
		filter,
	});

	let content;

	if (isLoading) content = <Loader />;

	if (isError) {
		content = <p className="errmsg">{error?.data?.message}</p>;
	}

	if (isSuccess) {
		content = (
			<Table>
				<Table.TH>
					<Table.THD textAlign="center">Foto</Table.THD>
					<Table.THD>Nama</Table.THD>
					<Table.THD>NIP</Table.THD>
					<Table.THD>Email</Table.THD>
					<Table.THD>No. Telepon</Table.THD>
					<Table.THD>Jenis Kelamin</Table.THD>
					<Table.THD>Aksi</Table.THD>
				</Table.TH>
				<Table.TB>
					{guru.map((guru) => (
						<Table.TBR key={guru.guru_id}>
							<Table.TBD textAlign="center">
								<Table.Img src={guru.path_foto} />
							</Table.TBD>
							<Table.TBD>{guru.guru_nip}</Table.TBD>
							<Table.TBD>{guru.guru_email}</Table.TBD>
							<Table.TBD>{guru.guru_telepon}</Table.TBD>
							<Table.TBD>{guru.guru_telepon}</Table.TBD>
							<Table.TBD>{guru.guru_jenis_kelamin}</Table.TBD>
							<Table.TBD>
								<Table.Action>
									<Table.ActionButton onClick={() => console.log('edit')} />
									<Table.ActionButton onClick={() => console.log('delete')} isEdit={false} />
								</Table.Action>
							</Table.TBD>
						</Table.TBR>
					))}
				</Table.TB>
			</Table>
		);
	}
	return (
		<div className="">
			<HeadingContent title={'Guru'} />
			<div className="grid place-content-end mb-2">
				<Button onClick={() => setIsOpen(true)}>Tambah Guru</Button>
			</div>
			{content}
			<Modal title="Tambah Guru" isOpen={isOpen} setIsOpen={setIsOpen}>
				<Form closeModal={() => setIsOpen(false)} />
			</Modal>
		</div>
	);
};

export default Guru;
