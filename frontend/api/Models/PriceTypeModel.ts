import { PriceAmountModel } from "../../common/components/price/PriceAmountGroup";
import { PriceType } from "./PriceType";

export type PriceTypeModel = {
  type: PriceType;
};

export type PriceModel = PriceAmountModel & PriceTypeModel;
