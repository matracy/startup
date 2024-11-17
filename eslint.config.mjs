import globals from "globals";
import pluginJs from "@eslint/js";

export default [
	{
		files: ["**/*.js"],
		ignores: ["**/dist/*"],
		languageOptions: {
			sourceType: "module",
			globals: { ...globals.node, ...globals.express },
		},
	},
	pluginJs.configs.recommended,
];
