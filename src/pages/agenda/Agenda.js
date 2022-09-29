import React, { useState } from 'react';
import { Button, HeadingContent, Loader } from '../../components';
import { Card, Form } from '../../components/agenda';
import CardDetail from '../../components/agenda/CardDetail';
import Alert from '../../components/Alert';
import Modal from '../../components/Modal';
import { useDeleteAgendaMutation, useGetAgendaQuery } from '../../features';
import { errorToast, infoToast, successToast } from '../../utils';

const Agenda = () => {
	const per_page = 4;
	const [counter, setCounter] = useState(1);
	const [search, setSearch] = useState('');
	const [pelajaranId, setpelajaranId] = useState('');
	const [kelasId, setKelasId] = useState('');

	const {
		data: agenda,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetAgendaQuery({
		search,
		page: counter,
		per_page: per_page,
		pelajaran_id: pelajaranId,
		kelas_id: kelasId,
	});

	const [isOpenModal, setIsOpenModal] = useState(false);
	const [selectedAgenda, setSelectedAgenda] = useState({});
	const [showAlert, setShowAlert] = useState(false);
	const [showDetail, setShowDetail] = useState(false);

	const [deleteAgenda] = useDeleteAgendaMutation();

	const handleHapus = async () => {
		setShowAlert(false);

		await deleteAgenda(selectedAgenda.agenda_id).then((res) => {
			if (!res.error) {
				successToast('Berhasil menghapus data!');
			} else if (res.error.data.statusCode === 404) {
				errorToast(res?.error?.data?.data?.message);
			} else {
				infoToast();
			}
		});
	};

	let content;

	if (isLoading) content = <Loader />;

	if (isError) {
		content = <p className="errmsg">{error?.data?.message}</p>;
	}

	if (isSuccess) {
		content = (
			// <div className={showDetail && 'grid grid-cols-2 gap-4'}>
			<div className={'grid grid-cols-2 gap-4'}>
				{/* <div className={`gap-4 ${showDetail ? 'flex flex-col ' : 'grid grid-cols-2'}`}> */}
				<div className={`gap-4 flex flex-col`}>
					{agenda.map((agenda) => (
						<Card
							key={agenda.agenda_id}
							agenda={agenda}
							setSelectedAgenda={setSelectedAgenda}
							setShowAlert={setShowAlert}
							setShowDetail={setShowDetail}
						/>
					))}
				</div>
				<div>
					{showDetail && <CardDetail agenda={selectedAgenda} setShowDetail={setShowDetail} />}
				</div>
			</div>
		);
	}
	return (
		<div>
			<HeadingContent title={'Agenda'} />
			<div className="grid place-content-end mb-2">
				<Button onClick={() => setIsOpenModal(true)}>Tambah Agenda</Button>
			</div>
			{content}
			<Modal title="Tambah Agenda" isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
				<Form closeModal={() => setIsOpenModal(false)} />
			</Modal>
			<Alert
				isOpen={showAlert}
				setIsOpen={setShowAlert}
				confirm={handleHapus}
				cancel={() => setShowAlert(false)}
			/>
		</div>
	);
};

export default Agenda;
