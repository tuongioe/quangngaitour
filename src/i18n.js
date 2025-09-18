import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import vn from "./locales/vn/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vn: { translation: vn },
  },
  lng: localStorage.getItem("lang") || "vn", // ngôn ngữ mặc định
  fallbackLng: "vn",
  interpolation: { escapeValue: false },
});

export default i18n;
