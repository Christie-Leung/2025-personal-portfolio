import { ChatId } from "@2025-personal-portfolio/common/dist/ids";
import { Injectable, Service } from "@tsed/di";
import type { Response } from "express";
import { StreamEvent } from "~/generated/models/StreamEvent";


@Service()
export class ChatSseService {
  private clients: Map<ChatId, Set<Response>> = new Map();

  addClient(chatId: ChatId, res: Response) {
    if (!this.clients.has(chatId)) this.clients.set(chatId, new Set());
    this.clients.get(chatId)!.add(res);
  }

  removeClient(chatId: ChatId, res: Response) {
    const set = this.clients.get(chatId);
    if (!set) return;
    set.delete(res);
    if (!set.size) this.clients.delete(chatId);
  }

  push(chatId: ChatId, event: StreamEvent) {
    const set = this.clients.get(chatId);
    if (!set) return;
    const data = `data: ${JSON.stringify(event)}\n\n`;
    for (const res of set) {
      try {
        res.write(data);
      } catch {}
    }
  }
}
