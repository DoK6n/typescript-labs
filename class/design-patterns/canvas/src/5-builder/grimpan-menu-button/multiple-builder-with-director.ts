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
  name?: string
  type?: string
  onClick?: () => void
  onChange?: () => void
  active?: boolean
  value?: string

  constructor(props?: IButton & IInput) {
    this.name = props?.name
    this.type = props?.type
    this.onClick = props?.onClick
    this.onChange = props?.onChange
    this.active = props?.active
    this.value = props?.value
  }
}

interface GrimpanMenuButtonBuilder {
  setName(name: string): this
  setType(type: string): this
  setOnClick(onClick: () => void): this
  setOnChange(onChange: () => void): this
  setActive(active: boolean): this
  setValue(value: string): this
  build(): GrimpanMenuButton
}

class ChromeMenuButtonBuilder implements GrimpanMenuButtonBuilder {
  button: GrimpanMenuButton

  constructor() {
    this.button = new GrimpanMenuButton()
  }

  setName(name: string) {
    this.button.name = name
    return this
  }

  setType(type: string) {
    this.button.type = type
    return this
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

class IEMenuButtonBuilder implements GrimpanMenuButtonBuilder {
  button: GrimpanMenuButton

  constructor() {
    this.button = new GrimpanMenuButton()
  }

  setName(name: string) {
    this.button.name = name
    return this
  }

  setType(type: string) {
    this.button.type = type
    return this
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

class GrimpanMenuButtonDirector {
  static createBackButton(builder: GrimpanMenuButtonBuilder) {
    const backButtonBuilder = builder
      .setName('뒤로')
      .setType('back')
      .setOnClick(() => console.log('뒤로 버튼 클릭'))
      .setActive(false)
      .build()

    return backButtonBuilder
  }

  static createForwardButton(builder: GrimpanMenuButtonBuilder) {
    const forwardButtonBuilder = builder
      .setName('앞으로')
      .setType('forward')
      .setOnClick(() => console.log('앞으로 버튼 클릭'))
      .setActive(false)
      .build()

    return forwardButtonBuilder
  }
}

const chromeBackButton = GrimpanMenuButtonDirector.createBackButton(new ChromeMenuButtonBuilder())
const chromeForwardButton = GrimpanMenuButtonDirector.createForwardButton(new ChromeMenuButtonBuilder())

const ieBackButton = GrimpanMenuButtonDirector.createBackButton(new IEMenuButtonBuilder())
const ieForwardButton = GrimpanMenuButtonDirector.createForwardButton(new IEMenuButtonBuilder())
