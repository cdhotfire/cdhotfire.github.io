module.exports = {
    root: true,    
    parserOptions: {
	   "parser": "babel-eslint",
	   "ecmaVersion": 2017,
	   sourceType: 'module'
    },
    env: {
	   browser: true,
    },
    extends: [
	   'plugin:vue/essential',
	   'airbnb-base'
    ],
    plugins: [
	   'html',
	   'vue'
    ],
    rules: {
	   'no-mixed-spaces-and-tabs': 0,
	   'no-tabs': 0,
	   'global-require': 0,
	   'import/no-dynamic-require': 0,
	   'global-require': 0,
	   'linebreak-style': 0,
	   'max-len': 0,
	   'eol-last': 0,
	   'no-new': 0,
	   'import/first': 0,
	   'indent': 0,
	   'no-param-reassign': 0,
	   'no-underscore-dangle': 0
    }
}