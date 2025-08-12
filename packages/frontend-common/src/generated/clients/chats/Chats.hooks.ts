/* eslint-disable */

import { useHttp } from '~/http';


import { createChat, discordEvents, DiscordEventsArgs, postMessage, PostMessageArgs, streamChat, StreamChatArgs } from './Chats.client';

export const createChatHook = (immediateCall: boolean = true, ) => {
  return useHttp(createChat, { immediateCall })
};
export const discordEventsHook = (immediateCall: boolean = true, initArgs?: DiscordEventsArgs) => {
  return useHttp(discordEvents, { immediateCall, initArgs })
};
export const postMessageHook = (immediateCall: boolean = true, initArgs?: PostMessageArgs) => {
  return useHttp(postMessage, { immediateCall, initArgs })
};
export const streamChatHook = (immediateCall: boolean = true, initArgs?: StreamChatArgs) => {
  return useHttp(streamChat, { immediateCall, initArgs })
};
