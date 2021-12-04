import {ResolvedJobResponse} from './ResolvedJobResponse'
export interface ResolvedJobResponseFilteredResult {
    page?: number;
    pageSize?: number;
    orderBy?: string | undefined;
    data?: ResolvedJobResponse[] | undefined;
    count?: number;
}

