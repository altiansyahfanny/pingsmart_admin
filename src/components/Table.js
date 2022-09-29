import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import { API_HOST } from '../config/api';

const Table = ({ children }) => {
	return (
		<div className="overflow-x-auto relative z-0">
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
				{children}
			</table>
		</div>
	);
};

const TH = ({ children }) => (
	<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
		<tr>{children}</tr>
	</thead>
);

const THD = ({ children, textAlign = 'left' }) => (
	<th scope="col" className={`text-${textAlign} py-3 px-6`}>
		{children}
	</th>
);

const TB = ({ children }) => <tbody>{children}</tbody>;

const TBR = ({ children }) => (
	<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">{children}</tr>
);

const TBD = ({ children, textAlign = 'left' }) => (
	<th
		scope="row"
		className={` text-${textAlign} py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white`}
	>
		{children}
	</th>
);

const Image = ({ src, alt = 'foto' }) => {
	return (
		<div className="grid place-content-center">
			<div className="grid place-content-center border-[1.5px] border-white rounded-full w-10 h-10">
				<img src={`${API_HOST}/${src}`} alt={alt} className="object-cover w-8 h-8 rounded-full" />
			</div>
		</div>
	);
};

const Action = ({ children }) => <div className="flex items-center gap-x-2">{children}</div>;

const ActionButton = ({ onClick, isEdit = true }) => (
	<button type="button" onClick={onClick}>
		{isEdit ? <BiEdit size={18} /> : <FiTrash2 size={18} />}
	</button>
);

Table.TH = TH;
Table.THD = THD;
Table.TB = TB;
Table.TBR = TBR;
Table.TBD = TBD;
Table.Img = Image;
Table.Action = Action;
Table.ActionButton = ActionButton;

export default Table;
