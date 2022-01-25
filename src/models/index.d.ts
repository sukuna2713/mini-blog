import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ChatMessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class ChatMessage {
  readonly id: string;
  readonly message: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatMessage, ChatMessageMetaData>);
  static copyOf(source: ChatMessage, mutator: (draft: MutableModel<ChatMessage, ChatMessageMetaData>) => MutableModel<ChatMessage, ChatMessageMetaData> | void): ChatMessage;
}