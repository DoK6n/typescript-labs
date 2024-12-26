// 이메일 발송 시스템
const emailSystem = {
  send: (email: Email) => {
    console.log(`sending email to ${email.to}`)
  },
}

const DEFAULT_PAGE_SIZE = 20

// FromDB
function fetchSubscribersFromDB(page: number): Subscriber[] {
  const subscribers = [
    { email: 'john@coldmail.com', rec_count: 2 },
    { email: 'sam@pmail.co', rec_count: 16 },
    { email: 'linda1989@oal.com', rec_count: 1 },
    { email: 'jan1940@ahoy.com', rec_count: 0 },
    { email: 'mrbig@pmail.co', rec_count: 25 },
    { email: 'lol@lol.lol', rec_count: 0 },
  ]

  return subscribers.slice(page * DEFAULT_PAGE_SIZE, (page + 1) * DEFAULT_PAGE_SIZE)
}

function fetchCouponsFromDB(): Coupon[] {
  return [
    { code: 'MAYDISCOUNT', rank: 'good' },
    { code: '10PERCENT', rank: 'bad' },
    { code: 'PROMOTION45', rank: 'best' },
    { code: 'IHEARTYOU', rank: 'bad' },
    { code: 'GETADEAL', rank: 'best' },
    { code: 'ILIKEDISCOUNTS', rank: 'good' },
  ]
}

// 구독자와 쿠폰 타입 정의
interface Subscriber {
  email: string
  rec_count: number
}

type CouponRank = 'best' | 'good' | 'bad'
type ValidCouponRank = Exclude<CouponRank, 'bad'>

interface Coupon {
  code: string
  rank: CouponRank
}

interface Email {
  from: string
  to: string
  subject: string
  body: string
}

// 구독자의 등급을 결정하는 함수
function subCouponRank(subscriber: Subscriber): ValidCouponRank {
  if (subscriber.rec_count >= 10) {
    return 'best'
  }
  return 'good'
}

// 특정 등급의 쿠폰을 선택하는 함수 [계산]
function selectCouponsByRank(coupons: Coupon[], rank: CouponRank): string[] {
  const ret: string[] = []
  for (let c = 0; c < coupons.length; c++) {
    const coupon = coupons[c]
    if (coupon.rank === rank) {
      ret.push(coupon.code)
    }
  }
  return ret
}

// 구독자별 이메일 생성 함수
function emailForSubscriber(subscriber: Subscriber, goods: string[], bests: string[]): Email {
  const rank = subCouponRank(subscriber)

  if (rank === 'best') {
    return {
      from: 'newsletter@coupondog.co',
      to: subscriber.email,
      subject: 'Your best weekly coupons inside',
      body: 'Here are the best coupons: ' + bests.join(', '),
    }
  }

  return {
    from: 'newsletter@coupondog.co',
    to: subscriber.email,
    subject: 'Your weekly coupons inside',
    body: 'Here are the good coupons: ' + goods.join(', '),
  }
}

// 모든 구독자의 이메일 생성
function emailsForSubscribers(subscribers: Subscriber[], goods: string[], bests: string[]): Email[] {
  const emails: Email[] = []
  for (let s = 0; s < subscribers.length; s++) {
    const subscriber = subscribers[s]
    const email = emailForSubscriber(subscriber, goods, bests)
    emails.push(email)
  }
  return emails
}

// 이메일 발송 실행 함수
function sendIssue() {
  const coupons = fetchCouponsFromDB()
  const goodCoupons = selectCouponsByRank(coupons, 'good')
  const bestCoupons = selectCouponsByRank(coupons, 'best')
  let page = 0
  let subscribers = fetchSubscribersFromDB(page)

  while (subscribers.length > 0) {
    const emails = emailsForSubscribers(subscribers, goodCoupons, bestCoupons)
    for (let e = 0; e < emails.length; e++) {
      const email = emails[e]
      emailSystem.send(email)
    }
    page++
    subscribers = fetchSubscribersFromDB(page)
  }
}
