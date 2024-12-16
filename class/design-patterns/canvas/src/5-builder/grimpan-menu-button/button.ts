import { GrimpanMenu } from '../grimpan-menu/abstract.js'
import { GrimpanMenuElement, GrimpanMenuElementBuilder } from './abstract.js'

export class GrimpanMenuButton extends GrimpanMenuElement {
  private onClick?: () => void
  private active?: boolean

  private constructor(props: { menu: GrimpanMenu; name: string; onClick?: () => void; active?: boolean }) {
    super(props.menu, props.name)
    this.active = props.active
    this.onClick = props.onClick
  }

  draw() {
    const button = document.createElement('button')
    button.textContent = this.name
    if (this.onClick) {
      button.addEventListener('click', this.onClick.bind(this))
    }
    this.menu.dom.append(button)
  }

  static Builder = class GrimpanMenuButtonBuilder extends GrimpanMenuElementBuilder {
    override button: GrimpanMenuButton
    constructor(props: { menu: GrimpanMenu; name: string }) {
      super()
      this.button = new GrimpanMenuButton(props)
    }

    setOnClick(onClick: () => void) {
      this.button.onClick = onClick
      return this
    }

    setActive(active: boolean) {
      this.button.active = active
      return this
    }
  }
}
