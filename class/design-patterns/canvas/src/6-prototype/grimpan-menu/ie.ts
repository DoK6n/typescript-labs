import { IEGrimpan } from '../grimpan/ie.js'
import { GrimpanMenu } from './abstract.js'
import { ButtonType } from './types.js'

export class IEGrimpanMenu extends GrimpanMenu {
  private static instance: IEGrimpanMenu

  override initialize(types: ButtonType[]): void {}

  static override getInstance(grimpan: IEGrimpan, dom: HTMLElement): IEGrimpanMenu {
    if (!this.instance) {
      this.instance = new IEGrimpanMenu(grimpan, dom)
    }
    return this.instance
  }
}
