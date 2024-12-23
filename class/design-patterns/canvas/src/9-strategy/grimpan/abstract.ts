import { AbstractGrimpanFactory } from '../grimpan-factory.js'
import { GrimpanHistory } from '../grimpan-history/abstract.js'
import { GrimpanMenu } from '../grimpan-menu/abstract.js'
import { Mode } from '../modes/abstract.js'
import { CircleMode, EraserMode, PipetteMode, RectangleMode } from '../modes/index.js'
import { PenMode } from '../modes/index.js'
import type { GrimpanMode, GrimpanOption } from './types.js'

export abstract class Grimpan {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  history!: GrimpanHistory
  menu!: GrimpanMenu
  mode!: Mode
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
    console.log('mode change', mode)

    switch (mode) {
      case 'pen':
        this.mode = new PenMode(this)
        break
      case 'eraser':
        this.mode = new EraserMode(this)
        break
      case 'pipette':
        this.mode = new PipetteMode(this)
        break
      case 'circle':
        this.mode = new CircleMode(this)
        break
      case 'rectangle':
        this.mode = new RectangleMode(this)
        break
      default:
        throw new Error('Invalid mode')
    }
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
