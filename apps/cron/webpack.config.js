const { NxWebpackPlugin } = require('@nx/webpack')
const { join } = require('path')

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/cron'),
  },
  plugins: [
    new NxWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      outputFileName: 'dist/apps/api/main.js',
      optimization: false,
      outputHashing: 'none',
    }),
  ],
}
