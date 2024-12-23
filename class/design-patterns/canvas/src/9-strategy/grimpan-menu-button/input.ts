import { Bind } from '../../lib/bind.decorator.js'
import { GrimpanMenu } from '../grimpan-menu/abstract.js'
import type { ButtonType } from '../grimpan-menu/types.js'
import { GrimpanMenuElement, GrimpanMenuElementBuilder } from './abstract.js'

export class GrimpanMenuInput extends GrimpanMenuElement {
  private onChange?: (e: Event) => void
  private value?: string | number

  private constructor(props: {
    menu: GrimpanMenu
    name: string
    type: ButtonType
    onChange?: (e: Event) => void
    value?: string | number
  }) {
    super(props.menu, props.name, props.type)
    this.onChange = props.onChange
    this.value = props.value
  }

  draw() {
    const button = document.createElement('input')
    button.type = 'color'
    button.title = this.name
    button.id = 'color-button'

    if (this.onChange) {
      button.addEventListener('change', this.onChange)
    }
    this.menu.colorButton = button
    this.menu.dom.append(button)
  }

  static Builder = class GrimpanMenuInputBuilder extends GrimpanMenuElementBuilder {
    override button: GrimpanMenuInput
    constructor(props: { menu: GrimpanMenu; name: string; type: ButtonType }) {
      super()
      this.button = new GrimpanMenuInput(props)
    }

    @Bind
    setOnChange(onChange: (e: Event) => void) {
      this.button.onChange = onChange
      return this
    }
    setValue(value: string | number) {
      this.button.value = value
      return this
    }
  }
}
