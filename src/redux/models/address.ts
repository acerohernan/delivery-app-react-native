export interface AddressState {
  items: Array<IAddress>;
}

export interface IAddress {
  name_tag: string;
  address: string;
}

export interface IAddressAction {
  payload: IAddress;
}
