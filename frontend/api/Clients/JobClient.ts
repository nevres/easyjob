/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {throwException} from '../throwException'
import {JobResponse} from '../Models/JobResponse'
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
     * @param page (optional) 
     * @param pageSize (optional) 
     * @param orderBy (optional) 
     * @return Success
     */
    async getjobs(name: string | undefined, description: string | undefined, page: number | undefined, pageSize: number | undefined, orderBy: string | undefined): Promise<JobResponse[]> {
        let url_ = this.baseUrl + "/Job?";
        if (name === null)
            throw new Error("The parameter 'name' cannot be null.");
        else if (name !== undefined)
            url_ += "Name=" + encodeURIComponent("" + name) + "&";
        if (description === null)
            throw new Error("The parameter 'description' cannot be null.");
        else if (description !== undefined)
            url_ += "Description=" + encodeURIComponent("" + description) + "&";
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
}

