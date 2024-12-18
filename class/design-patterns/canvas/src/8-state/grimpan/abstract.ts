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
  color: string
  active: boolean

  protected constructor(canvas: HTMLCanvasElement | null, factory: typeof AbstractGrimpanFactory) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('canvas 엘리먼트를 입력하세요')
    }
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')!
    this.color = '#000'
    this.active = false
  }

  setMode(mode: GrimpanMode) {
    this.mode = mode
  }

  setColor(color: string) {
    this.color = color
  }

  changeColor(color: string) {
    this.setColor(color)
    if (this.menu.colorButton) {
      this.menu.colorButton.value = color
    }
  }

  abstract initialize(option: GrimpanOption): void
  abstract onMousedown(e: MouseEvent): void
  abstract onMousemove(e: MouseEvent): void
  abstract onMouseup(e: MouseEvent): void

  static getInstance() {}
}
