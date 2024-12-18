import { GrimpanMenu } from '../grimpan-menu/abstract.js'

interface IButton {
  name: string
  type: string
  onClick?: () => void
}

interface IInput {
  name: string
  type: string
  onChange?: () => void
  active?: boolean
  value?: string
}

export class GrimpanMenuButton {
  private name: string
  private type: string
  private onClick?: () => void
  private onChange?: () => void
  private active?: boolean
  private value?: string
  private menu: GrimpanMenu

  private constructor(props: IButton & IInput & { menu: GrimpanMenu }) {
    this.name = props.name
    this.type = props.type
    this.onClick = props.onClick
    this.onChange = props.onChange
    this.active = props.active
    this.value = props.value
    this.menu = props.menu
  }

  // TODO: Refactor
  draw() {
    if (this.type === 'button') {
      const button = document.createElement('button')
      button.textContent = this.name
      if (this.onClick) {
        button.addEventListener('click', this.onClick.bind(this))
      }
      this.menu.dom.append(button)
    } else if (this.type === 'input') {
      const input = document.createElement('input')
      input.title = this.name
      if (this.onChange) {
        input.addEventListener('change', this.onChange.bind(this))
      }
      this.menu.dom.append(input)
    }
  }

  static Builder = class GrimpanMenuButtonBuilder {
    button: GrimpanMenuButton

    constructor(props: { menu: GrimpanMenu; name: string; type: string }) {
      this.button = new GrimpanMenuButton(props)
    }

    setOnClick(onClick: () => void) {
      this.button.onClick = onClick
      return this
    }

    setOnChange(onChange: () => void) {
      this.button.onChange = onChange
      return this
    }

    setActive(active: boolean) {
      this.button.active = active
      return this
    }

    setValue(value: string) {
      this.button.value = value
      return this
    }

    build() {
      return this.button
    }
  }
}
