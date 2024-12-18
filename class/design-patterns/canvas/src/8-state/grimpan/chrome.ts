import { Bind } from '../../lib/bind.decorator.js'
import { rgb2hex } from '../../lib/rgb2hex.js'
import { ChromeGrimpanFactory } from '../grimpan-factory.js'
import { ChromeGrimpanHistory } from '../grimpan-history/chrome.js'
import { ChromeGrimpanMenu } from '../grimpan-menu/chrome.js'
import { BackCommand, ForwardCommand, PenSelectCommand } from '../grimpan-menu/command/index.js'
import { Grimpan } from './abstract.js'
import { GrimpanOption } from './types.js'

export class ChromeGrimpan extends Grimpan {
  private static instance: ChromeGrimpan
  override menu: ChromeGrimpanMenu
  override history: ChromeGrimpanHistory

  constructor(canvas: HTMLCanvasElement | null, factory: typeof ChromeGrimpanFactory) {
    super(canvas, factory)
    this.menu = factory.createGrimpanMenu(this, document.querySelector('#menu')!)
    this.history = factory.createGrimpanHistory(this)
  }

  initialize(option: GrimpanOption) {
    this.menu.initialize(option.menu)
    this.history.initialize()
    this.canvas.addEventListener('mousedown', this.onMousedown)
    this.canvas.addEventListener('mousemove', this.onMousemove)
    this.canvas.addEventListener('mouseup', this.onMouseup)

    const keyPressed = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey

      if (isCtrlOrCmd && e.code === 'KeyZ') {
        if (e.shiftKey) {
          this.menu.executeCommand(new ForwardCommand(this.history))
        } else {
          this.menu.executeCommand(new BackCommand(this.history))
        }
      }
    }

    window.addEventListener('keydown', keyPressed) // 누를때
  }

  @Bind
  override onMousedown(e: MouseEvent) {
    switch (this.mode) {
      case 'pen': {
        this.active = true
        this.ctx.lineWidth = 1
        this.ctx.lineCap = 'round'
        this.ctx.strokeStyle = this.color
        this.ctx.globalCompositeOperation = 'source-over'
        this.ctx.beginPath()
        this.ctx.moveTo(e.offsetX, e.offsetY)
        break
      }
      case 'eraser': {
        this.active = true
        this.ctx.lineWidth = 10
        this.ctx.lineCap = 'round'
        this.ctx.strokeStyle = '#ffffff'
        this.ctx.globalCompositeOperation = 'destination-out'
        this.ctx.beginPath()
        this.ctx.moveTo(e.offsetX, e.offsetY)
        break
      }
      case 'circle': {
        break
      }
      case 'pipette': {
        break
      }
      case 'rectangle': {
        break
      }
      default: {
        throw new Error('Invalid mode')
      }
    }
  }

  @Bind
  override onMousemove(e: MouseEvent) {
    switch (this.mode) {
      case 'pen':
      case 'eraser': {
        if (!this.active) {
          return
        }
        this.ctx.lineTo(e.offsetX, e.offsetY)
        this.ctx.stroke()
        this.ctx.moveTo(e.offsetX, e.offsetY)
        break
      }
      case 'circle': {
        break
      }
      case 'pipette': {
        const { data } = this.ctx.getImageData(e.offsetX, e.offsetY, 1, 1) // 픽셀 1칸에 대한 데이터 추출
        const [r, g, b, a] = data.slice(0, 4)
        if (a === 0) {
          this.changeColor('#ffffff')
        } else {
          this.changeColor(rgb2hex(r, g, b))
        }
        break
      }
      case 'rectangle': {
        break
      }
      default: {
        throw new Error('Invalid mode')
      }
    }
  }

  @Bind
  override onMouseup(e: MouseEvent) {
    switch (this.mode) {
      case 'pen': {
        this.active = false
        // save history
        break
      }
      case 'eraser': {
        this.active = false
        // save history
        break
      }
      case 'circle': {
        break
      }
      case 'pipette': {
        this.menu.executeCommand(new PenSelectCommand(this))
        break
      }
      case 'rectangle': {
        break
      }
      default: {
        throw new Error('Invalid mode')
      }
    }
  }

  static override getInstance() {
    if (!this.instance) {
      this.instance = new ChromeGrimpan(document.querySelector('#canvas'), ChromeGrimpanFactory)
    }

    return this.instance
  }
}
