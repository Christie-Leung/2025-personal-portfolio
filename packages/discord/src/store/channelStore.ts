import fs from "fs";
import path from "path";
import { ChannelType, Client, PermissionsBitField, TextChannel } from "discord.js";

type StoreShape = { [guildId: string]: string }; // guildId -> channelId

const DATA_DIR = process.env.STORE_DIR || path.resolve(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "channelStore.json");

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({}), "utf-8");
}

export function loadStore(): StoreShape {
  try {
    ensureFile();
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    return {};
  }
}

export function saveStore(store: StoreShape) {
  ensureFile();
  fs.writeFileSync(FILE, JSON.stringify(store, null, 2), "utf-8");
}

let cache: StoreShape | null = null;
function getCache() {
  if (!cache) cache = loadStore();
  return cache!;
}

export function setChannelForGuild(guildId: string, channelId: string) {
  const s = getCache();
  s[guildId] = channelId;
  saveStore(s);
}

export function getChannelForGuild(guildId: string) {
  const s = getCache();
  return s[guildId];
}

/**
 * Choose a sensible default TextChannel across all guilds when none is set.
 * Priority: stored channels → a #general channel the bot can send in → any sendable text channel.
 */
export async function pickAnyTextChannel(client: Client): Promise<TextChannel | null> {
  // 1) Any stored channel still valid
  const s = getCache();
  for (const [gid, cid] of Object.entries(s)) {
    try {
      const ch = await client.channels.fetch(cid);
      if (ch && ch.type === ChannelType.GuildText) return ch as TextChannel;
    } catch {}
  }

  // 2) Look for #general the bot can send in
  for (const guild of client.guilds.cache.values()) {
    const general = guild.channels.cache.find(
      c => c.type === ChannelType.GuildText && c.name.toLowerCase() === "general"
    );
    if (general && canSend(general as TextChannel)) return general as TextChannel;
  }

  // 3) First sendable text channel
  for (const guild of client.guilds.cache.values()) {
    const ch = guild.channels.cache.find(c => c.type === ChannelType.GuildText && canSend(c as TextChannel));
    if (ch) return ch as TextChannel;
  }
  return null;
}

function canSend(ch: TextChannel) {
  const me = ch.guild.members.me;
  if (!me) return false;
  const perms = ch.permissionsFor(me);
  if (!perms) return false;
  return perms.has(PermissionsBitField.Flags.SendMessages);
}