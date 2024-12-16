import { GrimpanMenu } from '../grimpan-menu/abstract.js'
import { GrimpanMenuElement, GrimpanMenuElementBuilder } from './abstract.js'

export class GrimpanMenuInput extends GrimpanMenuElement {
  private onChange?: () => void
  private value?: string | number

  private constructor(props: { menu: GrimpanMenu; name: string; onChange?: () => void; value?: string | number }) {
    super(props.menu, props.name)
    this.onChange = props.onChange
    this.value = props.value
  }

  draw() {
    const btn = document.createElement('input')
    btn.type = 'color'
    btn.title = this.name
    if (this.onChange) {
      btn.addEventListener('change', this.onChange.bind(this))
    }
    this.menu.dom.append(btn)
  }

  static Builder = class GrimpanMenuInputBuilder extends GrimpanMenuElementBuilder {
    override button: GrimpanMenuInput
    constructor(props: { menu: GrimpanMenu; name: string }) {
      super()
      this.button = new GrimpanMenuInput(props)
    }

    setOnChange(onChange: () => void) {
      this.button.onChange = onChange
      return this
    }
    setValue(value: string | number) {
      this.button.value = value
      return this
    }
  }
}
