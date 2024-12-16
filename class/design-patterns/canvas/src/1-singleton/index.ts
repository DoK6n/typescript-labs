class Grimpan {
  private static instance: Grimpan

  private constructor(canvas: HTMLCanvasElement | null) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('canvas 엘리먼트를 입력하세요')
    }
  }

  initialize() {}
  initializeMenu() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Grimpan(document.querySelector('#canvas'))
    }

    return this.instance
  }
}

export default Grimpan

/**
 * private constructor 자체는 유닛 테스트를 할 수 없어서 getInstance 메서드를 통해서 간접적으로 테스트를 해야 한다.
 *
 * getInstance method는 단일책임원칙(SRP)를 위반한다는 얘기도 있다.
 *   > 어떤 Function, Method, Class 들은 하나의 책임만 가져야 한다.
 *   > 쉽게 말하면 바꿔야 하는 상황에서 바꿔야되는 이유가 한가지만 있어야 한다.
 *   > 위 상황에서 그림판 생성을 다르게 생성하고 싶을땐 getInstance를 변경해야 한다.
 *   > 하지만 만약 이 getInstance가 인스턴스가 두가지 타입을 생성하는 경우라면 이 메서드는 두가지 책임을 가지게 된다.
 */
