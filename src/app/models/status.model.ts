export class Status {
  _id: string;
  color: string;
  name: string;
  order: string;
  type: string;

  constructor(
    _id?: string,
    color?: string,
    name?: string,
    order?: string,
    type?: string
  ) {
    this._id = _id!;
    this.color = color!;
    this.name = name!;
    this.order = order!;
    this.type = type!;
  }

  // init() {
  //   return new Status(null!, '#ff9800', 'Черновик', null!, null!);
  // }
}
