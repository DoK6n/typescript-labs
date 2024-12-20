import Grimpan from './abstract-grimpan'

export default class IEGrimpan extends Grimpan {
  private static instance: IEGrimpan

  initialize() {}
  initializeMenu() {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new IEGrimpan(document.querySelector('#canvas'))
    }

    return this.instance
  }
}
