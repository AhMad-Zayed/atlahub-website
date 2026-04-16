import { promises as fs } from 'fs';
import path from 'path';

const MESSAGES_FILE_PATH = path.join(process.cwd(), 'src/data/messages.json');

async function ensureMessagesFile() {
  try {
    await fs.access(MESSAGES_FILE_PATH);
  } catch {
    await fs.writeFile(MESSAGES_FILE_PATH, '[]\n', 'utf8');
  }
}

async function readMessages() {
  await ensureMessagesFile();
  const raw = await fs.readFile(MESSAGES_FILE_PATH, 'utf8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

async function writeMessages(messages) {
  await fs.writeFile(MESSAGES_FILE_PATH, `${JSON.stringify(messages, null, 2)}\n`, 'utf8');
}

export async function getContactMessages() {
  const messages = await readMessages();
  return messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export async function saveContactMessage(payload) {
  const messages = await readMessages();
  const nextMessage = {
    id: `msg_${Date.now()}`,
    name: String(payload.name || '').trim(),
    email: String(payload.email || '').trim(),
    phone: String(payload.phone || '').trim(),
    service: String(payload.service || '').trim(),
    message: String(payload.message || '').trim(),
    created_at: new Date().toISOString(),
  };

  messages.push(nextMessage);
  await writeMessages(messages);
  return nextMessage;
}
