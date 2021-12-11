import {BusinessType} from './BusinessType'
export interface UserResponse {
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    description?: string | undefined;
    businessType?: BusinessType;
    externalLink?: string | undefined;
    phoneNumber?: string | undefined;
}

