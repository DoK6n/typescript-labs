import { Bind } from '../../lib/bind.decorator.js'
import { GrimpanMenuButton } from '../grimpan-menu-button/button.js'
import { GrimpanMenuInput } from '../grimpan-menu-button/input.js'
import { ChromeGrimpan } from '../grimpan/chrome.js'
import { GrimpanMenu } from './abstract.js'
import { BackCommand, ForwardCommand, PenSelectCommand } from './command/index.js'
import { ButtonType } from './types.js'

// invoker : 명령을 실행하는 객체
export class ChromeGrimpanMenu extends GrimpanMenu {
  private static instance: ChromeGrimpanMenu

  override initialize(types: ButtonType[]): void {
    types.forEach(this.drawButtonByType)
    this.grimpan.setMode('pen')
  }

  @Bind
  onClickBack() {
    this.executeCommand(new BackCommand(this.grimpan.history))
  }

  @Bind
  onClickForward() {
    this.executeCommand(new ForwardCommand(this.grimpan.history))
  }

  @Bind
  onClickPen() {
    const command = new PenSelectCommand(this.grimpan)
    this.executeCommand(command) // { name: 'pen' };
    this.grimpan.history.stack.push(command)
  }

  @Bind
  onClickEraser() {
    this.grimpan.setMode('eraser')
  }

  @Bind
  onClickCircle() {
    this.grimpan.setMode('circle')
  }

  @Bind
  onClickRectangle() {
    this.grimpan.setMode('rectangle')
  }

  @Bind
  onClickPipette() {
    this.grimpan.setMode('pipette')
  }

  @Bind
  onChangeColor(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      this.grimpan.setColor(e.target.value)
    }
  }

  @Bind
  drawButtonByType(type: ButtonType) {
    switch (type) {
      case 'back':
        const back = new GrimpanMenuButton.Builder({
          menu: this,
          name: '뒤로',
          type,
        })
          .setOnClick(this.onClickBack)
          .build()

        back.draw()

        return back
      case 'forward':
        const forward = new GrimpanMenuButton.Builder({
          menu: this,
          name: '앞으로',
          type,
        })
          .setOnClick(this.onClickForward)
          .build()

        forward.draw()

        return forward

      case 'color':
        const color = new GrimpanMenuInput.Builder({
          menu: this,
          name: '색상',
          type,
        })
          .setOnChange(this.onChangeColor)
          .build()

        color.draw()

        return color

      case 'pipette':
        const pipette = new GrimpanMenuButton.Builder({
          menu: this,
          name: '스포이드',
          type,
        })
          .setOnClick(this.onClickPipette)
          .build()

        pipette.draw()

        return pipette

      case 'pen':
        const pen = new GrimpanMenuButton.Builder({
          menu: this,
          name: '펜',
          type,
        })
          .setOnClick(this.onClickPen)
          .build()

        pen.draw()

        return pen

      case 'circle':
        const circle = new GrimpanMenuButton.Builder({
          menu: this,
          name: '원',
          type,
        })
          .setOnClick(this.onClickCircle)
          .build()

        circle.draw()

        return circle

      case 'rectangle':
        const rectangle = new GrimpanMenuButton.Builder({
          menu: this,
          name: '사각형',
          type,
        })
          .setOnClick(this.onClickRectangle)
          .build()

        rectangle.draw()

        return rectangle

      case 'eraser':
        const eraser = new GrimpanMenuButton.Builder({
          menu: this,
          name: '지우개',
          type,
        })
          .setOnClick(this.onClickEraser)
          .build()

        eraser.draw()

        return eraser

      case 'save':
        const save = new GrimpanMenuButton.Builder({
          menu: this,
          name: '저장',
          type,
        }).build()

        save.draw()

        return save

      default:
        throw new Error(`알 수 없는 타입 ${type}`)
    }
  }

  static override getInstance(grimpan: ChromeGrimpan, dom: HTMLElement): ChromeGrimpanMenu {
    if (!this.instance) {
      this.instance = new ChromeGrimpanMenu(grimpan, dom)
    }
    return this.instance
  }
}
