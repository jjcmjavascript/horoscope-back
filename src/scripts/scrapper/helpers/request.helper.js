export const requester = (url) =>
  fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    },
  });

export const getInitialHtmlFromRequest = async (url) => {
  console.info(`getting initial html from ${url}`);

  const response = await requester(url);

  if (!response.ok) {
    throw new Error(`Error al realizar la solicitud: ${response.statusText}`);
  }

  const html = await response.text();

  console.info(`html founded from ${url}`);

  return html;
};
