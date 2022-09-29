import { useGetUsersQuery } from '../../features/user/usersApiSlice';
import { HeadingContent, Loader, Table } from '../../components';

const UsersList = () => {
	const {
		data: users,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetUsersQuery('usersList', {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	console.log(users);

	let content;

	if (isLoading) content = <Loader />;

	if (isError) {
		content = <p className="errmsg">{error?.data?.message}</p>;
	}

	if (isSuccess) {
		content = (
			<Table>
				<Table.TH>
					<Table.THD>Nama</Table.THD>
					<Table.THD>Email</Table.THD>
					<Table.THD>Role</Table.THD>
				</Table.TH>
				<Table.TB>
					{users.data.map((user) => (
						<Table.TBR key={user.user_id}>
							<Table.TBD>{user.user_nama}</Table.TBD>
							<Table.TBD>{user.user_email}</Table.TBD>
							<Table.TBD>
								{user.role.map((role) => (
									<span key={role.role_id}>{role.role_nama}</span>
								))}
							</Table.TBD>
						</Table.TBR>
					))}
				</Table.TB>
			</Table>
		);
	}

	return (
		<div>
			<HeadingContent title={'User'} />
			{content}
		</div>
	);
};
export default UsersList;
