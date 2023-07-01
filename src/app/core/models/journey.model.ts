import { Flight } from "./flight.model";

export interface Journey {
	flights: Flight[];
	origin: string;
	destination: string;
	price: number;
}