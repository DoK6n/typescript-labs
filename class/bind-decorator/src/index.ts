import { Bind } from './bind.decorator.js'

export class Button {
  name = 'button'
  type = 'submit'
  value = '제출'

  @Bind
  onBindDecoratorClick() {
    console.log('onBindDecoratorClick', this)
  }

  onUnBoundClick() {
    console.log('onUnBoundClick', this)
  }

  onArrowFunctionClick = () => {
    console.log('onArrowFunctionClick', this)
  }
}

const button = new Button()

const doClick = (onClick: () => void) => {
  onClick()
}

doClick(button.onBindDecoratorClick) // bound
doClick(button.onUnBoundClick) // not bound
doClick(button.onArrowFunctionClick) // bound
