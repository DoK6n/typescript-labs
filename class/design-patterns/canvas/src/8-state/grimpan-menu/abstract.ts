import { Grimpan } from '../grimpan/abstract.js'
import type { GrimpanMode } from '../grimpan/types'
import type { ButtonType } from './types'

export abstract class GrimpanMenu {
  colorButton!: HTMLInputElement

  protected constructor(public grimpan: Grimpan, public dom: HTMLElement) {}

  setActiveButton(type: GrimpanMode) {
    document.querySelector('.active')?.classList.remove('active')
    document.querySelector(`#${type}-button`)?.classList.add('active')
    this.grimpan.setMode(type)
  }

  abstract initialize(types: ButtonType[]): void

  static getInstance(grimpan: Grimpan, dom: HTMLElement) {}
}
