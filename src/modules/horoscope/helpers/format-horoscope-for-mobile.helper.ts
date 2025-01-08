import { HoroscopeDetailsPrimitive } from '@shared/entities/horoscope-details.entity';
import { HoroscopePrimitive } from '@shared/entities/horoscope.entity';
import { monthNumberToWord } from '@shared/helpers/date.helper';

export const formatHoroscopeForMobile = ({
  horoscope,
  horoscopeDetails,
}: {
  horoscope: HoroscopePrimitive;
  horoscopeDetails: HoroscopeDetailsPrimitive[];
}) => {
  const nowDate = new Date(horoscope.createdAt);
  const data = {
    formatedDate: `${monthNumberToWord(nowDate.getMonth() + 1)} ${nowDate.getDate()} del ${nowDate.getFullYear()}`,
    signs: horoscopeDetails.reduce(
      (acc: any, next: HoroscopeDetailsPrimitive) => {
        acc[next.sign] = next.data;

        return acc;
      },
      {},
    ),
  };

  return data;
};
