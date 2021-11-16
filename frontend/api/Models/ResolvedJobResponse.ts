import {Timestamp} from './Timestamp'
import {Price} from './Price'
import {JobUrgency} from './JobUrgency'
import {JobDurationType} from './JobDurationType'
import {ApplicationUser} from './ApplicationUser'
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
    createDate?: Timestamp;
    categoryId?: number;
    categoryName?: string | undefined;
    employer?: ApplicationUser;
}

