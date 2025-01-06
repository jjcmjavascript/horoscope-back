import * as cheerio from 'cheerio';
import { monthNumberToWord } from '../helpers/date-helper.js';
import {
  getInitialHtmlFromRequest,
  requester,
} from '../helpers/request.helper.js';
import { removeAccents } from '../helpers/text.helper.js';

export async function laNacionScrapper({ url, date: { month, day } }) {
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
      const secondWordToLookFor = `${day}-de-${monthNumberToWord(month).toLowerCase()}`;

      if (link?.includes('horoscopo') && link?.includes(secondWordToLookFor)) {
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

      const title = removeAccents($$('h3 b').first().text().trim());

      $$('div p.com-paragraph').each((j, ele) => {
        if (!textOuput[title]) {
          textOuput[title] = [];
        }

        textOuput[title].push($$(ele).text());
      });

      i++;
    }
  } catch (e) {
    errors.push(e.message);
  }

  return { textOuput, errors };
}
