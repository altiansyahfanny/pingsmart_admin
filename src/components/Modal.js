import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

const Modal = ({ title, isOpen, setIsOpen, children }) => {
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
						<div className="fixed inset-0 bg-black bg-opacity-70 z-40" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto z-50">
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
								<Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
									<div className="flex items-center justify-between">
										<Dialog.Title
											as="h3"
											className="text-xl font-medium leading-6 text-ps-primary font-pasicico"
										>
											{`~ ${title} ~`}
										</Dialog.Title>
										<button
											type="button"
											className="font-medium border w-7 rounded-full text-gray-800 aspect-square grid place-content-center hover:bg-gray-100 transition hover:scale-110 hover:shadow hover:text-gray-600"
											onClick={() => closeModal()}
										>
											X
										</button>
									</div>
									<hr className="my-4" />
									<div className="">{children}</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default Modal;
