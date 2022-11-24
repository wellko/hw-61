export interface Country {
    name: string;
    alpha3Code: string;
    independent: boolean;
}

export  interface  CountryInfoResponse {
    name: string;
    region:string;
    population:string;
    flag:string;
    borders: string[];
}

export interface Flag {
    flag:string
}