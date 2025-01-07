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

function update_shipping_icons() {
  // 모든 구매 버튼을 가져와 반복문을 처리합니다
  let buy_buttons = get_buy_buttons_dom()
  for (let i = 0; i < buy_buttons.length; i++) {
    let button = buy_buttons[i]
    let item = button.item
    if (item.price + shopping_cart_total >= 20) {
      // 무료 배송이 가능하지 확인합니다
      button.show_free_shipping_icon() // 무료배송 아이콘을 보여주거나 보여주지 않습니다
    } else {
      button.hide_free_shipping_icon()
    }
  }
}

function calc_cart_total() {
  shopping_cart_total = 0
  for (let i = 0; i < shopping_cart.length; i++) {
    let item = shopping_cart[i]
    shopping_cart_total += item.price // 모든 제품값 더하기
  }
  set_cart_total_dom() // 금액 합계를 반영하기 위해 DOM 업데이트
  update_shipping_icons()
}

// 아래는 위에서 필요한 함수 임시로 구현

function set_cart_total_dom() {}
function get_buy_buttons_dom() {
  return [
    {
      item: { name: '신발', price: 13.99 },
      show_free_shipping_icon: () => console.log('무료 배송 아이콘 표시'),
      hide_free_shipping_icon: () => console.log('무료 배송 아이콘 숨김'),
    },
    {
      item: { name: '재킷', price: 23.99 },
      show_free_shipping_icon: () => console.log('무료 배송 아이콘 표시'),
      hide_free_shipping_icon: () => console.log('무료 배송 아이콘 숨김'),
    },
  ]
}

export {}
