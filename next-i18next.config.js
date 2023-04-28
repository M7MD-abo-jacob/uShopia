const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
  react: { useSuspense: false },
  localeDetection: false,
  localePath: path.resolve("./public/locales"),
};
