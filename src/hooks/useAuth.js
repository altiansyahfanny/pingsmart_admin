import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
	const token = useSelector(selectCurrentToken);

	let isAdmin = false;
	let isGuru = false;
	let status = 'Unauthorized';

	if (token) {
		const decoded = jwtDecode(token);
		const { user_email, user_role } = decoded.user;

		isGuru = user_role.includes('Guru');
		isAdmin = user_role.includes('Admin');

		if (isGuru) status = 'Guru';
		if (isAdmin) status = 'Admin';

		return { user_email, user_role, status, isGuru, isAdmin };
	}

	return { user_email: '', user_role: [], status, isGuru, isAdmin };
};
export default useAuth;
