import { Grimpan } from '../grimpan/abstract.js'
import { HistoryStack } from './stack.js'

export abstract class GrimpanHistory {
  grimpan: Grimpan
  #stack: HistoryStack

  protected constructor(grimpan: Grimpan) {
    this.grimpan = grimpan
    this.#stack = new HistoryStack()
  }

  abstract undo(): void
  abstract redo(): void

  get stack() {
    return this.#stack.clone()
  }

  set stack(stack: HistoryStack) {
    this.#stack = stack.clone()
  }

  abstract initialize(): void

  static getInstance(grimpan: Grimpan) {}
}
