import { laNacionScrapper } from './laNacionScrapper.js';
import { publimetroScrapper } from './publimetroScrapper.js';
import { horoscopo } from './horoscopo.js';

export async function websitesScraper() {
  const nowDate = new Date();
  const day = nowDate.getDate();
  const month = nowDate.getMonth() + 1;
  const year = nowDate.getFullYear();
  const urls = process.env.URLS.split(';');

  try {
    const analizedData = {};

    while (urls.length > 0) {
      const url = urls.splice(0, 1)[0];

      if (url.includes('lanacion')) {
        const scrapRresult = await laNacionScrapper({
          url,
          date: { year, month, day },
        });
        const name = new URL(url).hostname.replace(/www\.(\w+)\./g, '$1');

        analizedData[name] = scrapRresult;
      }

      if (url.includes('horoscopo.com')) {
        const scrapRresult = await horoscopo({
          url,
        });
        const name = new URL(url).hostname.replace(/www\.(\w+)\./g, '$1');

        analizedData[name] = scrapRresult;
      }

      if (url.includes('publimetro')) {
        const scrapRresult = await publimetroScrapper({
          url,
          date: { year, month, day },
        });
        const name = new URL(url).hostname.replace(/www\.(\w+)\./g, '$1');

        analizedData[name] = scrapRresult;
      }
    }

    return analizedData;
  } catch (error) {
    console.error('Error al scrapear el sitio:', error.message);
  }
}
