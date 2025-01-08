import { SetMetadata } from '@nestjs/common';

export const HAS_HOROSCOPE_KEY = 'hasHoroscopeKey';

export const HasHoroscopeKey = () => SetMetadata(HAS_HOROSCOPE_KEY, true);
