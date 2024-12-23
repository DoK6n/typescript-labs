import { rgb2hex } from '../../lib/rgb2hex.js'
import {
  CircleSelectCommand,
  EraserSelectCommand,
  PenSelectCommand,
  PipetteSelectCommand,
  RectangleSelectCommand,
} from '../grimpan-menu/command/index.js'
import { Grimpan } from '../grimpan/abstract.js'
import { Mode } from './abstract.js'

export class PenMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan)
    grimpan.menu.executeCommand(new PenSelectCommand(grimpan))
  }

  override mousedown(e: MouseEvent): void {
    this.grimpan.active = true
    this.grimpan.ctx.lineWidth = 1
    this.grimpan.ctx.lineCap = 'round'
    this.grimpan.ctx.strokeStyle = this.grimpan.color
    this.grimpan.ctx.globalCompositeOperation = 'source-over'
    this.grimpan.ctx.beginPath()
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY)
  }

  override mousemove(e: MouseEvent): void {
    if (!this.grimpan.active) return

    this.grimpan.ctx.lineTo(e.offsetX, e.offsetY)
    this.grimpan.ctx.stroke()
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY)
  }

  override mouseup(e: MouseEvent): void {
    this.grimpan.active = false
    // 히스토리 저장
  }
}

export class EraserMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan)
    grimpan.menu.executeCommand(new EraserSelectCommand(grimpan))
  }

  override mousedown(e: MouseEvent): void {
    this.grimpan.active = true
    this.grimpan.ctx.lineWidth = 10
    this.grimpan.ctx.lineCap = 'round'
    this.grimpan.ctx.strokeStyle = '#ffffff'
    this.grimpan.ctx.globalCompositeOperation = 'destination-out'
    this.grimpan.ctx.beginPath()
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY)
  }

  override mousemove(e: MouseEvent): void {
    if (!this.grimpan.active) return

    this.grimpan.ctx.lineTo(e.offsetX, e.offsetY)
    this.grimpan.ctx.stroke()
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY)
  }

  override mouseup(e: MouseEvent): void {
    this.grimpan.active = false
    // 히스토리 저장
  }
}

export class CircleMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan)
    grimpan.menu.executeCommand(new CircleSelectCommand(grimpan))
  }

  override mousedown(e: MouseEvent): void {}

  override mousemove(e: MouseEvent): void {}

  override mouseup(e: MouseEvent): void {}
}

export class PipetteMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan)
    grimpan.menu.executeCommand(new PipetteSelectCommand(grimpan))
  }

  override mousedown(e: MouseEvent): void {}

  override mousemove(e: MouseEvent): void {
    const { data } = this.grimpan.ctx.getImageData(e.offsetX, e.offsetY, 1, 1) // 픽셀 1칸에 대한 데이터 추출
    const [r, g, b, a] = data.slice(0, 4)
    if (a === 0) {
      this.grimpan.changeColor('#ffffff')
    } else {
      this.grimpan.changeColor(rgb2hex(r, g, b))
    }
  }

  override mouseup(e: MouseEvent): void {
    this.grimpan.setMode('pen')
  }
}

export class RectangleMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan)
    grimpan.menu.executeCommand(new RectangleSelectCommand(grimpan))
  }

  override mousedown(e: MouseEvent): void {}

  override mousemove(e: MouseEvent): void {}

  override mouseup(e: MouseEvent): void {}
}
