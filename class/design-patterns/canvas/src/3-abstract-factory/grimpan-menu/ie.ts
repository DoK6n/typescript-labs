import { IEGrimpan } from '../grimpan/ie.js'
import { GrimpanMenu } from './abstract.js'

export class IEGrimpanMenu extends GrimpanMenu {
  private static instance: IEGrimpanMenu
  override initialize(): void {}
  static override getInstance(grimpan: IEGrimpan): IEGrimpanMenu {
    if (!this.instance) {
      this.instance = new IEGrimpanMenu(grimpan)
    }
    return this.instance
  }
}
