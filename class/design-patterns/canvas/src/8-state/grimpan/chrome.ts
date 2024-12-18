import { Bind } from '../../lib/bind.decorator.js'
import { ChromeGrimpanFactory } from '../grimpan-factory.js'
import { ChromeGrimpanHistory } from '../grimpan-history/chrome.js'
import { ChromeGrimpanMenu } from '../grimpan-menu/chrome.js'
import { BackCommand, ForwardCommand } from '../grimpan-menu/command/index.js'
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
    this.mode.mousedown(e)
  }

  @Bind
  override onMousemove(e: MouseEvent) {
    this.mode.mousemove(e)
  }

  @Bind
  override onMouseup(e: MouseEvent) {
    this.mode.mouseup(e)
  }

  static override getInstance() {
    if (!this.instance) {
      this.instance = new ChromeGrimpan(document.querySelector('#canvas'), ChromeGrimpanFactory)
    }

    return this.instance
  }
}
