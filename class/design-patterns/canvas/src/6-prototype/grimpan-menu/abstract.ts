import { Grimpan } from '../grimpan/abstract.js'
import { ButtonType } from './types.js'

export abstract class GrimpanMenu {
  protected constructor(public grimpan: Grimpan, public dom: HTMLElement) {}

  abstract initialize(types: ButtonType[]): void

  static getInstance(grimpan: Grimpan, dom: HTMLElement) {}
}
