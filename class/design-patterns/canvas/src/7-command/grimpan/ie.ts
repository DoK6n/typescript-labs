import { IEGrimpanFactory } from '../grimpan-factory.js'
import { Grimpan } from './abstract.js'

export class IEGrimpan extends Grimpan {
  private static instance: IEGrimpan

  initialize() {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new IEGrimpan(document.querySelector('#canvas'), IEGrimpanFactory)
    }

    return this.instance
  }
}
