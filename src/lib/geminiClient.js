import { GoogleGenAI } from '@google/genai';
import { LOCATIONS, SYSTEM_PROMPT } from './localData';

/**
 * GEOTOUR AI - Gemini API Client (v3)
 * Migrated to the new @google/genai SDK (v2).
 * Fixed 404 and Stream consumption issues.
 */

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || null;
// Use a stable, valid model name
const MODEL_NAME = 'gemini-2.5-flash';

// Check if the API key is configured (not a placeholder)
const isValidKey = API_KEY &&
  API_KEY !== 'YOUR_API_KEY' &&
  !API_KEY.includes('Placeholder');

let ai = null;
if (isValidKey) {
  try {
    // Force v1 to avoid 404s common in v1beta with certain models
    ai = new GoogleGenAI({
      apiKey: API_KEY
    });
  } catch (e) {
    console.error('Error initializing GoogleGenAI:', e);
  }
}

// Map to store active chat objects for stateful history management
const activeChatSessions = {};

/**
 * Returns true if the Gemini API is correctly configured.
 */
export const isGeminiAvailable = () => !!ai;

/**
 * Helper to extract location objects from text containing [LOCATION:id] tags.
 */
function extractLocationsFromText(text) {
  if (!text) return [];
  const found = [];
  for (const loc of LOCATIONS) {
    if (text.includes(`[LOCATION:${loc.id}]`) || text.includes(loc.name_ar) || text.includes(loc.name)) {
      found.push(loc);
    }
  }
  return found;
}

/**
 * Clears [LOCATION:id] tags from text for cleaner UI display.
 */
function cleanLocationTags(text) {
  if (!text) return '';
  return text.replace(/\[LOCATION:[^\]]+\]/g, '').trim();
}

/**
 * Official Safety Configuration for @google/genai
 */
const safetySettings = [
  { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
  { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
  { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
  { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
];

/**
 * Initializes or retrieves a chat session for a given sessionId.
 */
async function getChatSession(sessionId) {
  if (!ai) return null;

  if (!activeChatSessions[sessionId]) {
    activeChatSessions[sessionId] = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        safetySettings,
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 2048,
      },
      history: [],
    });
  }
  return activeChatSessions[sessionId];
}

/**
 * Plans a geological trip based on interests and duration.
 */
export async function planTrip({ interests = [], duration_hours = 6, difficulty = 'سهل' }) {
  if (ai) {
    try {
      const prompt = `أنت مخطط رحلات جيولوجية خبير في الكويت. قدم خطة رحلة جيولوجية مفصلة:
- المدة: ${duration_hours} ساعات
- الصعوبة: ${difficulty}
- الاهتمامات: ${interests.join(', ')}
- المواقع المتاحة: ${LOCATIONS.map(l => l.name_ar).join(', ')}`;

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        config: { systemInstruction: SYSTEM_PROMPT },
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      });

      const planText = response.text; // Property in v2

      return { plan: planText, locations: LOCATIONS.slice(0, 3), duration_hours, is_fallback: false };
    } catch (e) {
      console.error('Gemini planTrip Error (@google/genai):', e);
    }
  }

  // Local Fallback
  return {
    plan: `خطة رحلة جيولوجية (نسخة محلية): مدة ${duration_hours} ساعات - مستوى ${difficulty}`,
    locations: LOCATIONS.slice(0, 2),
    duration_hours,
    is_fallback: true
  };
}

/**
 * Sends a message to Gemini and handles multi-modal input.
 */
export async function sendMessage({ session_id, content, image_url = null }) {
  if (ai) {
    try {
      const chat = await getChatSession(session_id);

      let response;
      if (image_url) {
        const base64Data = image_url.split(',')[1];
        const mimeType = image_url.match(/:(.*?);/)?.[1] || 'image/jpeg';

        response = await chat.sendMessage({
          message: [
            { text: content },
            { inlineData: { data: base64Data, mimeType } }
          ]
        });
      } else {
        response = await chat.sendMessage({ message: content });
      }

      const text = response.text; // Property in v2
      const locations = extractLocationsFromText(text);
      const cleanedText = cleanLocationTags(text);

      return {
        user_message: { id: `u-${Date.now()}`, role: 'user', content, timestamp: new Date(), image_url },
        assistant_message: {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: cleanedText,
          timestamp: new Date(),
          locations: locations.length ? locations : undefined,
          is_fallback: false
        }
      };
    } catch (e) {
      console.error('Gemini SDK Error (@google/genai):', e);
    }
  }

  // Deterministic local fallback
  const foundLocs = extractLocationsFromText(content);
  return {
    user_message: { id: `u-${Date.now()}`, role: 'user', content, timestamp: new Date(), image_url },
    assistant_message: {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: `شكرًا لسؤالك (الوضع المحلي). سؤالك كان: ${content}`,
      timestamp: new Date(),
      locations: foundLocs.length ? foundLocs : undefined,
      is_fallback: true
    }
  };
}

const geminiClient = {
  planTrip,
  sendMessage,
  isGeminiAvailable
};

export default geminiClient;
