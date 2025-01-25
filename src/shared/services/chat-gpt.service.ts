import { config } from '@config/config';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  ChatCompletionAssistantMessageParam,
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/resources';

@Injectable()
export class ChatGptService {
  async execute(
    messages: (
      | ChatCompletionSystemMessageParam
      | ChatCompletionAssistantMessageParam
      | ChatCompletionUserMessageParam
    )[],
  ) {
    const openai = new OpenAI({
      apiKey: config.openAi.key,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
    });

    return completion.choices[0].message.content;
  }
}
