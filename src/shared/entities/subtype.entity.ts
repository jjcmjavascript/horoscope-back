export interface PrimitiveSubType {
  id: number;
  typeId: number;
  description: string;
}

export class SubType {
  private attributes: PrimitiveSubType;

  constructor(primitive: Partial<PrimitiveSubType>) {
    this.attributes = {
      id: primitive.id,
      typeId: primitive.typeId,
      description: primitive.description,
    };
  }

  static create(type: Partial<PrimitiveSubType>): SubType {
    return new SubType(type);
  }

  toPrimitive(): PrimitiveSubType {
    return {
      id: this.attributes.id,
      typeId: this.attributes.typeId,
      description: this.attributes.description,
    };
  }

  static fromArray(types: Array<PrimitiveSubType>): Array<SubType> {
    return types.map((user) => new SubType(user));
  }
}
