import { useTranslation } from "react-i18next";
import ITranslation from "./ITranslation";

export type TranslationFunc = (
  intlKey: keyof ITranslation["translation"]
) => string;

export default function useI18n(): TranslationFunc {
  const { t } = useTranslation();
  return (intlKey: keyof ITranslation["translation"]) => t(intlKey) as string;
}
