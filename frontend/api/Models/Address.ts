export interface Address {
    id?: number;
    latitude?: number;
    longitude?: number;
    country?: string | undefined;
    city?: string | undefined;
    addressLine?: string | undefined;
    zip?: string | undefined;
}

