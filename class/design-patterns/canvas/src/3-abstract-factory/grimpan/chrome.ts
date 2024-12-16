import { Grimpan } from './abstract'

export class ChromeGrimpan extends Grimpan {
  private static instance: ChromeGrimpan

  initialize() {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new ChromeGrimpan(document.querySelector('#canvas'))
    }

    return this.instance
  }
}
