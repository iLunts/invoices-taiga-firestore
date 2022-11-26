export class Unit {
  _id!: string;
  fullName!: string;
  shortName!: string;

  toString(): string {
    return this.shortName!;
  }
}
