import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { setCredentials } from '../../features/auth/authSlice';
import { errorToast, successToast } from '../../utils';
import { Loader, TextInput } from '../../components';
import { usePersist } from '../../hooks';
import { useCookies } from 'react-cookie';

const Login = () => {
	const errRef = useRef();

	const [email, setEmail] = useState('admin@pingsmart.com');
	const [password, setPassword] = useState('1234admin');
	// const [email, setEmail] = useState('sitiraudah@pingsmart.com');
	// const [password, setPassword] = useState('1234sitiraudah');
	const [errMsg, setErrMsg] = useState('');

	const [cookies, setCookie, removeCookie] = useCookies(['cookie-testing']);

	// console.log('cookies : ', cookies);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [persist, setPersist] = usePersist();

	const [login, { isError, isLoading }] = useLoginMutation();

	useEffect(() => {
		setErrMsg('');
	}, [email, password]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const form = {
			user_email: email,
			user_password: password,
		};

		try {
			const { accessToken, refreshToken } = await login(form).unwrap();

			dispatch(setCredentials({ accessToken }));
			setEmail('');
			setPassword('');
			navigate('/dash');
			successToast('Login Berhasil');

			// set cookie
			setCookie('jwt', refreshToken);
		} catch (err) {
			if (!err.status) {
				setErrMsg('No Server Response');
			} else if (err.status === 400) {
				setErrMsg('Missing email or Password');
			} else if (err.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg(err.data?.message);
			}

			// console.log(err);
			errorToast(err.data.error.data.message);
		}
	};

	const handleUserInput = (e) => setEmail(e.target.value);
	const handlePwdInput = (e) => setPassword(e.target.value);
	const handleToggle = () => setPersist((prev) => !prev);

	if (isLoading) return <Loader />;

	const content = (
		<section className="bg-gray-900 h-screen grid place-content-center text-white">
			<main className="bg-white p-8 rounded-lg w-[450px]">
				<form className="form" onSubmit={handleSubmit}>
					<div className="flex flex-col gap-y-2">
						<TextInput
							label="Email"
							type="text"
							name="email"
							className="w-full block'"
							// rest params
							onChange={handleUserInput}
							value={email}
							placeholder="Email"
						/>
						<TextInput
							label="Kata Sandi"
							type="password"
							name="password"
							className="w-full block"
							onChange={handlePwdInput}
							value={password}
							placeholder="Password"
						/>
						<div className="flex items-center mb-4">
							<input
								type="checkbox"
								id="persist"
								onChange={handleToggle}
								checked={persist}
								className="w-4 h-4"
							/>
							<label
								htmlFor="persist"
								className="ml-2 font-semibold text-gray-500 text-sm tracking-wide"
							>
								Tetap Login
							</label>
						</div>
						<div className="flex place-content-end">
							<button
								className="bg-blue-500 px-5 py-1.5 font-medium text-sm rounded-lg hover:bg-blue-600 active:bg-blue-300 transition"
								disabled={isLoading}
							>
								Login
							</button>
						</div>
					</div>
				</form>
				<Link to="/">Back to Home</Link>
			</main>
		</section>
	);

	return content;
};
export default Login;
