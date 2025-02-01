export const monthNumberToWord = (month, lang = 'es') => {
  const months = {
    1: { en: 'January', es: 'Enero' },
    2: { en: 'February', es: 'Febrero' },
    3: { en: 'March', es: 'Marzo' },
    4: { en: 'April', es: 'Abril' },
    5: { en: 'May', es: 'Mayo' },
    6: { en: 'June', es: 'Junio' },
    7: { en: 'July', es: 'Julio' },
    8: { en: 'August', es: 'Agosto' },
    9: { en: 'September', es: 'Septiembre' },
    10: { en: 'October', es: 'Octubre' },
    11: { en: 'November', es: 'Noviembre' },
    12: { en: 'December', es: 'Diciembre' },
  };

  return months[month][lang];
};

export const datesToZodiacSign = (month: number, day: number) => {
  const zodiacSigns = [
    {
      sign: 'Capricornio',
      start: { month: 12, day: 22 },
      end: { month: 1, day: 19 },
    },
    {
      sign: 'Acuario',
      start: { month: 1, day: 20 },
      end: { month: 2, day: 18 },
    },
    {
      sign: 'Piscis',
      start: { month: 2, day: 19 },
      end: { month: 3, day: 20 },
    },
    { sign: 'Aries', start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
    { sign: 'Tauro', start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
    {
      sign: 'Géminis',
      start: { month: 5, day: 21 },
      end: { month: 6, day: 20 },
    },
    {
      sign: 'Cáncer',
      start: { month: 6, day: 21 },
      end: { month: 7, day: 22 },
    },
    { sign: 'Leo', start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
    { sign: 'Virgo', start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
    {
      sign: 'Libra',
      start: { month: 9, day: 23 },
      end: { month: 10, day: 22 },
    },
    {
      sign: 'Escorpio',
      start: { month: 10, day: 23 },
      end: { month: 11, day: 21 },
    },
    {
      sign: 'Sagitario',
      start: { month: 11, day: 22 },
      end: { month: 12, day: 21 },
    },
  ];

  const sign = zodiacSigns.find((zodiac) => {
    const { start, end } = zodiac;

    if (month === start.month && day >= start.day) {
      return true;
    }

    if (month === end.month && day <= end.day) {
      return true;
    }

    return false;
  });

  return sign;
};
