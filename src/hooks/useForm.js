export const handleChangeForm = (e) => {
	const value = e.target.value;
	const name = e.target.name;

	if (name !== 'tanggal_selesai') {
		setFormAgenda({ ...form, [name]: value });
	} else {
		setFormAgenda({ ...form, [name]: new Date(value) });
	}
};
