import React from 'react';
const Button = ({ onClick, children, className = '' }) => (
	<button
		onClick={onClick}
		className={` ${className} bg-ps-primary px-5 py-2 rounded-lg text-white text-sm font-medium hover:bg-gray-700 transition`}
	>
		{children}
	</button>
);

export default Button;
