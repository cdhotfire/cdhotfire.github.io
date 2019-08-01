module.exports = {
	root: true,    	
	esversion: 6,
    parserOptions: {
	   "parser": "babel-eslint",
	   "ecmaVersion": 2017,
	   sourceType: 'module'
    },
    env: {
	   browser: true,
    },
    extends: [
	   'airbnb-base'
	],
    plugins: [
	   'html',
	   'vue'
    ]
};