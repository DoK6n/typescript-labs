import { Grimpan } from '../grimpan/abstract.js'

export abstract class Mode {
  constructor(protected grimpan: Grimpan) {}

  abstract mousedown(e: MouseEvent): void
  abstract mousemove(e: MouseEvent): void
  abstract mouseup(e: MouseEvent): void
}
