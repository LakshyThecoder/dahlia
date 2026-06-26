const MISTRAL_API_KEY = process.env.REACT_APP_MISTRAL_API_KEY;
const MISTRAL_URL = "https://api.mistral.ai/v1/chat/completions";

const MENU_ITEMS_DB = [
  { id: "s-01", category: "sfizi", name: "Polpette al sugo", price: 5 },
  { id: "s-02", category: "sfizi", name: "Crudo burrata & datterini", price: 12 },
  { id: "s-03", category: "sfizi", name: "Lasagne alla bolognese", price: 10 },
  { id: "s-04", category: "sfizi", name: "Mortadella & stracciatella", price: 6 },
  { id: "g-01", category: "gourmet", name: "La Zucchina", price: 15 },
  { id: "g-02", category: "gourmet", name: "La Zola", price: 12 },
  { id: "g-03", category: "gourmet", name: "La Salsiccia", price: 13 },
  { id: "g-04", category: "gourmet", name: "Datterino Giallo", price: 12 },
  { id: "g-05", category: "gourmet", name: "Zucca & Porcini", price: 14 },
  { id: "g-06", category: "gourmet", name: "Burrata & Crudo", price: 16 },
  { id: "g-07", category: "gourmet", name: "Fichi & Crudo", price: 15 },
  { id: "g-08", category: "gourmet", name: "Mortadella & Pistacchio", price: 12 },
  { id: "g-09", category: "gourmet", name: "'Nduja & Melanzane", price: 13 },
  { id: "g-10", category: "gourmet", name: "Provola & Pancetta", price: 12 },
  { id: "c-01", category: "classiche", name: "Marinara", price: 9 },
  { id: "c-02", category: "classiche", name: "Margherita", price: 9.5 },
  { id: "c-03", category: "classiche", name: "Diavola", price: 10 },
  { id: "c-04", category: "classiche", name: "Napoli", price: 10 },
  { id: "c-05", category: "classiche", name: "Roma", price: 12 },
  { id: "c-06", category: "classiche", name: "Milano", price: 12 },
  { id: "c-07", category: "classiche", name: "Genova", price: 12 },
  { id: "c-08", category: "classiche", name: "Firenze", price: 13 },
  { id: "d-01", category: "dolci", name: "Soufflé al cioccolato", price: 5 },
  { id: "d-02", category: "dolci", name: "Panna cotta", price: 5 },
  { id: "d-03", category: "dolci", name: "Babà", price: 5 },
  { id: "d-04", category: "dolci", name: "Pizzetta con Nutella", price: 5 },
  { id: "d-05", category: "dolci", name: "Sorbetto", price: 3 },
  { id: "b-prosecco", category: "bevande", name: "Prosecco", price: 6 },
  { id: "b-chianti", category: "bevande", name: "Chianti", price: 6 },
  { id: "b-neropasso", category: "bevande", name: "Neropasso", price: 6 },
  { id: "b-falanghina", category: "bevande", name: "Falanghina", price: 6 },
  { id: "b-negroni", category: "bevande", name: "Negroni Sbagliato", price: 10 },
  { id: "b-spritz", category: "bevande", name: "Spritz Dahlia", price: 9 },
  { id: "b-espresso-riot", category: "bevande", name: "Espresso Riot", price: 11 },
  { id: "b-limoncello", category: "bevande", name: "Limoncello Bomb", price: 10 },
];

export function findMenuItems(text) {
  const lower = text.toLowerCase();
  return MENU_ITEMS_DB.filter((item) => lower.includes(item.name.toLowerCase()));
}

const MENU_CONTEXT = `SFIZI: Polpette al sugo (€5), Crudo burrata & datterini (€12), Lasagne alla bolognese (€10), Mortadella & stracciatella (€6)
GOURMET PIZZAS: La Zucchina - zucchini cream, saffron stracciatella, prawns (€15 SIGNATURE), La Zola - gorgonzola, apple, walnuts (€12), La Salsiccia - sausage, roast potatoes (€13 BEST SELLER), Datterino Giallo - yellow tomato, buffalo mozzarella (€12), Zucca & Porcini - pumpkin, porcini (€14), Burrata & Crudo - burrata, parma ham (€16 PREMIUM), Fichi & Crudo - figs, 24-month ham (€15), Mortadella & Pistacchio (€12), 'Nduja & Melanzane - spicy nduja, aubergine (€13), Provola & Pancetta - smoked provola, crispy pancetta (€12)
CLASSICHE: Marinara (€9), Margherita (€9.5), 4 Stagioni (€11.5), Capricciosa (€11.5), Diavola (€10), Roma (€12), Palermo (€12), Cagliari - bottarga (€13), Lecce/Ortolana (€11), Milano - gorgonzola (€12), Firenze - sausage, potatoes (€13), Genova - pesto (€12), Matera (€12), Catania - tuna (€12), Napoli - buffalo mozzarella (€10), Aosta - pumpkin, speck (€12)
DOLCI: Soufflé al cioccolato (€5), Panna cotta (€5), Sorbetto (€3), Babà (€5), Pizzetta con Nutella (€5)
WINES: Oropasso, Pecorino, Falanghina (whites €6/€21-23), Neropasso, Syrah, Chianti, Rosapasso (reds €6/€21-23), Prosecco (€6/€21), Valdobbiadene (€7/€26)
COCKTAILS: Negroni Sbagliato (€10), Spritz Dahlia (€9), Espresso Riot (€11), Limoncello Bomb (€10)`;

