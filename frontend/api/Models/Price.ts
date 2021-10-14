import {PriceType} from './PriceType'
export interface Price {
    currencyCode?: string | undefined;
    priceType?: PriceType;
    minPrice?: number;
    maxPrice?: number;
}

