/**
 * Airport 机场
 */
export interface Airport {
    id?: number;
    ident: string;
    type?: string;
    name?: string;
    latitudeDeg: number;
    longitudeDeg: number;
    elevationFt?: string;
    continent?: string;
    isoCountry?: string;
    isoRegion?: string;
    municipality?: string;
    scheduledService?: string;
    gpsCode?: string;
    iataCode?: string;
    localCode?: string;
    homeLink?: string;
    wikipediaLink?: string;
    keywords?: string;
    status?: number;
    frequencies?:Array<AirportFrequency>
}


export interface AirportFrequency {
    id?: number;
    airportRef?: number;
    airportIdent?: string;
    type?: string;
    description?: string;
    frequencyMhz?: number;
}
