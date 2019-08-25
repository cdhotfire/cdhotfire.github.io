module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-normalize'),
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 0
    })
  ]
}