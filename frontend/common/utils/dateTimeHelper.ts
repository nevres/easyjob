import formatDistance from "date-fns/formatDistance";
import bosnianLocale from "date-fns/locale/bs";
import englishLocale from "date-fns/locale/en-US";
import { SupportedLanguage } from "../i18n/i18next";

export function getUserFriendlyDate(date: Date, language: SupportedLanguage) {
  return formatDistance(date, new Date(), {
    addSuffix: true,
    locale: getDateFnsLanguageForSupportedLanguage(language)
  });
}

function getDateFnsLanguageForSupportedLanguage(language: SupportedLanguage) {
  switch (language) {
    case "bs":
      return bosnianLocale;
    case "en":
      return englishLocale;
    default:
      const _exhaustiveCheck: never = language;
      return _exhaustiveCheck;
  }
}
