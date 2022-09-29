import React from 'react';

const FormButton = ({ text, className = '', ...rest }) => {
	return (
		<button className={`${className} px-5 py-1 rounded-lg transition text-white`} {...rest}>
			{text}
		</button>
	);
};

export default FormButton;
