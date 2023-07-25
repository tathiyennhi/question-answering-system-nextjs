import { ChatBody, QuestionPayload } from '@/types/types';
import axios from 'axios';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { question, file_path, apiKey } =
      (await req.json()) as QuestionPayload;
    let apiKeyFinal;

    if (apiKey) {
      apiKeyFinal = apiKey;
    } else {
      apiKeyFinal = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    }

    if (!apiKey) {
      return new Response('API key not found', { status: 500 });
    }

    const response = await axios.post('/api/process', {
      question: question,
      file: file_path,
      apiKey: apiKeyFinal,
    });

    return new Response(response.data);
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
