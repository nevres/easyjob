import { Address } from "../../api/Models/Address";
import { TranslationFunc } from "../../common/i18n/useI18n";
import { Price } from "../../api/Models/Price";
import { PriceType } from "../../api/Models/PriceType";
import { assertUnreachable } from "../../common/utils/tsHelper";
import { isNullOrUndefined } from "../../common/utils/jsHelper";
import { JobDurationType } from "../../api/Models/JobDurationType";

export function getUserFriendlyLocation(location: Address) {
  return location.city;
}

export function getUserFriendlyPrice(price: Price, translation: TranslationFunc): string {
  let priceType = price.priceType;
  if (!priceType) return "";
  ``;
  switch (priceType) {
    case PriceType.FixedPrice:
      return `${translation("fixedPrice")}: ${GetPriceAmount(price.minPrice, price.maxPrice)} ${price.currencyCode}`;
    case PriceType.Hourly:
      return `${translation("hourlyRate")}: ${GetPriceAmount(price.minPrice, price.maxPrice)} ${price.currencyCode}`;
    default:
      assertUnreachable(priceType);
  }
}

function GetPriceAmount(minPrice: number | undefined, maxPrice: number | undefined): string {
  if (isNullOrUndefined(minPrice)) throw "Min price should be provided";
  if (isNullOrUndefined(maxPrice) || maxPrice === 0) {
    return minPrice.toString();
  }
  return `${minPrice} - ${maxPrice}`;
}

export function getJobDurationTypeTranslation(type: JobDurationType, translation: TranslationFunc): string {
  switch (type) {
    case JobDurationType.LessThanADay:
      return translation("lessThanADay");
    case JobDurationType.LessThanAWeek:
      return translation("lessThanAWeek");
    case JobDurationType.LessThanAMonth:
      return translation("lessThanAMonth");
    case JobDurationType.OneToSixMonths:
      return translation("oneToSixMonths");
    case JobDurationType.MoreThanSixMonths:
      return translation("moreThanSixMonths");
  }
}

export function getUserInitials(firstName?: string, lastName?: string): string {
  if (firstName && firstName.length > 0 && lastName && lastName.length > 0) {
    return firstName[0] + lastName[0];
  }
  return firstName || "" + lastName || "";
}
