export enum DialogViewEnum {
  getAddresses = '[View] getAddresses',
  addAddress = '[View] addAddress',
}
export interface ViewDialogState {
  currentView: DialogViewEnum;
}