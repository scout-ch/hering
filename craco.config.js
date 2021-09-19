const CracoLessPlugin = require("craco-less");

const emotionBabelPreset = require("@emotion/babel-preset-css-prop").default(
  undefined,
  {} // emotion preset options
);

module.exports = {
  plugins: [{ plugin: CracoLessPlugin }],
  babel: {
    plugins: [
      ...emotionBabelPreset.plugins
    ]
  }
};
