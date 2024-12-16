import { Grimpan } from './abstract'

export class IEGrimpan extends Grimpan {
  private static instance: IEGrimpan

  initialize() {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new IEGrimpan(document.querySelector('#canvas'))
    }

    return this.instance
  }
}
