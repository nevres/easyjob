import {BusinessType} from './BusinessType'
export interface User {
    id?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    description?: string | undefined;
    businessType?: BusinessType;
    externalLink?: string | undefined;
    phoneNumber?: string | undefined;
}

