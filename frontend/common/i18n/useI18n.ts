import { useTranslation } from "react-i18next";
import ITranslation from "./ITranslation";
import { TFunction } from "i18next";

export type TranslationFunc = (
  intlKey: keyof ITranslation["translation"]
) => TFunction;

export default function useI18n(): TranslationFunc {
  const { t } = useTranslation();
  return (intlKey: keyof ITranslation["translation"]) =>
    t(intlKey) as TranslationFunc;
}
