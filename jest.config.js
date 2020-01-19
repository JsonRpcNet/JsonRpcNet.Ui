module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  transform: {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  verbose: true
};
