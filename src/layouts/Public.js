import { Link } from 'react-router-dom';

const Public = () => {
	const content = (
		<section className="bg-gray-900 h-screen grid place-content-center text-white relative">
			<div>
				<h1 className="text-5xl font-semibold">PingSmart</h1>
				<div className="mt-6 grid place-content-end">
					<Link
						to={'/login'}
						className="text-white px-5 py-1.5 text-sm font-medium w-full bg-blue-500 rounded-lg hover:bg-blue-600 transition "
					>
						Login
					</Link>
				</div>
			</div>
		</section>
	);
	return content;
};
export default Public;
