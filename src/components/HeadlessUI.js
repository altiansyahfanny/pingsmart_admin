import React, { Fragment, useState } from 'react';
import { Menu, Transition, Dialog, Listbox } from '@headlessui/react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { HiCheck } from 'react-icons/hi';

const people = [
	{ name: 'Wade Cooper' },
	{ name: 'Arlene Mccoy' },
	{ name: 'Devon Webb' },
	{ name: 'Tom Cook' },
	{ name: 'Tanya Fox' },
	{ name: 'Hellen Schmidt' },
];

const InputSelect = () => {
	const [selected, setSelected] = useState(people[0]);

	return (
		<div className=" w-72">
			<Listbox value={selected} onChange={setSelected}>
				<div className="relative mt-1">
					<Listbox.Button className="relative w-full rounded bg-white py-2 pl-3 pr-10 text-left border-2 border-indigo-500">
						<span className="block truncate text-indigo-900">{selected.name}</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<RiArrowDropDownLine style={{ fontSize: '28px', color: '#6366F1' }} />
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{people.map((person, personIdx) => (
								<Listbox.Option
									key={personIdx}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${
											active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
										}`
									}
									value={person}
								>
									{({ selected }) => (
										<>
											<span
												className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
											>
												{person.name}
											</span>
											{selected ? (
												<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
													<HiCheck style={{ fontSize: '16px', color: '#6366F1' }} />
												</span>
											) : null}
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

const Modal = () => {
	const [isOpen, setIsOpen] = useState(false);

	const closeModal = () => setIsOpen(false);

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className={
					'bg-indigo-500 px-5 py-2 rounded text-indigo-50 hover:bg-indigo-600 transition opacity-100 '
				}
			>
				Open Modal
			</button>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10 " onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-70" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
										Payment successful
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											Your payment has been successfully submitted. We’ve sent you an email with all
											of the details of your order.
										</p>
									</div>

									<div className="mt-4">
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeModal}
										>
											Got it, thanks!
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

const Dropdown = () => (
	<Menu as="div" className="relative">
		<Menu.Button
			className={
				'bg-indigo-500 px-5 py-2 rounded text-indigo-50 hover:bg-indigo-600 transition opacity-100 '
			}
		>
			Dropdown
		</Menu.Button>
		<Transition
			enter="transition"
			enterFrom="transform scale-95 opacity-0"
			enterTo="transform scale-100 opacity-100"
			leave="transition"
			leaveFrom="transform scale-100 opacity-100"
			leaveTo="transform scale-95 opacity-0"
		>
			<Menu.Items className={'absolute border border-gray-300 mt-2 w-40 rounded divide-y'}>
				<Menu.Item className="block hover:bg-gray-200 p-2">
					{({ active }) => (
						<a className={`${active && 'bg-blue-500'}`} href="/account-settings">
							Profile
						</a>
					)}
				</Menu.Item>
				<Menu.Item className="block hover:bg-gray-200 p-2">
					{({ active }) => (
						<a className={`${active && 'bg-blue-500'}`} href="/account-settings">
							Settings
						</a>
					)}
				</Menu.Item>
				<Menu.Item className="block hover:bg-gray-200 p-2">
					{({ active }) => (
						<a className={`${active && 'bg-blue-500'}`} href="/account-settings">
							Logout
						</a>
					)}
				</Menu.Item>
			</Menu.Items>
		</Transition>
	</Menu>
);

const HeadlessUI = () => {
	return (
		<div className="min-h-screen flex justify-center items-center">
			<div className=" flex items-center gap-2">
				<Modal />
				<Dropdown />
				<InputSelect />
			</div>
		</div>
	);
};

export default HeadlessUI;
