import { useLocation, Navigate, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../hooks';

const RequireAuth = ({ allowedRoles }) => {
	const location = useLocation();
	const auth = useAuth();

	const content = auth.user_role.some((role) => allowedRoles.includes(role)) ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);

	return content;
};
export default RequireAuth;
