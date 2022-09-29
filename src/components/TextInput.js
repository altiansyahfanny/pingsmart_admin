import React from 'react';

const TextInput = ({ label, type = 'text', name, error, className, ...rest }) => {
	return (
		<div>
			<label htmlFor={name} className="block font-medium text-gray-600 text-sm tracking-wide mb-1">
				{label}
			</label>
			<input
				type={type}
				id={name}
				name={name}
				autoComplete="off"
				className={` ${className} py-1 px-3 rounded-lg text-gray-800 bg-gray-100 ${
					error ? 'border-red-500' : 'border-gray-200'
				}  border focus:bg-white focus:outline-none focus:ring focus:ring-sky-300 focus:border-sky-400`}
				{...rest}
			/>
			{error && <span className="inline-block text-xs text-red-500 ">{error}</span>}
		</div>
	);
};

export default TextInput;
