
export enum IExpeditionTypes {
	'coldWeather' = 'coldWeather',
	'outdoors' = 'outdoors'
}
export interface IRegistrationInformation {
	name: string,
	description: string
}

export interface IExpedition {
	title: string,
	subtitle: string,
	description: string,
	extra: any,
	cards: IExpeditionCard[]
}

export interface IExpeditionCard {
	cost: number,
	name: string,
	type: string,
	time: number,
	description: string,
	id: string,
	registrationInformation: IRegistrationInformation[]
}