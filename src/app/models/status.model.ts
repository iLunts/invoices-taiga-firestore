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
    this._id = _id || null;
    this.color = color || null;
    this.name = name || null;
    this.order = order || null;
    this.type = type || null;
  }
}
