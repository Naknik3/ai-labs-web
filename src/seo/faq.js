/* The home page FAQ, rendered visibly by <Home> and emitted as FAQPage
   structured data by schema.js. Google requires the answer text to be
   visible on the page for the markup to be valid, so these two must stay
   the same strings - hence one module feeding both. */

export const FAQ = [
  {
    q: "What is AI-LABZ?",
    a: "AI-LABZ is an idle AI research management game. You build an island lab out of compute, power and cooling, turn that compute into research, and turn research into AI models - each with its own behaviour, rarity and appetite for power. The smarter your models get, the harder they are to contain.",
  },
  {
    q: "What platforms is AI-LABZ on?",
    a: "AI-LABZ is being built for iPhone and Android. It is a mobile game - there is no desktop or console version planned.",
  },
  {
    q: "When does AI-LABZ come out?",
    a: "It is in development and dropping soon. There is no public release date yet - join the waitlist on this page and we will email you when it is playable.",
  },
  {
    q: "Do I need an account to play?",
    a: "No. AI-LABZ has no login, no username and no password. The app generates a random device token the first time you open it, and that token is what identifies your lab.",
  },
  {
    q: "Does my lab keep running while I am away?",
    a: "Yes - it is an idle game. Your buildings keep producing and your research keeps ticking while the app is closed, so you come back to progress waiting for you. The containment problem does not pause either.",
  },
  {
    q: "What data does AI-LABZ collect?",
    a: "A random device token, your lab's game state, and basic technical diagnostics. No name, no email address and no personal profile are required to play. The full detail is in the AI-LABZ Privacy Policy.",
  },
];
