import { Grimpan } from '../grimpan/abstract.js'
import type { GrimpanMode } from '../grimpan/types.js'
import { Command } from './command/abstract.js'
import type { ButtonType } from './types.js'

export abstract class GrimpanMenu {
  colorButton!: HTMLInputElement

  protected constructor(public grimpan: Grimpan, public dom: HTMLElement) {}

  setActiveButton(type: GrimpanMode) {
    document.querySelector('.active')?.classList.remove('active')
    document.querySelector(`#${type}-button`)?.classList.add('active')
  }

  // invoker이기 때문에 excute를 메서드로 따로 빼둠
  executeCommand(command: Command) {
    command.execute()
  }

  abstract initialize(types: ButtonType[]): void

  static getInstance(grimpan: Grimpan, dom: HTMLElement) {}
}
