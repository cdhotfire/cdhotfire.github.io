module.exports = {
  gifsicle: { optimizationLevel: 2, interlaced: false, colors: 10 },
  mozjpeg: { progressive: true, quality: 90 },
  pngquant: { quality: [0.8, 0.9] },
  svgo: {
    plugins: [{ removeViewBox: false }, { cleanupIDs: true }]
  },
  webp: { quality: 90 }
};
