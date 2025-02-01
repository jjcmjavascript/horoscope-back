export interface PrimitiveTarot {
  id?: number;
  pushNotificationTokenId?: number;
  name: string;
  birthday: string;
  reading: string;
}

export class Tarot {
  private attributes: PrimitiveTarot;

  constructor(primitive: Partial<PrimitiveTarot>) {
    this.attributes = {
      id: primitive.id,
      pushNotificationTokenId: primitive.pushNotificationTokenId,
      name: primitive.name,
      birthday: primitive.birthday,
      reading: primitive.reading,
    };
  }

  static create(type: Partial<PrimitiveTarot>): Tarot {
    return new Tarot(type);
  }

  toPrimitive(): PrimitiveTarot {
    return {
      id: this.attributes.id,
      pushNotificationTokenId: this.attributes.pushNotificationTokenId,
      name: this.attributes.name,
      birthday: this.attributes.birthday,
      reading: this.attributes.reading,
    };
  }

  get values() {
    return this.attributes;
  }

  static fromArray(types: Array<PrimitiveTarot>): Array<Tarot> {
    return types.map((user) => new Tarot(user));
  }
}
