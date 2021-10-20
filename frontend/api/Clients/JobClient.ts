/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {throwException} from '../throwException'
import {JobResponse} from '../Models/JobResponse'
import {CategoryResponse} from '../Models/CategoryResponse'
export class JobClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : <any>window;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @return Success
     */
    async get(id: number): Promise<JobResponse> {
        let url_ = this.baseUrl + "/Job/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGet(_response);
        });
    }

    protected async processGet(response: Response): Promise<JobResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <JobResponse>JSON.parse(_responseText, this.jsonParseReviver);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<JobResponse>(<any>null);
    }

    /**
     * @param name (optional) 
     * @param description (optional) 
     * @param price_CurrencyCode (optional) 
     * @param price_PriceType (optional) 
     * @param price_MinPrice (optional) 
     * @param price_MaxPrice (optional) 
     * @param page (optional) 
     * @param pageSize (optional) 
     * @param orderBy (optional) 
     * @param categoryIds (optional) 
     * @return Success
     */
    async getjobs(name: string | undefined, description: string | undefined, price_CurrencyCode: string | undefined, price_PriceType: PriceType | undefined, price_MinPrice: number | undefined, price_MaxPrice: number | undefined, page: number | undefined, pageSize: number | undefined, orderBy: string | undefined, categoryIds: number[] | undefined): Promise<JobResponse[]> {
        let url_ = this.baseUrl + "/Job?";
        if (name === null)
            throw new Error("The parameter 'name' cannot be null.");
        else if (name !== undefined)
            url_ += "Name=" + encodeURIComponent("" + name) + "&";
        if (description === null)
            throw new Error("The parameter 'description' cannot be null.");
        else if (description !== undefined)
            url_ += "Description=" + encodeURIComponent("" + description) + "&";
        if (price_CurrencyCode === null)
            throw new Error("The parameter 'price_CurrencyCode' cannot be null.");
        else if (price_CurrencyCode !== undefined)
            url_ += "Price.CurrencyCode=" + encodeURIComponent("" + price_CurrencyCode) + "&";
        if (price_PriceType === null)
            throw new Error("The parameter 'price_PriceType' cannot be null.");
        else if (price_PriceType !== undefined)
            url_ += "Price.PriceType=" + encodeURIComponent("" + price_PriceType) + "&";
        if (price_MinPrice === null)
            throw new Error("The parameter 'price_MinPrice' cannot be null.");
        else if (price_MinPrice !== undefined)
            url_ += "Price.MinPrice=" + encodeURIComponent("" + price_MinPrice) + "&";
        if (price_MaxPrice === null)
            throw new Error("The parameter 'price_MaxPrice' cannot be null.");
        else if (price_MaxPrice !== undefined)
            url_ += "Price.MaxPrice=" + encodeURIComponent("" + price_MaxPrice) + "&";
        if (page === null)
            throw new Error("The parameter 'page' cannot be null.");
        else if (page !== undefined)
            url_ += "Page=" + encodeURIComponent("" + page) + "&";
        if (pageSize === null)
            throw new Error("The parameter 'pageSize' cannot be null.");
        else if (pageSize !== undefined)
            url_ += "PageSize=" + encodeURIComponent("" + pageSize) + "&";
        if (orderBy === null)
            throw new Error("The parameter 'orderBy' cannot be null.");
        else if (orderBy !== undefined)
            url_ += "OrderBy=" + encodeURIComponent("" + orderBy) + "&";
        if (categoryIds === null)
            throw new Error("The parameter 'categoryIds' cannot be null.");
        else if (categoryIds !== undefined)
            categoryIds && categoryIds.forEach(item => { url_ += "CategoryIds=" + encodeURIComponent("" + item) + "&"; });
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetjobs(_response);
        });
    }

    protected async processGetjobs(response: Response): Promise<JobResponse[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <JobResponse[]>JSON.parse(_responseText, this.jsonParseReviver);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<JobResponse[]>(<any>null);
    }

    /**
     * @return Success
     */
    async getJobCategories(): Promise<CategoryResponse[]> {
        let url_ = this.baseUrl + "/Job/categories";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetJobCategories(_response);
        });
    }

    protected async processGetJobCategories(response: Response): Promise<CategoryResponse[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <CategoryResponse[]>JSON.parse(_responseText, this.jsonParseReviver);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<CategoryResponse[]>(<any>null);
    }
}

