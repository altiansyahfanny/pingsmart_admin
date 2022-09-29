import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Admin = () => {
	const [minimize, setMinimize] = useState(false);
	return (
		<div>
			<Topbar minimize={minimize} setMinimize={setMinimize} />
			<div className="w-full">
				<Sidebar minimize={minimize} setMinimize={setMinimize} />
				<div
					className={`${
						minimize ? 'ml-[90px]' : 'ml-[240px]'
					} pt-[73px] min-h-screen transition-all duration-500`}
				>
					<div className="p-6">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};
export default Admin;
