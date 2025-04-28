interface ILocation {
    id: string;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    LocationItinerary: ILocationItinerary[];
}

interface IItinerary {
    id: string;
    title: string;
    descrption: string;
    createdAt: Date;
    updatedAt: Date;
    LocationItinerary: ILocationItinerary[];
}

interface ILocationItinerary {
    id: string;
    mustToSee: boolean;
    order: number;

    location: ILocation;
    locationId: String;

    itinerary: IItinerary;
    itineraryId: String;
}
