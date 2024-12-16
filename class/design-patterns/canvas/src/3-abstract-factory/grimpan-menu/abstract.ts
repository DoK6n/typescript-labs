import { Grimpan } from '../grimpan/abstract.js'

export abstract class GrimpanMenu {
  grimpan: Grimpan
  protected constructor(grimpan: Grimpan) {
    this.grimpan = grimpan
  }
  abstract initialize(): void
  static getInstance(grimpan: Grimpan) {}
}
