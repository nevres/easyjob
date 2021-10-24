import i18next, { Resource, ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next";
import bs from "./translations/bs";
import en from "./translations/en";

export const supportedLanguages = {
  en: "English",
  bs: "Bosanski",
} as const;

export type SupportedLanguage = keyof typeof supportedLanguages;

type Resources = Resource &
  Record<keyof typeof supportedLanguages, ResourceLanguage>;

const resources: Resources = {
  en: en as unknown as ResourceLanguage,
  bs: bs as unknown as ResourceLanguage,
};

i18next.use(initReactI18next).init({
  lng: "bs",
  fallbackLng: "en",
  supportedLngs: ["en", "bs"],
  nonExplicitSupportedLngs: true,
  interpolation: {
    escapeValue: false,
  },
  debug: process.env.NODE_ENV === "development",
  resources,
});

export default i18next;
