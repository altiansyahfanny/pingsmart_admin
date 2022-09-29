import moment from 'moment';
import localization from 'moment/locale/id';

import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ROLES } from './config/roles';

import { Layout, Public, Admin, Master, RequireAuth, PersistLogin } from './layouts';

import { Dashboard, Guru, Murid, Pelajaran, Agenda, Jadwal, Nilai, User, Login } from './pages';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	moment.updateLocale('id', localization);

	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Public />} />
					<Route path="login" element={<Login />} />
					<Route element={<PersistLogin />}>
						<Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
							<Route path="dash" element={<Admin />}>
								<Route index element={<Dashboard />} />
								<Route path="master">
									<Route index element={<Master />} />
									<Route path="guru" element={<Guru />} />
									<Route path="murid" element={<Murid />} />
									<Route path="pelajaran" element={<Pelajaran />} />
								</Route>
								<Route path="agenda" element={<Agenda />} />
								<Route path="jadwal" element={<Jadwal />} />
								<Route path="nilai" element={<Nilai />} />
								<Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
									<Route path="users" element={<User />} />
								</Route>
							</Route>
						</Route>
					</Route>
				</Route>
			</Routes>
			<ToastContainer
				autoClose={3000}
				position="top-right"
				pauseOnHover={false}
				pauseOnFocusLoss={false}
			/>
		</>
	);
}

export default App;
