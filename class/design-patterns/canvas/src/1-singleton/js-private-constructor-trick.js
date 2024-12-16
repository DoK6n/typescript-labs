const GRIMPAN_CONSTRUCTOR_SYMBOL = Symbol()

class Grimpan {
  static instance

  constructor(canvas, symbol) {
    if (symbol !== GRIMPAN_CONSTRUCTOR_SYMBOL) {
      throw new Error('Grimpan 클래스는 직접 생성할 수 없습니다.')
    }

    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('canvas 엘리먼트를 입력하세요')
    }
  }
  initialize() {}
  initializeMenu() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Grimpan(document.querySelector('#canvas'), GRIMPAN_CONSTRUCTOR_SYMBOL)
    }
    return this.instance
  }
}

export default Grimpan

/**
 * JS에서 생성자를 private으로 만들기 위해서는 Symbol을 사용해서 구현할 수 있다.
 */
