import { IClientRepo } from '../interfaces/IClientRepo';
import { Email } from '../../models/clients/email';
import { Client } from '../../models/clients/client';
import { ClientMap } from '../../mappers/ClientMap'

export class ClientRepo implements IClientRepo {
	private models: any;

	constructor(models: any) {
		this.models = models;
	}

	private createBaseQuery() {
		const { models } = this;
		return {
			where: {},
			include: [{ model: models.Trader, as: 'Trader', required: false }],
		};
	}

	/*Meter as implementações das funções aqui*/
	public async save(client: Client): Promise<void> {
		const BaseClientModel = this.models.BaseClient
		const exists = await this.exists(client.email)
		const rawUser = ClientMap.toPersistence(client)

		try {
			if (!exists) {
				//Create new
				await BaseClientModel.create(rawUser)
			}
			else {
				//Save old
				const sequelizeClientInstance = await BaseClientModel.findOne({
					where: { email: client.email.value }
				})
				await sequelizeClientInstance.update(rawUser)
			}
		}
		catch (err) {
			console.log(err)
		}
	}

	public async exists(email: Email): Promise<boolean> {
		const baseQuery = this.createBaseQuery()
		baseQuery.where['email'] = email.value
		const client = await this.models.BaseClient.find(baseQuery)
		return !!client === true
		//throw new Error("Method not implemented.");
	}

	doSomethingHere() {
		throw new Error("Method not implemented.");
	}
}
