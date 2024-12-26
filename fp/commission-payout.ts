interface Affiliate {
  sales: number
  commission: number
  bankCode: string
}

interface PayableTransaction {
  bankCode: Affiliate['bankCode']
  amount: number
}

// 액션(부수 효과): 실제 송금을 수행하는 부분
function sendPayout(bankCode: string, amount: number) {
  console.log(`Sending payout of $${amount} to bank code: ${bankCode}`)
}

// 계산(순수 함수): 지불해야 할 금액을 계산
function calculatePayout(affiliate: Affiliate): number {
  return affiliate.sales * affiliate.commission
}

// 계산(순수 함수): 지불 가능한 금액인지 확인
function isPayoutEligible(amount: number): boolean {
  return amount > 100
}

// 계산(순수 함수): 지불이 필요한 건들만 추출
function getPayableTransactions(affiliates: Affiliate[]): PayableTransaction[] {
  return affiliates
    .map(affiliate => ({
      bankCode: affiliate.bankCode,
      amount: calculatePayout(affiliate),
    }))
    .filter(({ amount }) => isPayoutEligible(amount))
}

// 액션(부수 효과): 최종적으로 송금 실행
function processPayouts(payableTransactions: PayableTransaction[]) {
  payableTransactions.forEach(({ bankCode, amount }) => {
    sendPayout(bankCode, amount)
  })
}

// 메인 함수에서 계산과 액션을 조합
function main(affiliates: Affiliate[]) {
  const payableTransactions = getPayableTransactions(affiliates) // 계산
  processPayouts(payableTransactions) // 액션
}

const testAffiliates = [
  { sales: 50, commission: 2, bankCode: 'BANK123' }, // 100달러 이하, 송금하지 않음
  { sales: 60, commission: 2, bankCode: 'BANK456' }, // 120달러, 송금함
  { sales: 30, commission: 3, bankCode: 'BANK789' }, // 90달러, 송금하지 않음
  { sales: 70, commission: 1.5, bankCode: 'BANK101' }, // 105달러, 송금함
]

main(testAffiliates)
// 결과값:
// Sending payout of $120 to bank code: BANK456
// Sending payout of $105 to bank code: BANK101
