export interface payment {
  paymentId: number; 
  cardOwnerName?: string; 
  cardNumber?: string; 
  securityCode?: string; 
  validThrough?: string; 
  userId?: number; 
}
