export function createsSubscriptionValidity() {
  const date = new Date()
  const freeTrialDays = 7
  const subscriptionValidity = date.setDate(date.getDate() + freeTrialDays)

  return new Date(subscriptionValidity)
}
