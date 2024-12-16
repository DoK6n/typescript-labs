import { Grimpan } from '../grimpan/abstract.js'

export abstract class GrimpanHistory {
  grimpan: Grimpan
  protected constructor(grimpan: Grimpan) {
    this.grimpan = grimpan
  }
  abstract initialize(): void
  static getInstance(grimpan: Grimpan) {}
}
