export interface PrimitiveType {
  id: number;
  name: string;
}

export class Type {
  private attributes: PrimitiveType;

  constructor(primitive: Partial<PrimitiveType>) {
    this.attributes = {
      id: primitive.id,
      name: primitive.name,
    };
  }

  static create(type: Partial<PrimitiveType>): Type {
    return new Type(type);
  }

  toPrimitive(): PrimitiveType {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
    };
  }

  static fromArray(types: Array<PrimitiveType>): Array<Type> {
    return types.map((user) => new Type(user));
  }
}
