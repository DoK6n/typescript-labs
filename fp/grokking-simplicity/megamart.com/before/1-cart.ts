interface Item {
  name: string
  price: number
}

let shopping_cart: Item[] = [] // 장바구니 제품과 금액 합계를 담고 있는 전역변수
let shopping_cart_total: number = 0

function add_item_to_cart(name: string, price: number) {
  shopping_cart.push({
    // 장바구니에 제품을 담기 위해 cart 배열에 레코드를 추가
    name: name,
    price: price,
  })
  calc_cart_total() // 장바구니 제품이 바뀌었기 때문에 금액 합계를 업데이트
}

function calc_cart_total() {
  shopping_cart_total = 0
  for (let i = 0; i < shopping_cart.length; i++) {
    let item = shopping_cart[i]
    shopping_cart_total += item.price // 모든 제품값 더하기
  }
  set_cart_total_dom() // 금액 합계를 반영하기 위해 DOM 업데이트
}

function set_cart_total_dom() {}

export {}
