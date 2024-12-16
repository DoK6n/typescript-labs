import { IEGrimpan } from '../grimpan/ie.js'
import { GrimpanHistory } from './abstract.js'

export class IEGrimpanHistory extends GrimpanHistory {
  private static instance: IEGrimpanHistory
  override initialize(): void {}
  static override getInstance(grimpan: IEGrimpan): IEGrimpanHistory {
    if (!this.instance) {
      this.instance = new IEGrimpanHistory(grimpan)
    }
    return this.instance
  }
}
