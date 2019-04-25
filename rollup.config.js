import pkg from "./package.json";
import size from "rollup-plugin-bundle-size";
import { terser } from "rollup-plugin-terser";

let plugins = [terser(), size()];

export default {
	input: pkg.source,
	output: [
		{
			file: pkg.module,
			sourcemap: true,
			format: "es"
		}
	],
	plugins
};
