import {UserResponse} from './UserResponse'
import {Price} from './Price'
import {JobUrgency} from './JobUrgency'
import {JobDurationType} from './JobDurationType'
import {Address} from './Address'
export interface ResolvedJobResponse {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    highlightedDescription?: string | undefined;
    numberOfEmployeesRequired?: number;
    location?: Address;
    jobDurationType?: JobDurationType;
    price?: Price;
    urgency?: JobUrgency;
    createDate?: string;
    categoryId?: number;
    categoryName?: string | undefined;
    employer?: UserResponse;
}

