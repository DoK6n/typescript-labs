import Grimpan from './abstract-grimpan'

export default class ChromeGrimpan extends Grimpan {
  private static instance: ChromeGrimpan

  initialize() {}
  initializeMenu() {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new ChromeGrimpan(document.querySelector('#canvas'))
    }

    return this.instance
  }
}
