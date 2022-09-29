/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'ps-primary': '#111827',
				'ps-secondary': '#6B7280',
			},
			fontFamily: {
				pasicico: "'Pacifico', cursive",
			},
		},
	},
	plugins: [],
};
