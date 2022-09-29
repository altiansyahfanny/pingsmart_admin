import React from 'react';
import { useTitle } from '../hooks';

const HeadingContent = ({ title }) => {
	useTitle(`PingSmart ~ ${title}`);

	return (
		<h1 className="text-2xl font-medium tracking-tight text-ps-primary font-pasicico mb-4">{`~ ${title} ~`}</h1>
	);
};

export default HeadingContent;
