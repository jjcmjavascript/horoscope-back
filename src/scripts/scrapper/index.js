import 'dotenv/config';
import process from 'node:process';
import OpenAI from 'openai';
import { websitesScraper } from './scrappers/websitesScraper.js';
import { initialSpeech } from './helpers/text.helper.js';
import { monthNumberToWord } from './helpers/date-helper.js';

const nowDate = new Date();

async function createConversation() {
  const jsonResult = await websitesScraper();
  const jsonResultToText = JSON.stringify(jsonResult)
    .replace('^[a-zA-Z-0-9]$', '')
    .replace(/\s+|\t/g, ' ');

  const initial = initialSpeech().replace().replace(/\s+/g, '');
  const conversations = [
    // {
    //   role: 'system',
    //   content: initial,
    // },
    // {
    //   role: 'assistant',
    //   content: previousResponse,
    // },
    {
      role: 'user',
      content: `${initial}: ${jsonResultToText}`,
    },
  ];

  return conversations;
}

async function getChatGptResponse() {
  console.info('Generating chat');
  const messages = await createConversation();

  const openai = new OpenAI({
    apiKey: process.env.GPTKEY,
  });

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
  });
  console.info('chat finished');
  return completion.choices[0].message.content;
}

export async function initHoroscopeProcess() {
  let fileContent = null;

  try {
    fileContent = await getChatGptResponse();

    return {
      date: nowDate.toISOString(),
      formatedDate: `${monthNumberToWord(nowDate.getMonth() + 1)} ${nowDate.getDate()} del ${nowDate.getFullYear()}`,
      signs: JSON.parse(
        fileContent
          .replace(/.*?```json(.*?)```.*/, '$1')
          .trim()
          .replace(/```(json)?/g, ''),
      ),
    };
  } catch (e) {
    console.log(e, 'fileContent', fileContent);
    throw Error('error in horoscope script');
  }
}
