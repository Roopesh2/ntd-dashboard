import { defineConfig } from "vite";
import { resolve } from "path";
import { terser } from "rollup-plugin-terser";

export default defineConfig({
	build: {
		minify: "terser",
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
			},
			plugins: [
				terser({
					format: {
						comments: false,
					},

					mangle: {
						keep_classnames: false,
						reserved: [],
					},
				}),
			],
		},
	},
});
