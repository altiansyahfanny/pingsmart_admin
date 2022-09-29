import { Link, Outlet } from 'react-router-dom';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { BsBook } from 'react-icons/bs';
import { HeadingContent } from '../../components';

const Master = () => {
	return (
		<div className="">
			<HeadingContent title="Master Data" />
			{/* <ul className="bg-ps-primary inline-flex text-white divide-x rounded-lg mt-4">
				<li>
					<Link className="w-28 text-center py-1 inline-block" to={'guru'}>
						Guru
					</Link>
				</li>
				<li>
					<Link className="w-28 text-center py-1 inline-block" to={'murid'}>
						Murid
					</Link>
				</li>
				<li>
					<Link className="w-28 text-center py-1 inline-block" to={'pelajaran'}>
						Pelajaran
					</Link>
				</li>
			</ul>

			<div className="mt-4">
				<Outlet />
			</div> */}
			<div className="grid grid-cols-3 gap-x-4 text-ps-primary">
				<Link to={'guru'}>
					<div className="border-2 border-ps-primary rounded-lg grid place-content-center h-64 hover:bg-ps-secondary hover:text-white transition  ">
						<FaChalkboardTeacher size={72} />
						<h6 className="text-center mt-2 font-medium text-lg">Guru</h6>
					</div>
				</Link>
				<Link to={'murid'}>
					<div className="border-2 border-ps-primary rounded-lg grid place-content-center h-64 hover:bg-ps-secondary hover:text-white transition ">
						<FaUserGraduate size={60} />
						<h6 className="text-center mt-2 font-medium text-lg">Murid</h6>
					</div>
				</Link>
				<Link to={'pelajaran'}>
					<div className="border-2 border-ps-primary rounded-lg grid place-content-center h-64 hover:bg-ps-secondary hover:text-white transition ">
						<BsBook size={64} />
						<h6 className="text-center mt-2 font-medium text-lg">Pelajaran</h6>
					</div>
				</Link>
			</div>
		</div>
	);
};
export default Master;
