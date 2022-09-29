import React, { useEffect, useState } from 'react';
import {
	AiOutlineCalendar,
	AiOutlineFileExclamation,
	AiOutlineFolder,
	AiOutlineSchedule,
	AiOutlineUserSwitch,
	AiOutlineWallet,
} from 'react-icons/ai';
import { BiBarChartAlt2, BiFingerprint } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';
import { FiDatabase, FiHelpCircle } from 'react-icons/fi';
import { GrAnnounce } from 'react-icons/gr';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { MdLogout, MdOutlineMapsHomeWork, MdOutlineSpaceDashboard } from 'react-icons/md';
import { TbUsers } from 'react-icons/tb';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';

const RenderIcon = ({ title }) => {
	switch (title) {
		case 'Dashboard':
			return <MdOutlineSpaceDashboard size={20} />;

		case 'Master':
			return <FiDatabase size={20} />;

		case 'User':
			return <TbUsers size={20} />;

		case 'Agenda':
			return <MdOutlineMapsHomeWork size={20} />;

		case 'Jadwal':
			return <AiOutlineSchedule size={20} />;

		case 'Nilai':
			return <BiBarChartAlt2 size={20} />;

		case 'Kalender Akademik':
			return <AiOutlineCalendar size={20} />;

		case 'Pengumuman':
			return <GrAnnounce size={20} />;

		case 'Galeri':
			return <HiOutlinePhotograph size={20} />;

		case 'Pelanggaran':
			return <AiOutlineFileExclamation size={20} />;

		case 'Mutasi':
			return <AiOutlineUserSwitch size={20} />;

		case 'Arsip Materi':
			return <AiOutlineFolder size={20} />;

		case 'Absensi':
			return <BiFingerprint size={20} />;

		case 'Pembayaran':
			return <AiOutlineWallet size={20} />;

		default:
			return <MdOutlineSpaceDashboard size={20} />;
	}
};

const NavigationLink = ({ title, href, minimize }) => {
	return (
		<NavLink
			to={href}
			className={({ isActive }) =>
				`p-2 flex gap-2 ${
					!minimize && 'w-full'
				}  bg-gray-200 rounded text-sm font-medium transition ${
					isActive
						? 'bg-ps-secondary text-white'
						: 'bg-gray-200 text-ps-primary hover:bg-ps-secondary hover:text-white'
				}`
			}
		>
			<RenderIcon title={title} />
			<span className={`${minimize ? 'hidden' : 'inline-block'}`}>{title}</span>
		</NavLink>
	);
};

const Sidebar = ({ minimize, setMinimize }) => {
	const navigate = useNavigate();
	const [visible, setVisible] = useState(false);

	const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

	useEffect(() => {
		if (isSuccess) navigate('/');
	}, [isSuccess, navigate]);

	let content;

	content = (
		<>
			<div className="flex flex-col gap-y-2">
				<NavigationLink minimize={minimize} title="Dashboard" href="" />
				<NavigationLink minimize={minimize} title="User" href="users" />
				<NavigationLink minimize={minimize} title="Master" href="master" />
				<NavigationLink minimize={minimize} title="Agenda" href="agenda" />
				<NavigationLink minimize={minimize} title="Jadwal" href="jadwal" />
				<NavigationLink minimize={minimize} title="Nilai" href="nilai" />
				<NavigationLink minimize={minimize} title="Kalender Akademik" href="akademik" />
				<NavigationLink minimize={minimize} title="Pengumuman" href="pengumuman" />
				<NavigationLink minimize={minimize} title="Galeri" href="galeri" />
				<NavigationLink minimize={minimize} title="Pelanggaran" href="pelanggaran" />
				<NavigationLink minimize={minimize} title="Mutasi" href="mutasi" />
				<NavigationLink minimize={minimize} title="Arsip Materi" href="arsip" />
				<NavigationLink minimize={minimize} title="Absensi" href="absensi" />
				<NavigationLink minimize={minimize} title="Pembayaran" href="pembayaran" />
			</div>
			<div className="mt-40 flex-col flex gap-y-2">
				<button
					type="button"
					className="w-full gap-2 bg-ps-secondary text-sm p-2 rounded text-white font-medium text-left flex items-center hover:bg-gray-200  hover:text-ps-primary transition "
				>
					<BsGear size={20} />
					{!minimize && <span>Pengaturan</span>}
				</button>
				<button
					type="button"
					className="w-full gap-2 bg-ps-secondary text-sm p-2 rounded text-white font-medium text-left flex items-center hover:bg-gray-200  hover:text-ps-primary transition "
				>
					<FiHelpCircle size={20} />
					{!minimize && <span>Bantuan</span>}
				</button>
				<button
					type="button"
					className="w-full gap-2 bg-ps-secondary text-sm p-2 rounded text-white font-medium text-left flex items-center hover:bg-gray-200  hover:text-ps-primary transition "
					onClick={sendLogout}
				>
					<MdLogout size={20} />
					{!minimize && <span>Keluar</span>}
				</button>
			</div>
		</>
	);

	return (
		<div
			className={`${
				minimize ? 'w-[90px]' : 'w-[240px]'
			} bg-ps-primary text-white fixed top-0 left-0 bottom-0 mt-[73px] overflow-y-scroll transition-all duration-500`}
		>
			<div className="p-6">{content}</div>
		</div>
	);
};

export default Sidebar;
