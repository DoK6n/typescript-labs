import { GrimpanMenuButton } from '../grimpan-menu-button/button.js'
import { GrimpanMenuInput } from '../grimpan-menu-button/input.js'
import { ChromeGrimpan } from '../grimpan/chrome.js'
import { GrimpanMenu } from './abstract.js'
import { ButtonType } from './types.js'

export class ChromeGrimpanMenu extends GrimpanMenu {
  private static instance: ChromeGrimpanMenu

  override initialize(types: ButtonType[]): void {
    types.forEach(this.drawButtonByType.bind(this))
  }

  drawButtonByType(type: ButtonType) {
    switch (type) {
      case 'back':
        const back = new GrimpanMenuButton.Builder({
          menu: this,
          name: '뒤로',
        })
          .setOnClick(() => console.log('뒤로 버튼 클릭'))
          .build()

        back.draw()

        return back
      case 'forward':
        const forward = new GrimpanMenuButton.Builder({
          menu: this,
          name: '앞으로',
        })
          .setOnClick(() => console.log('앞으로 버튼 클릭'))
          .build()

        forward.draw()

        return forward

      case 'color':
        const color = new GrimpanMenuInput.Builder({
          menu: this,
          name: '색상',
        })
          .setOnChange(() => console.log('색상 변경'))
          .build()

        color.draw()

        return color

      case 'pipette':
        const pipette = new GrimpanMenuButton.Builder({
          menu: this,
          name: '스포이드',
        })
          .setOnClick(() => console.log('스포이드 버튼 클릭'))
          .build()

        pipette.draw()

        return pipette

      case 'pen':
        const pen = new GrimpanMenuButton.Builder({
          menu: this,
          name: '펜',
        })
          .setOnClick(() => console.log('펜 버튼 클릭'))
          .build()

        pen.draw()

        return pen

      case 'circle':
        const circle = new GrimpanMenuButton.Builder({
          menu: this,
          name: '원',
        })
          .setOnClick(() => console.log('원 버튼 클릭'))
          .build()

        circle.draw()

        return circle

      case 'rectangle':
        const rectangle = new GrimpanMenuButton.Builder({
          menu: this,
          name: '사각형',
        })
          .setOnClick(() => console.log('사각형 버튼 클릭'))
          .build()

        rectangle.draw()

        return rectangle

      case 'eraser':
        const eraser = new GrimpanMenuButton.Builder({
          menu: this,
          name: '지우개',
        })
          .setOnClick(() => console.log('지우개 버튼 클릭'))
          .build()

        return eraser

      case 'save':
        const save = new GrimpanMenuButton.Builder({
          menu: this,
          name: '저장',
        })
          .setOnClick(() => console.log('저장 버튼 클릭'))
          .build()

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
