/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				primary: ['Rubik', 'sans-serif'],
				secondary: ['Mont', 'sans-serif'],
				code: ['"Cascadia Code"', 'monospace'],
			},
			colors : {
				codebg: '#2e3440' 
			}
		},
	},
	plugins: [],
}
