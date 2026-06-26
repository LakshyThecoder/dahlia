// Real Dahlia menu data — kept in one place for easy editing.
export const MENU = {
  sfizi: {
    id: "sfizi",
    label: "Gli Sfizi",
    sub: "Small things, big intentions.",
    items: [
      { n: "01", name: "Polpette al sugo", sub: "3 pz · house tomato sauce", price: "5" },
      { n: "02", name: "Crudo, burrata & datterini", sub: "Prosciutto crudo · burratina pugliese · datterini · basilico", price: "12" },
      { n: "03", name: "Lasagne alla bolognese", sub: "Slow-cooked ragù · béchamel · the obvious choice", price: "10" },
      { n: "04", name: "Mortadella & stracciatella", sub: "Mortadella IGP · stracciatella pugliese", price: "6" },
    ],
  },
  gourmet: {
    id: "gourmet",
    label: "Gourmet",
    sub: "Long-leavened. Wood-fired. Properly Italian.",
    items: [
      { n: "01", name: "La Zucchina", sub: "Crema di zucchine · stracciatella allo zafferano · gamberetti saltati · erba cipollina · olio EVO", price: "15", tag: "Signature" },
      { n: "02", name: "La Zola", sub: "Zola · fior di latte · mela · grana · noci · basilico · olio EVO", price: "12" },
      { n: "03", name: "La Salsiccia", sub: "S. Marzano DOP · fior di latte · patate al forno · salsiccia · rosmarino · basilico · olio EVO", price: "13", tag: "Best seller" },
      { n: "04", name: "Datterino Giallo", sub: "Datterino giallo · bufala · fior di latte · olive taggiasche · capperi · peperoncino · basilico", price: "12" },
      { n: "05", name: "Zucca & Porcini", sub: "Crema di zucca mantovana · bufala · porcini · basilico · olio EVO", price: "14" },
      { n: "06", name: "Burrata & Crudo", sub: "S. Marzano DOP · pomodorini confit · burrata pugliese · crudo di Parma · basilico", price: "16", tag: "Premium" },
      { n: "07", name: "Fichi & Crudo 24 mesi", sub: "Fior di latte · crudo di Parma 24 mesi · confettura di fichi · glassa balsamica · olio EVO", price: "15" },
      { n: "08", name: "Mortadella & Pistacchio", sub: "Datterino giallo · fior di latte · mortadella · crema di pistacchio · basilico", price: "12" },
      { n: "09", name: "'Nduja & Melanzane", sub: "S. Marzano · fior di latte · melanzane al forno · 'nduja · provola affumicata · cialda di grana · basilico", price: "13" },
      { n: "10", name: "Provola & Pancetta", sub: "Provola affumicata · patate al forno · pancetta croccante · pecorino sardo DOP · pepe · basilico", price: "12" },
    ],
  },
  classiche: {
    id: "classiche",
    label: "Le Classiche",
    sub: "The eternals. Don't fix what isn't broken.",
    items: [
      { n: "—", name: "Marinara", sub: "S. Marzano DOP · aglio · origano · acciughe", price: "9" },
      { n: "—", name: "Margherita", sub: "S. Marzano DOP · fior di latte", price: "9.5" },
      { n: "—", name: "4 Stagioni", sub: "S. Marzano DOP · fior di latte · cotto · funghi · carciofi · olive", price: "11.5" },
      { n: "—", name: "Capricciosa", sub: "S. Marzano DOP · fior di latte · cotto · funghi · carciofi · olive · acciughe · origano", price: "11.5" },
      { n: "—", name: "Diavola", sub: "S. Marzano DOP · fior di latte · salame piccante · olive", price: "10" },
      { n: "—", name: "Roma", sub: "S. Marzano DOP · fior di latte · olive · acciughe · capperi · origano", price: "12" },
      { n: "—", name: "Palermo", sub: "S. Marzano DOP · olive · acciughe · capperi · origano", price: "12" },
      { n: "—", name: "Cagliari", sub: "S. Marzano DOP · fior di latte · carciofi · bottarga di Cabras", price: "13" },
      { n: "—", name: "Lecce (Ortolana)", sub: "S. Marzano DOP · fior di latte · verdure miste", price: "11" },
      { n: "—", name: "Milano", sub: "S. Marzano DOP · fior di latte · gorgonzola", price: "12" },
      { n: "—", name: "Firenze", sub: "S. Marzano DOP · fior di latte · salsiccia · patate arrosto · cipolla viola", price: "13" },
      { n: "—", name: "Genova", sub: "Pesto · fior di latte · salsiccia · funghi · caciocavallo", price: "12" },
      { n: "—", name: "Matera", sub: "Fior di latte · pomodorini · caciocavallo · acciughe · origano", price: "12" },
      { n: "—", name: "Catania", sub: "S. Marzano DOP · fior di latte · cipolla · tonno", price: "12" },
      { n: "—", name: "Napoli", sub: "Bufala · pomodorini · olive · rucola", price: "10" },
      { n: "—", name: "Aosta", sub: "Crema di zucca · fior di latte · speck · funghi", price: "12" },
    ],
  },
  dolci: {
    id: "dolci",
    label: "Dolci",
    sub: "Endings worth lingering for.",
    items: [
      { n: "01", name: "Soufflé al cioccolato", sub: "Warm chocolate · panna fresca", price: "5" },
      { n: "02", name: "Panna cotta", sub: "Cream · vanilla bean · today's coulis", price: "5" },
      { n: "03", name: "Sorbetto", sub: "Ask the room what's in the freezer", price: "3" },
      { n: "04", name: "Babà", sub: "Rum-soaked · classic Napoletano", price: "5" },
      { n: "05", name: "Pizzetta con Nutella", sub: "Wood-fired dough · Nutella · regret optional", price: "5" },
    ],
  },
  bevande: {
    id: "bevande",
    label: "Bevande",
    sub: "Glass or bottle. Choose your level of commitment.",
    groups: [
      {
        head: "Bianchi", cols: ["Calice", "Bottiglia"], items: [
          ["Oropasso", "6", "23"],
          ["Pecorino", "6", "21"],
          ["Falanghina", "6", "23"],
        ],
      },
      {
        head: "Rossi", cols: ["Calice", "Bottiglia"], items: [
          ["Neropasso", "6", "23"],
          ["Syrah", "6", "21"],
          ["Chianti", "6", "23"],
          ["Rosapasso", "6", "23"],
        ],
      },
      {
        head: "Bollicine", cols: ["Calice", "Bottiglia"], items: [
          ["Prosecco", "6", "21"],
          ["Valdobbiadene", "7", "26"],
        ],
      },
      {
        head: "Vino della Casa", cols: ["½ L", "1 L"], items: [
          ["Rosso · stagionale", "12", "20"],
          ["Bianco · stagionale", "12", "20"],
        ],
      },
      {
        head: "Birre", cols: ["Bottiglia", ""], items: [
          ["Nastro Azzurro", "5", ""],
          ["Weiss", "5", ""],
          ["S. Benoit", "6", ""],
          ["Peroni Doppio Malto", "5", ""],
        ],
      },
    ],
  },
  caffetteria: {
    id: "caffetteria",
    label: "Caffetteria",
    sub: "Espresso country, baby.",
    items: [
      { n: "—", name: "Caffè", sub: "Single-origin · 18g · 36ml", price: "2" },
      { n: "—", name: "Caffè Dek", sub: "All the ritual, none of the buzz", price: "2.5" },
      { n: "—", name: "Caffè Corretto", sub: "Caffè + grappa or sambuca", price: "3" },
      { n: "—", name: "Cappuccino", sub: "Honestly, only before noon", price: "3" },
      { n: "—", name: "Succhi", sub: "Ask for today's selection", price: "3.5" },
      { n: "—", name: "Bibite", sub: "Coca, aranciata, lemon, tonica", price: "3.5" },
      { n: "—", name: "Acqua Naturale", sub: "750 ml", price: "2" },
      { n: "—", name: "Acqua Gas", sub: "750 ml", price: "2" },
    ],
    after: {
      head: "Liquori",
      items: [
        ["Amaro", "5"], ["Limoncello", "5"], ["Mirto", "5"], ["Meloncello", "5"],
      ],
    },
  },
};
