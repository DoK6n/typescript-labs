import { Bind } from '../../lib/bind.decorator.js'
import { IEGrimpanFactory } from '../grimpan-factory.js'
import { Grimpan } from './abstract.js'

export class IEGrimpan extends Grimpan {
  private static instance: IEGrimpan

  initialize() {}

  @Bind
  override onMousedown(e: MouseEvent) {}

  @Bind
  override onMousemove(e: MouseEvent) {}

  @Bind
  override onMouseup(e: MouseEvent) {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new IEGrimpan(document.querySelector('#canvas'), IEGrimpanFactory)
    }

    return this.instance
  }
}
