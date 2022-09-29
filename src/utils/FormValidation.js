import moment from 'moment';
import * as Yup from 'yup';

export const validationAgenda = Yup.object().shape({
	agenda_nama: Yup.string()
		.min(3, 'Judul harus lebih dari 3 karakter.')
		.max(50, 'Judul tidak boleh lebih dari 50 karakter.')
		.uppercase('Judul tidak boleh huruf kecil.')
		.required('Judul tidak boleh kosong.'),

	agenda_deskripsi: Yup.string()
		.min(3, 'Deskripsi harus lebih dari 3 karakter.')
		.max(50, 'Deskripsi tidak boleh lebih dari 50 karakter.')
		.uppercase('Deskripsi tidak boleh huruf kecil.')
		.required('Deskripsi tidak boleh kosong.'),
	tanggal_mulai: Yup.date()
		// .min(new Date(), 'Tanggal Mulai tidak boleh kurang dari hari ini')
		.required('Tanggal Mulai tidak boleh kosong.'),
	tanggal_selesai: Yup.date()
		// .min(new Date(), 'Tanggal Selesai tidak boleh kurang dari hari ini')
		.required('Tanggal Selesai tidak boleh kosong.'),
	agenda_status: Yup.string().required('Status tidak boleh kosong.'),
});
