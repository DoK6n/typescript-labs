export default abstract class Grimpan {
  protected constructor(canvas: HTMLCanvasElement | null) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('canvas 엘리먼트를 입력하세요')
    }
  }

  abstract initialize(): void
  abstract initializeMenu(): void

  static getInstance() {}
}
