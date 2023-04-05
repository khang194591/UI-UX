import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getEnLocalesFromModules, getViLocalesFromModules } from "./utils";

const en = getEnLocalesFromModules();
const vi = getViLocalesFromModules();

export enum SupportLanguage {
  EN = "en",
  VI = "vi",
}

const resources = {
  [SupportLanguage.EN]: en,
  [SupportLanguage.VI]: vi,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: SupportLanguage.EN,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
