import {Price} from './Price'
import {JobUrgency} from './JobUrgency'
import {JobDuration} from './JobDuration'
import {Address} from './Address'
export interface JobResponse {
    id?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    numberOfEmployeesRequired?: number;
    location?: Address;
    duration?: JobDuration;
    price?: Price;
    urgency?: JobUrgency;
}

