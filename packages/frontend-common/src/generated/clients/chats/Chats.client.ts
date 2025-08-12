/* eslint-disable */

import { http, HttpResult } from '~/http';


import { CreateChatResponse } from '../../models/CreateChatResponse';
import { DiscordEventPayload } from '../../models/DiscordEventPayload';
import { DiscordEvents200Response } from '../../models/DiscordEvents200Response';
import { PostMessageRequest } from '../../models/PostMessageRequest';
import { PostMessage200Response } from '../../models/PostMessage200Response';
import { ChatId } from '@2025-personal-portfolio/common/src/ids/ChatId';

export type CreateChatArgs = {
}

/**
 * @summary Create a new chat and its Discord thread
 */
export const createChat = (args: CreateChatArgs): Promise<HttpResult<CreateChatResponse>> => {
    const params = {};
    // @ts-ignore
    if (args?.ids) {
      // @ts-ignore
      params.keys = { ...args.ids };
    }
    // @ts-ignore
    if (args?.filters) {
      // @ts-ignore
      params.queries = { ...args.filters };
    }

    const url = http.interpolatePath('/chats', params);

    return http.post(url, {
    });
}
export type DiscordEventsArgs = {
      body: DiscordEventPayload;
}

/**
 * @summary Webhook called by the Discord service when a user posts in the thread
 * @param {DiscordEventsArgs} args
 */
export const discordEvents = (args: DiscordEventsArgs): Promise<HttpResult<DiscordEvents200Response>> => {
    const params = {};
    // @ts-ignore
    if (args?.ids) {
      // @ts-ignore
      params.keys = { ...args.ids };
    }
    // @ts-ignore
    if (args?.filters) {
      // @ts-ignore
      params.queries = { ...args.filters };
    }

    const url = http.interpolatePath('/chats/discord/events', params);

    return http.post(url, {
        body: args.body,
    });
}
export type PostMessageArgs = {
    ids: {
        chatId: ChatId;
    };
      body: PostMessageRequest;
}

/**
 * @summary Post a user message to the Discord thread via the bot
 * @param {PostMessageArgs} args
 */
export const postMessage = (args: PostMessageArgs): Promise<HttpResult<PostMessage200Response>> => {
    const params = {};
    // @ts-ignore
    if (args?.ids) {
      // @ts-ignore
      params.keys = { ...args.ids };
    }
    // @ts-ignore
    if (args?.filters) {
      // @ts-ignore
      params.queries = { ...args.filters };
    }

    const url = http.interpolatePath('/chats/{chatId}/messages', params);

    return http.post(url, {
        body: args.body,
    });
}
export type StreamChatArgs = {
    ids: {
        chatId: ChatId;
    };
}

/**
 * @summary Server-Sent Events stream of Discord replies for this chat
 * @param {StreamChatArgs} args
 */
export const streamChat = (args: StreamChatArgs): Promise<HttpResult<String>> => {
    const params = {};
    // @ts-ignore
    if (args?.ids) {
      // @ts-ignore
      params.keys = { ...args.ids };
    }
    // @ts-ignore
    if (args?.filters) {
      // @ts-ignore
      params.queries = { ...args.filters };
    }

    const url = http.interpolatePath('/chats/{chatId}/stream', params);

    return http.get(url, {
    });
}
