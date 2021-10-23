import { Address } from "../../api/Models/Address";
import { TranslationFunc } from "../../common/i18n/useI18n";
import { Price } from "../../api/Models/Price";
import { PriceType } from "../../api/Models/PriceType";
import { assertUnreachable } from "../../common/utils/tsHelper";
import {isNullOrUndefined} from "../../common/utils/jsHelper";

export function getUserFriendlyLocation(location: Address) {
  return location.city;
}

export function getUserFriendlyPrice(
  price: Price,
  translation: TranslationFunc
): string {
  let priceType = price.priceType;
  if (!priceType) return "";``
  switch (priceType) {
    case PriceType.FixedPrice:
      return `${translation("fixedPrice")}: ${GetPriceAmount(price.minPrice, price.maxPrice)} ${price.currencyCode}`;
    case PriceType.Hourly:
      return `${translation("hourlyRate")}: ${GetPriceAmount(price.minPrice, price.maxPrice)} ${price.currencyCode}`;
    default:
      assertUnreachable(priceType);
  }
}

function GetPriceAmount(minPrice: number | undefined, maxPrice: number | undefined) : string {
  if(isNullOrUndefined(minPrice)) throw "Min price should be provided";
  if(isNullOrUndefined(maxPrice) || maxPrice === 0){
    return minPrice.toString();
  }
  return `${minPrice} - ${maxPrice}`
}