
import type { Config } from "tailwindcss";

const config: Config = {
	
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	safelist: ["dark"],
	theme: {
		
		extend: {
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
		
			},
		
		}
	},
	presets: [require('cmds-tailwind-styles')],
	plugins: [require('@tailwindcss/typography')]
};

export default config;
