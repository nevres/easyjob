import {BusinessType} from './BusinessType'
export interface AddOrUpdateUserCommand {
    id?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    description?: string | undefined;
    businessType?: BusinessType;
    externalLink?: string | undefined;
    phoneNumber?: string | undefined;
}

