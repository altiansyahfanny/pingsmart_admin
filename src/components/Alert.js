import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

const Alert = ({ title, isOpen, setIsOpen, confirm, cancel }) => {
	const closeModal = () => setIsOpen(false);

	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={closeModal}>
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
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
									<div className="">
										<h2 className="text-2xl font-medium text-center">Yakin menghapus data?</h2>
										<div className="flex items-center gap-x-2 mt-6 justify-center">
											<button
												type="button"
												className="w-20 py-2 bg-red-500 hover:bg-red-400 transition text-white rounded-lg"
												onClick={confirm}
											>
												Hapus
											</button>
											<button
												type="button"
												className="w-20 py-2 bg-gray-500 hover:bg-gray-400 transition text-white rounded-lg"
												onClick={cancel}
											>
												Batal
											</button>
										</div>
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

export default Alert;
