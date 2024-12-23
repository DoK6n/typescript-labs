import { GrimpanMenu } from '../grimpan-menu/abstract.js'
import type { ButtonType } from '../grimpan-menu/types.js'

export abstract class GrimpanMenuElementBuilder {
  button!: GrimpanMenuElement
  constructor() {}
  build() {
    return this.button
  }
}

export abstract class GrimpanMenuElement {
  protected constructor(protected menu: GrimpanMenu, protected name: string, protected type: ButtonType) {}
  abstract draw(): void
}
