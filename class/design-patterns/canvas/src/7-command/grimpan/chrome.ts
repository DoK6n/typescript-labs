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

  static override getInstance() {
    if (!this.instance) {
      this.instance = new ChromeGrimpan(document.querySelector('#canvas'), ChromeGrimpanFactory)
    }

    return this.instance
  }
}
