// localStorage-based sessions manager (no external deps)
const STORAGE_KEY = 'geotourai_sessions_v1';

function generateId() {
  return 'id-' + Math.random().toString(36).slice(2, 10) + '-' + Date.now().toString(36);
}

function nowISO() {
  return new Date().toISOString();
}

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read sessions from localStorage', e);
    return [];
  }
}

function writeAll(sessions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.error('Failed to write sessions to localStorage', e);
  }
}

export function getSessions() {
  return readAll().sort((a, b) => (b.updated_at || b.created_at).localeCompare(a.updated_at || a.created_at));
}

export function getSession(id) {
  return readAll().find((s) => s.id === id) || null;
}

export function createSession(opts = {}) {
  const id = opts.id || generateId();
  const session = {
    id,
    title: opts.title || 'استكشاف جديد',
    created_at: nowISO(),
    updated_at: nowISO(),
    messages: opts.messages || []
  };
  const all = readAll();
  all.unshift(session);
  writeAll(all);
  return session;
}

export function updateSession(session) {
  const all = readAll();
  const idx = all.findIndex((s) => s.id === session.id);
  session.updated_at = nowISO();
  if (idx === -1) {
    all.unshift(session);
  } else {
    all[idx] = session;
  }
  writeAll(all);
  return session;
}

export function deleteSession(id) {
  const all = readAll();
  const newAll = all.filter((s) => s.id !== id);
  writeAll(newAll);
  return true;
}

// Helper to append messages and persist
export function appendMessages(sessionId, messages) {
  const all = readAll();
  const idx = all.findIndex((s) => s.id === sessionId);
  if (idx === -1) return null;
  all[idx].messages = [...(all[idx].messages || []), ...messages];
  all[idx].updated_at = nowISO();
  writeAll(all);
  return all[idx];
}
