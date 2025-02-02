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
