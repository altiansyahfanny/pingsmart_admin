import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

import { RiArrowDropDownLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import {
	resetMkelasAndKelasAndPelajaran,
	selectFilter,
	setFilter,
} from '../../features/nilai/nilaiSlice';

const InputSelect = ({ label, data }) => {
	const dispatch = useDispatch();
	const { selectedJurusan } = useSelector(selectFilter);

	const handleOnChange = (jurusan) => {
		dispatch(resetMkelasAndKelasAndPelajaran({ type: 'JURUSAN' }));

		dispatch(
			setFilter({
				type: 'selectedJurusan',
				data: jurusan,
			})
		);
		dispatch(
			setFilter({
				type: 'selectedMKelasByJurusan',
				data: jurusan.m_kelas,
			})
		);
	};
	return (
		<div className="w-full ">
			<h6 className="block font-medium text-gray-600 text-sm tracking-wide mb-2">{label}</h6>
			<Listbox value={selectedJurusan} onChange={handleOnChange}>
				<div className="relative">
					<Listbox.Button className="relative w-full rounded-lg py-1 pl-3 pr-10 text-left border bg-gray-100  focus:bg-white focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-400">
						<span className="block truncate text-gray-800">
							{selectedJurusan.jurusan_nama ?? 'Pilih Jurusan'}
						</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<RiArrowDropDownLine style={{ fontSize: '28px', color: '#9CA3AF' }} />
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 divide-y">
							{data.map((jurusan, personIdx) => (
								<Listbox.Option
									key={personIdx}
									className={({ active }) =>
										`relative cursor-pointer select-none text-gray-800 ${
											active ? 'bg-gray-100' : 'text-gray-800'
										}`
									}
									value={jurusan}
								>
									{({ selected }) => (
										<>
											<span
												className={`block py-1 px-3 truncate ${
													selected && 'bg-blue-500 text-white'
												}`}
											>
												{jurusan.jurusan_nama ? jurusan.jurusan_nama : 'Pilih Jurusan'}
											</span>
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
};

export default InputSelect;
