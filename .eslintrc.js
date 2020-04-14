module.exports = {
	"env": {
		"browser": true,
		"jest": true
	},
	"extends": "eslint:recommended",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module",
		"allowImportExportEverywhere": true
	},
	"rules": {
		"indent": [
			"error",
			4
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"eqeqeq": "error",
		"no-trailing-spaces": "error",
		"object-curly-spacing": [
			"error", "always"
		],
		"arrow-spacing": [
			"error", { "before" : true, "after" : true }
		],
		"no-console": 0,
		"no-unused-vars": [
			"warn"
		]
	}
}