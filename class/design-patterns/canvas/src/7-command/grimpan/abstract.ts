import { AbstractGrimpanFactory } from '../grimpan-factory'
import { GrimpanHistory } from '../grimpan-history/abstract'
import { GrimpanMenu } from '../grimpan-menu/abstract'
import type { GrimpanMode, GrimpanOption } from './types'

export abstract class Grimpan {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  history!: GrimpanHistory
  menu!: GrimpanMenu
  mode!: GrimpanMode

  protected constructor(canvas: HTMLCanvasElement | null, factory: typeof AbstractGrimpanFactory) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('canvas 엘리먼트를 입력하세요')
    }
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')!
  }

  setMode(mode: GrimpanMode) {
    console.log('mode change', mode)
    this.mode = mode
  }

  abstract initialize(option: GrimpanOption): void

  static getInstance() {}
}
