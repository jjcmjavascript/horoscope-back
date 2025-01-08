export interface HoroscopePrimitive {
  id: number;
  createdAt: Date;
}

export class Horoscope {
  #attributes: HoroscopePrimitive;

  constructor(readonly horoscope: HoroscopePrimitive) {
    this.#attributes = horoscope;
  }

  get id() {
    return this.#attributes.id;
  }

  static create(horoscope: Partial<HoroscopePrimitive>): Horoscope {
    return new Horoscope({
      id: horoscope.id,
      createdAt: horoscope.createdAt,
    });
  }

  toPrimitive(): HoroscopePrimitive {
    return {
      id: this.#attributes.id,
      createdAt: this.#attributes.createdAt,
    };
  }

  static fromArray(horoscopes: Array<HoroscopePrimitive>): Array<Horoscope> {
    return horoscopes.map((horoscope) => new Horoscope(horoscope));
  }
}
