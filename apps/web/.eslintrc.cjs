module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config"],
  settings: {
    "import/resolver": {
      typescript: {
        project: "./.nuxt/tsconfig.json",
      },
    },
  },
};
