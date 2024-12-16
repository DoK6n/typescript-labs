import { ChromeGrimpan } from '../grimpan/chrome.js'
import { GrimpanMenu } from './abstract.js'

export class ChromeGrimpanMenu extends GrimpanMenu {
  private static instance: ChromeGrimpanMenu
  override initialize(): void {}
  static override getInstance(grimpan: ChromeGrimpan): ChromeGrimpanMenu {
    if (!this.instance) {
      this.instance = new ChromeGrimpanMenu(grimpan)
    }
    return this.instance
  }
}
