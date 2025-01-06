import * as cheerio from 'cheerio';
import {
  getInitialHtmlFromRequest,
  requester,
} from '../helpers/request.helper.js';
import { removeAccents } from '../helpers/text.helper.js';

export async function horoscopo({ url }) {
  const errors = [];
  const textOuput = {};

  try {
    const initialHtml = await getInitialHtmlFromRequest(url);
    const horoscopoUrls = [];

    // Carga el html inicial
    const $ = cheerio.load(initialHtml);

    // Busca los links por fecha
    $('a').each((_, element) => {
      const link = $(element).attr('href');

      if (link?.includes('/horoscopos/general-diaria')) {
        horoscopoUrls.push(url.replace('/horoscopo', '').concat(link));
      }
    });

    const uniqHoroscopoUrls = [...new Set(horoscopoUrls)];

    console.info(
      `total links founded: ${uniqHoroscopoUrls.length} from ${url}`,
      uniqHoroscopoUrls,
    );

    const horoscopoRequests = uniqHoroscopoUrls.map((url) => requester(url));
    const horoscopoRequestsResults =
      await Promise.allSettled(horoscopoRequests);
    const fulfilledPromises = horoscopoRequestsResults.filter(
      (pr) => pr.status === 'fulfilled',
    );
    const rejectedPromises = horoscopoRequestsResults.filter(
      (pr) => pr.status === 'rejected',
    );

    if (fulfilledPromises.length < 1) {
      errors.push('All promised were rejected');
    }

    if (rejectedPromises.length > 0) {
      rejectedPromises.forEach((r) => errors.push(r.reason));
    }

    let i = 0;

    while (i < fulfilledPromises.length) {
      const responseText = await fulfilledPromises[i].value.text();
      const $$ = cheerio.load(responseText);

      const title = $$('.horoscope-box.zigzag-box h1').first().text().trim();
      const content = $$('.horoscope-box.zigzag-box p').first().text().trim();
      const starsRating = {};

      $$('.module-star-ratings ul').each((j, ulElement) => {
        const category = $$(ulElement).find('li.text-right h4').text().trim();
        const stars = $$(ulElement).find(
          'li i.icon-filled-star.highlight',
        ).length;

        if (category) {
          starsRating[removeAccents(category)] = `${stars.length} de 5`;
        }
      });

      textOuput[title] = [content];

      i++;
    }
  } catch (e) {
    errors.push(e.message);
  }

  return { textOuput, errors };
}
