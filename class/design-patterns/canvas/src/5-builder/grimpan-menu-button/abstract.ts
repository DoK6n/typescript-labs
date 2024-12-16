import { GrimpanMenu } from '../grimpan-menu/abstract.js'

export abstract class GrimpanMenuElementBuilder {
  button!: GrimpanMenuElement
  constructor() {}
  build() {
    return this.button
  }
}
export abstract class GrimpanMenuElement {
  protected menu: GrimpanMenu
  protected name: string
  protected constructor(menu: GrimpanMenu, name: string) {
    this.menu = menu
    this.name = name
  }
  abstract draw(): void
}
