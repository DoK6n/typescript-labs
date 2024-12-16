import { GrimpanMenuButton } from '../grimpan-menu-button/button.js'
import { GrimpanMenuInput } from '../grimpan-menu-button/input.js'
import { ChromeGrimpan } from '../grimpan/chrome.js'
import { GrimpanMenu } from './abstract.js'
import { Command } from './command/abstract.js'
import {
  BackCommand,
  ForwardCommand,
  PenSelectCommand,
  CircleSelectCommand,
  EraserSelectCommand,
  PipetteSelectCommand,
  RectangleSelectCommand,
} from './command/index.js'
import { ButtonType } from './types.js'

// invoker : 명령을 실행하는 객체
export class ChromeGrimpanMenu extends GrimpanMenu {
  private static instance: ChromeGrimpanMenu

  override initialize(types: ButtonType[]): void {
    types.forEach(this.drawButtonByType)
    this.setActiveButton('pen')
  }

  // invoker이기 때문에 excute를 메서드로 따로 빼둠
  executeCommand(command: Command) {
    command.execute()
  }

  onClickBack = () => {
    this.executeCommand(new BackCommand(this.grimpan.history))
  }

  onClickForward = () => {
    this.executeCommand(new ForwardCommand(this.grimpan.history))
  }

  onClickPen = () => {
    const command = new PenSelectCommand(this.grimpan)
    this.executeCommand(command) // { name: 'pen' };
    this.grimpan.history.stack.push(command)
  }

  onClickEraser = () => {
    this.executeCommand(new EraserSelectCommand(this.grimpan)) // { name: 'eraser' };
  }

  onClickCircle = () => {
    this.executeCommand(new CircleSelectCommand(this.grimpan)) // { name: 'eraser' };
  }

  onClickRectangle = () => {
    this.executeCommand(new RectangleSelectCommand(this.grimpan)) // { name: 'eraser' };
  }

  onClickPipette = () => {
    this.executeCommand(new PipetteSelectCommand(this.grimpan)) // { name: 'eraser' };
  }

  drawButtonByType = (type: ButtonType) => {
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
          .setOnChange(() => {
            // 컬러 변경 작업
          })
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
