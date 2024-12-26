function sendPayout(bankCode: string, amount: number) {
  console.log(`Sending payout of $${amount} to bank code: ${bankCode}`)
}

function figurePayout(affiliate: { sales: number; commission: number; bank_code: string }) {
  let owed = affiliate.sales * affiliate.commission
  if (owed > 100) {
    // 100달러 이하인 경우 송금하지 않기
    sendPayout(affiliate.bank_code, owed) // 액션
  }
}

function affiliatePayout(affiliates: { sales: number; commission: number; bank_code: string }[]) {
  for (let a = 0; a < affiliates.length; a++) {
    figurePayout(affiliates[a]) // 액션
  }
}

function main(affiliates: { sales: number; commission: number; bank_code: string }[]) {
  affiliatePayout(affiliates) // 액션
}

const testAffiliates = [
  { sales: 50, commission: 2, bank_code: 'BANK123' }, // 100달러 이하, 송금하지 않음
  { sales: 60, commission: 2, bank_code: 'BANK456' }, // 120달러, 송금함
  { sales: 30, commission: 3, bank_code: 'BANK789' }, // 90달러, 송금하지 않음
  { sales: 70, commission: 1.5, bank_code: 'BANK101' }, // 105달러, 송금함
]

main(testAffiliates)
// 결과값:
// Sending payout of $120 to bank code: BANK456
// Sending payout of $105 to bank code: BANK101

export {}
