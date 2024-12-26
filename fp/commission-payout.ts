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
