import moment from 'moment';

export const DateFormatWithTime = (date) => {
	const local = moment(date).locale('id');

	return `${local.format('dddd, DD MMMM YYYY - hh.mm')} WIB`;
};

export const DateFormat = (date) => {
	const local = moment(date).locale('id');

	return `${local.format('dddd, DD MMMM YYYY')}`;
};

export const DateFormatNormal = (date) => {
	const local = moment(date).locale('id');

	return `${local.format('DD MMMM YYYY')}`;
};

export const DateFormatForInput = (date) => {
	const local = moment(date).locale('id');

	return `${local.format('YYYY-MM-DD')}`;
};

export const TimeFormat = (date) => {
	const local = moment(date).locale('id');

	return `${local.format('hh.mm')}`;
};
