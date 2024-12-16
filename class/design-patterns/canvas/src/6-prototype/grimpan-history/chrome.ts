import { ChromeGrimpan } from '../grimpan/chrome.js'
import { GrimpanHistory } from './abstract.js'

export class ChromeGrimpanHistory extends GrimpanHistory {
  private static instance: ChromeGrimpanHistory

  override initialize(): void {}

  static override getInstance(grimpan: ChromeGrimpan): ChromeGrimpanHistory {
    if (!this.instance) {
      this.instance = new ChromeGrimpanHistory(grimpan)
    }
    return this.instance
  }
}
