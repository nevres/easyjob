import { Address } from "../../api/Models/Address";
import { TranslationFunc } from "../../common/i18n/useI18n";
import { Price } from "../../api/Models/Price";
import { PriceType } from "../../api/Models/PriceType";
import { assertUnreachable } from "../../common/utils/tsHelper";

export function getUserFriendlyLocation(location: Address) {
  return location.city;
}

export function getUserFriendlyPrice(
  price: Price,
  translation: TranslationFunc
): string {
  let priceType = price.priceType;
  if (!priceType) return "";
  switch (priceType) {
    case PriceType.FixedPrice:
      return `${translation("fixedPrice")}: ${price.minPrice} - ${
        price.maxPrice
      } ${price.currencyCode}`;
    case PriceType.Hourly:
      return `${translation("fixedPrice")}: ${price.minPrice} - ${
        price.maxPrice
      } ${price.currencyCode}`;
    default:
      assertUnreachable(priceType);
  }
}
