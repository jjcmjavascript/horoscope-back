export interface HoroscopeDetailsPrimitiveData {
  type: string;
  value: string;
}

export interface HoroscopeDetailsPrimitive {
  id: number;
  horoscopeId: number;
  sign: string;
  data: HoroscopeDetailsPrimitiveData;
}

export class HoroscopeDetails {
  #attributes: HoroscopeDetailsPrimitive;

  constructor(readonly horoscope: HoroscopeDetailsPrimitive) {
    this.#attributes = horoscope;
  }

  static create(
    horoscope: Partial<HoroscopeDetailsPrimitive>,
  ): HoroscopeDetails {
    return new HoroscopeDetails({
      id: horoscope.id,
      horoscopeId: horoscope.horoscopeId,
      sign: horoscope.sign,
      data: horoscope.data,
    });
  }

  toPrimitive(): HoroscopeDetailsPrimitive {
    return {
      id: this.#attributes.id,
      horoscopeId: this.#attributes.horoscopeId,
      sign: this.#attributes.sign,
      data: this.#attributes.data,
    };
  }

  static fromArray(
    horoscopes_d: Array<HoroscopeDetailsPrimitive>,
  ): Array<HoroscopeDetails> {
    return horoscopes_d.map((horoscope) => new HoroscopeDetails(horoscope));
  }
}
