import { Transport } from "./transport.model";

export interface Flight {
	transport: Transport;
	departureStation: string;
	arrivalStation: string;
	price: number;
}