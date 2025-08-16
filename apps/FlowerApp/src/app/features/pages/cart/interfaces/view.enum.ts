export enum ViewCartStateEnum {
  Cart = '[View] Cart',
  Shipping = '[View] Shipping',
}
 export interface ViewCartState {
  currentView: ViewCartStateEnum;
}