export interface AddressState {
  items: Array<IAddress>;
  selectedAddress: IAddress;
}

export interface IAddress {
  name_tag: string;
  address: string;
}

export interface IAddressAction {
  payload: IAddress;
}