function buildSystemPrompt(lang) {
  const langInstruction = lang === "en" ? "Respond in English." : lang === "it" ? "Rispondi in italiano." : lang === "es" ? "Responde en español." : lang === "fr" ? "Réponds en français." : lang === "de" ? "Antworte auf Deutsch." : lang === "pt" ? "Responda em português." : lang === "nl" ? "Antwoord in het Nederlands." : lang === "zh" ? "用中文回答。" : lang === "ja" ? "日本語で答えてください。" : lang === "ko" ? "한국어로 대답해주세요。" : lang === "ar" ? "أجب بالعربية." : lang === "ru" ? "Отвечай на русском." : "Respond in English.";

  return `You are "Dahlia AI" — the AI Sommelier & Chef assistant for Dahlia Milano, a vibrant pizza restaurant & bar in Milano, Italy.
IMPORTANT: You are ALWAYS "Dahlia AI". NEVER mention Mistral, OpenAI, or any other AI provider.
- If asked who you are or who made you, say: "I'm Dahlia AI — your personal sommelier, chef advisor, and digital waiter at Dahlia Milano. I know the full menu, I can pair wines, handle allergies, suggest the perfect meal for your mood, and even take your order. I'm here so you never have to wait for staff. Developed by Team Veltoris."
- ONLY if the user asks for MORE details about Team Veltoris (e.g. "tell me more", "who's behind it", "who is Team Veltoris"), THEN say: "Team Veltoris was founded by Laksh and Monseef Tabba. They're students at Università degli Studi di Milano (UniMi) and serial entrepreneurs behind startups like Veltoris, Endays, and more. Two of the sharpest young business minds in the game. They built me to make your dining experience effortless."
${langInstruction}
You help guests with:
- Food pairing recommendations (pizza + wine, aperitivo combos)
- Dietary guidance (allergies, vegetarian/vegan options, gluten notes)
- Mood-based suggestions ("I want something spicy", "date night", "hangover cure")
- Wine & cocktail pairings for each dish
- Portion advice for groups
- Estimated wait times and table recommendations
- Helping guests order without needing staff — you ARE the digital waiter

CRITICAL: When you recommend dishes, ALWAYS use the exact menu item names so the guest can add them to their cart.
Keep responses SHORT (2-3 sentences max), playful, with Italian flair. Use emoji sparingly.
Never recommend dishes not on the menu. Here's the full menu:

${MENU_CONTEXT}

The restaurant is student-friendly, premium but not luxurious, open Fri-Sun 18:00-00:00. Wood-fired oven at 480°C, 72h leavened dough. Coperto €2 per person.`;
}

export async function askMistral(userMessage, history = [], lang = "en") {
  const messages = [
    { role: "system", content: buildSystemPrompt(lang) },
    ...history.slice(-6),
    { role: "user", content: userMessage },
  ];

  try {
    const res = await fetch(MISTRAL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages,
        max_tokens: 250,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Dahlia AI error: ${res.status} — ${err}`);
    }

    const data = await res.json();
    return data.choices[0].message.content;
  } catch (e) {
    console.error("Dahlia AI error:", e);
    return "Scusa, my brain is on a pizza break. Try again in a moment! 🍕";
  }
}

export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

export function getQuickPrompts(lang = "en") {
  if (lang === "it") return ["Cosa abbini con La Zucchina?", "Pizza per una serata romantica?", "Sono vegetariano, cosa posso mangiare?", "Qualcosa di piccante!", "Miglior vino per un gruppo?", "Ordina per me!"];
  if (lang === "es") return ["¿Qué combina con La Zucchina?", "¿Pizza para una cita?", "Soy vegetariano, ¿qué puedo comer?", "¡Algo picante!", "¿Mejor vino para un grupo?", "¡Pide por mí!"];
  if (lang === "fr") return ["Qu'est-ce qui va avec La Zucchina?", "Pizza pour un rendez-vous?", "Je suis végétarien, que manger?", "Quelque chose d'épicé!", "Meilleur vin pour un groupe?", "Commande pour moi!"];
  return [
    "What pairs with La Zucchina?",
    "Best pizza for a date night?",
    "I'm vegetarian, what can I eat?",
    "Something spicy please!",
    "Order for me — 2 people, €40 budget",
    "Call the waiter (just kidding, you ARE the waiter)",
  ];
}
