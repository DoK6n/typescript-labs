import { GrimpanHistory } from '../../grimpan-history/abstract.js'
import { Grimpan } from '../../grimpan/abstract.js'
import { Command } from './abstract.js'

export class BackCommand extends Command {
  name = 'back'

  constructor(private history: GrimpanHistory) {
    super()
  }

  override execute(): void {
    this.history.undo() // receiver에게 로직 전송
  }
}

export class ForwardCommand extends Command {
  name = 'forward'

  constructor(private history: GrimpanHistory) {
    super()
  }

  override execute(): void {
    this.history.redo() // receiver에게 로직 전송
  }
}

export class PenSelectCommand extends Command {
  name = 'penSelect'

  constructor(private grimpan: Grimpan) {
    super()
  }

  override execute(): void {
    this.grimpan.menu.setActiveButton('pen')
  }
}

export class EraserSelectCommand extends Command {
  name = 'eraserSelect'

  constructor(private grimpan: Grimpan) {
    super()
  }

  override execute(): void {
    this.grimpan.menu.setActiveButton('eraser')
  }
}

export class CircleSelectCommand extends Command {
  name = 'circleSelect'

  constructor(private grimpan: Grimpan) {
    super()
  }

  override execute(): void {
    this.grimpan.menu.setActiveButton('circle')
  }
}

export class RectangleSelectCommand extends Command {
  name = 'rectangleSelect'

  constructor(private grimpan: Grimpan) {
    super()
  }

  override execute(): void {
    this.grimpan.menu.setActiveButton('rectangle')
  }
}

export class PipetteSelectCommand extends Command {
  name = 'pipetteSelect'

  constructor(private grimpan: Grimpan) {
    super()
  }

  override execute(): void {
    this.grimpan.menu.setActiveButton('pipette')
  }
}
