/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {throwException} from '../throwException'
import {ResolvedJobResponse} from '../Models/ResolvedJobResponse'
import {CategoryResponse} from '../Models/CategoryResponse'
import {Address} from '../Models/Address'
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
    async get(id: number): Promise<ResolvedJobResponse> {
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

    protected async processGet(response: Response): Promise<ResolvedJobResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <ResolvedJobResponse>JSON.parse(_responseText, this.jsonParseReviver);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResolvedJobResponse>(<any>null);
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
     * @param jobDurationType (optional) 
     * @param hasJobDurationType (optional) 
     * @param city (optional) 
     * @return Success
     */
    async getjobs(name: string | undefined, description: string | undefined, price_CurrencyCode: string | undefined, price_PriceType: PriceType | undefined, price_MinPrice: number | undefined, price_MaxPrice: number | undefined, page: number | undefined, pageSize: number | undefined, orderBy: string | undefined, categoryIds: number[] | undefined, jobDurationType: JobDurationType | undefined, hasJobDurationType: boolean | undefined, city: string | undefined): Promise<ResolvedJobResponse[]> {
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
        if (jobDurationType === null)
            throw new Error("The parameter 'jobDurationType' cannot be null.");
        else if (jobDurationType !== undefined)
            url_ += "JobDurationType=" + encodeURIComponent("" + jobDurationType) + "&";
        if (hasJobDurationType === null)
            throw new Error("The parameter 'hasJobDurationType' cannot be null.");
        else if (hasJobDurationType !== undefined)
            url_ += "HasJobDurationType=" + encodeURIComponent("" + hasJobDurationType) + "&";
        if (city === null)
            throw new Error("The parameter 'city' cannot be null.");
        else if (city !== undefined)
            url_ += "City=" + encodeURIComponent("" + city) + "&";
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

    protected async processGetjobs(response: Response): Promise<ResolvedJobResponse[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <ResolvedJobResponse[]>JSON.parse(_responseText, this.jsonParseReviver);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResolvedJobResponse[]>(<any>null);
    }

    /**
     * @param name (optional) 
     * @param description (optional) 
     * @param highlightedDescription (optional) 
     * @param numberOfEmployeesRequired (optional) 
     * @param location_Latitude (optional) 
     * @param location_Longitude (optional) 
     * @param location_Country (optional) 
     * @param location_City (optional) 
     * @param location_AddressLine (optional) 
     * @param location_Zip (optional) 
     * @param jobDurationType (optional) 
     * @param price_CurrencyCode (optional) 
     * @param price_PriceType (optional) 
     * @param price_MinPrice (optional) 
     * @param price_MaxPrice (optional) 
     * @param urgency (optional) 
     * @param categoryId (optional) 
     * @param userId (optional) 
     * @return Success
     */
    async createJob(name: string | undefined, description: string | undefined, highlightedDescription: string | undefined, numberOfEmployeesRequired: number | undefined, location_Latitude: number | undefined, location_Longitude: number | undefined, location_Country: string | undefined, location_City: string | undefined, location_AddressLine: string | undefined, location_Zip: string | undefined, jobDurationType: JobDurationType | undefined, price_CurrencyCode: string | undefined, price_PriceType: PriceType | undefined, price_MinPrice: number | undefined, price_MaxPrice: number | undefined, urgency: JobUrgency | undefined, categoryId: number | undefined, userId: number | undefined): Promise<number> {
        let url_ = this.baseUrl + "/Job?";
        if (name === null)
            throw new Error("The parameter 'name' cannot be null.");
        else if (name !== undefined)
            url_ += "Name=" + encodeURIComponent("" + name) + "&";
        if (description === null)
            throw new Error("The parameter 'description' cannot be null.");
        else if (description !== undefined)
            url_ += "Description=" + encodeURIComponent("" + description) + "&";
        if (highlightedDescription === null)
            throw new Error("The parameter 'highlightedDescription' cannot be null.");
        else if (highlightedDescription !== undefined)
            url_ += "HighlightedDescription=" + encodeURIComponent("" + highlightedDescription) + "&";
        if (numberOfEmployeesRequired === null)
            throw new Error("The parameter 'numberOfEmployeesRequired' cannot be null.");
        else if (numberOfEmployeesRequired !== undefined)
            url_ += "NumberOfEmployeesRequired=" + encodeURIComponent("" + numberOfEmployeesRequired) + "&";
        if (location_Latitude === null)
            throw new Error("The parameter 'location_Latitude' cannot be null.");
        else if (location_Latitude !== undefined)
            url_ += "Location.Latitude=" + encodeURIComponent("" + location_Latitude) + "&";
        if (location_Longitude === null)
            throw new Error("The parameter 'location_Longitude' cannot be null.");
        else if (location_Longitude !== undefined)
            url_ += "Location.Longitude=" + encodeURIComponent("" + location_Longitude) + "&";
        if (location_Country === null)
            throw new Error("The parameter 'location_Country' cannot be null.");
        else if (location_Country !== undefined)
            url_ += "Location.Country=" + encodeURIComponent("" + location_Country) + "&";
        if (location_City === null)
            throw new Error("The parameter 'location_City' cannot be null.");
        else if (location_City !== undefined)
            url_ += "Location.City=" + encodeURIComponent("" + location_City) + "&";
        if (location_AddressLine === null)
            throw new Error("The parameter 'location_AddressLine' cannot be null.");
        else if (location_AddressLine !== undefined)
            url_ += "Location.AddressLine=" + encodeURIComponent("" + location_AddressLine) + "&";
        if (location_Zip === null)
            throw new Error("The parameter 'location_Zip' cannot be null.");
        else if (location_Zip !== undefined)
            url_ += "Location.Zip=" + encodeURIComponent("" + location_Zip) + "&";
        if (jobDurationType === null)
            throw new Error("The parameter 'jobDurationType' cannot be null.");
        else if (jobDurationType !== undefined)
            url_ += "JobDurationType=" + encodeURIComponent("" + jobDurationType) + "&";
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
        if (urgency === null)
            throw new Error("The parameter 'urgency' cannot be null.");
        else if (urgency !== undefined)
            url_ += "Urgency=" + encodeURIComponent("" + urgency) + "&";
        if (categoryId === null)
            throw new Error("The parameter 'categoryId' cannot be null.");
        else if (categoryId !== undefined)
            url_ += "CategoryId=" + encodeURIComponent("" + categoryId) + "&";
        if (userId === null)
            throw new Error("The parameter 'userId' cannot be null.");
        else if (userId !== undefined)
            url_ += "UserId=" + encodeURIComponent("" + userId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "POST",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCreateJob(_response);
        });
    }

    protected async processCreateJob(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <number>JSON.parse(_responseText, this.jsonParseReviver);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(<any>null);
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

    /**
     * @param location (optional) 
     * @return Success
     */
    async getJobLocations(location: string | undefined): Promise<Address[]> {
        let url_ = this.baseUrl + "/Job/locations?";
        if (location === null)
            throw new Error("The parameter 'location' cannot be null.");
        else if (location !== undefined)
            url_ += "Location=" + encodeURIComponent("" + location) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetJobLocations(_response);
        });
    }

    protected async processGetJobLocations(response: Response): Promise<Address[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <Address[]>JSON.parse(_responseText, this.jsonParseReviver);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<Address[]>(<any>null);
    }
}

