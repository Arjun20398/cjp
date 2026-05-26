/**
 * Telegram Bot for CJI Mirror Distribution
 *
 * Setup:
 * 1. Create a bot via @BotFather on Telegram
 * 2. Set BOT_TOKEN environment variable
 * 3. Run: BOT_TOKEN=your_token node scripts/telegram-bot.mjs
 *
 * Commands:
 * /start  - Welcome message with mirror links
 * /mirror - Get latest working mirror URLs
 * /about  - About Cheap Justice of India
 */

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  console.error("Missing BOT_TOKEN environment variable");
  process.exit(1);
}

const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const MIRRORS = [
  { name: "Primary", url: "https://cheapjusticeofindia.com" },
  { name: "GitHub Pages", url: "https://arjun20398.github.io/cjp" },
];

const WELCOME = `⚖️ *Cheap Justice of India*
_They judge you. We judge them._

Real facts about India's judiciary — corruption, loopholes, flawed judgments, and conflicts of interest — delivered with satirical honesty.

Use /mirror to get working links if the main site is blocked.
Use /about to learn more.

🔗 ${MIRRORS[0].url}`;

const MIRROR_MSG = `🔗 *Working Mirror Links*

${MIRRORS.map((m, i) => `${i + 1}. *${m.name}*: ${m.url}`).join("\n")}

If all links are blocked, share this bot with others: @CheapJusticeBot

_Last updated: ${new Date().toISOString().split("T")[0]}_`;

const ABOUT_MSG = `ℹ️ *About Cheap Justice of India*

A satirical platform exposing the rot in India's judiciary through humor, facts, and fearless commentary.

📊 4.9 crore pending cases
📝 8,600+ complaints in 10 years
🚪 Judges turning politicians

All facts are sourced from publicly available records, court documents, and credible news reports.

Protected under Article 19(1)(a) of the Indian Constitution.

🔗 GitHub: https://github.com/Arjun20398/cjp`;

let offset = 0;

async function getUpdates() {
  try {
    const res = await fetch(`${API}/getUpdates?offset=${offset}&timeout=30`);
    const data = await res.json();
    if (!data.ok) return;
    for (const update of data.result) {
      offset = update.update_id + 1;
      if (update.message?.text) {
        await handleMessage(update.message);
      }
    }
  } catch (err) {
    console.error("Poll error:", err.message);
  }
}

async function handleMessage(msg) {
  const chatId = msg.chat.id;
  const text = msg.text.trim().toLowerCase();

  let reply = "";
  switch (text) {
    case "/start":
      reply = WELCOME;
      break;
    case "/mirror":
    case "/mirrors":
      reply = MIRROR_MSG;
      break;
    case "/about":
      reply = ABOUT_MSG;
      break;
    default:
      reply = `⚖️ Use /mirror to get working links or /about to learn more.`;
  }

  await fetch(`${API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: reply,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    }),
  });
}

console.log("🤖 CJI Telegram Bot running...");
setInterval(getUpdates, 1000);
