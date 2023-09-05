import { IncomingMessage, ServerResponse } from 'http'
export interface Request extends IncomingMessage {
	body?: {
		email?: string
		num?: number
	}
}

export interface Response extends ServerResponse {
	email?: string
	num?: number
}

export interface dbElement {
	email: string
	number: number
}
