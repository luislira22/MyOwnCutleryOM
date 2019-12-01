import { IClientRepo } from '../interfaces/IClientRepo';

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

  doSomethingHere() {
    console.log('gotta do stuff');
  }
}
