import pkg from "./package.json";
export default {
	input: pkg.source,
	output: [
		{
			name: pkg.name,
			file: pkg.unpkg,
			sourcemap: true,
			format: "umd"
		},
		{
			file: pkg.module,
			sourcemap: true,
			format: "es"
		}
	]
};
