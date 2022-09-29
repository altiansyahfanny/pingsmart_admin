import { Menu, Transition } from '@headlessui/react';
import React, { useEffect } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BiBell, BiCommentDetail } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';

const Topbar = ({ minimize, setMinimize }) => {
	const handleMinimize = () => {
		setMinimize(!minimize);
	};
	const navigate = useNavigate();
	const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

	useEffect(() => {
		if (isSuccess) navigate('/');
	}, [isSuccess, navigate]);
	return (
		<div className="bg-ps-primary text-white  py-5 border-b-2 border-yellow-100 fixed inset-x-0 top-0 z-50">
			<div className="flex items-center justify-between">
				<div className={`${minimize ? 'w-[90px]' : 'w-[240px]'} px-6 transition-all duration-500`}>
					<h1 className={`font-pasicico text-2xl ${minimize && 'text-center'}`}>
						{minimize ? 'P' : 'PingSmart'}
					</h1>
				</div>
				<div className="flex flex-1 items-center justify-between transition-all duration-500">
					<button type="button" onClick={handleMinimize}>
						<GiHamburgerMenu color="#FFF" size={24} />
					</button>
					<div className="flex items-center gap-x-6 px-6">
						<div className="flex items-center gap-x-3 ">
							<BiCommentDetail size={20} />
							<BiBell size={20} />
						</div>
						<Menu as="div" className="relative">
							<Menu.Button className={'rounded font-pasicico '}>Altiasyah Fanny</Menu.Button>
							<Transition
								enter="transition"
								enterFrom="transform scale-95 opacity-0"
								enterTo="transform scale-100 opacity-100"
								leave="transition"
								leaveFrom="transform scale-100 opacity-100"
								leaveTo="transform scale-95 opacity-0"
							>
								<Menu.Items
									className={
										'absolute mt-2 w-32 rounded-lg overflow-hidden shadow right-0 bg-white text-ps-primary py-1'
									}
								>
									<Menu.Item
										as={'div'}
										className="flex gap-x-2 hover:bg-gray-200 px-2 py-2 text-xs text-ps-primary cursor-pointer"
									>
										{({ active }) => (
											<>
												<AiOutlineUser size={14} />
												<span>Akun</span>
											</>
										)}
									</Menu.Item>
									<Menu.Item
										as={'div'}
										className="flex gap-x-2 hover:bg-gray-200 px-2 py-2 text-xs text-ps-primary cursor-pointer"
									>
										{({ active }) => (
											<>
												<BsGear size={14} />
												<span>Pengaturan</span>
											</>
										)}
									</Menu.Item>
									<Menu.Item
										as={'div'}
										className="flex gap-x-2 hover:bg-gray-200 px-2 py-2 text-xs text-ps-primary cursor-pointer"
										onClick={sendLogout}
									>
										{({ active }) => (
											<>
												<MdLogout size={14} />
												<span>Keluar</span>
											</>
										)}
									</Menu.Item>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Topbar;
