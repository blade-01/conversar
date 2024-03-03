// Importing i18n translations
import en from "./locales/en.json";
import jp from "./locales/jp.json";
import ar from "./locales/ar.json";
import sp from "./locales/sp.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en,
    sp,
    ar,
    jp
  }
}));
