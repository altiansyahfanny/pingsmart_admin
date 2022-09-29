import React from 'react';

const InputFile = ({ imageRef, handleChange }) => {
	return (
		<div className="hidden">
			<input ref={imageRef} type="file" onChange={(e) => handleChange(e)} />
		</div>
	);
};

export default InputFile;
