// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ChatMessage } = initSchema(schema);

export {
  ChatMessage
};