export const serviceUnavailableMessages = [
  // Dev / infra vibes
  "Christie is in a duel with different backend hosting services right now. Once peace is negotiated, this feature will be live.",
  "Christie is teaching her SSE stream to behave. Reconnect soon!",
  "Christie is deciding between clouds and containers. The endpoint will land shortly.",
  "Christie is wiring the deploy pipeline and bribing it with unit tests. Try again in a bit.",
  "Christie is upgrading the server from 'it works on my machine' to 'it works everywhere.' Hold tight.",
  "Christie is chasing a race condition with matcha and optimism. Please check back later.",
  "Christie is rearranging her services like LEGO—one more brick and this goes live.",
  "Christie is negotiating with environment variables. Once they confess, this will work.",
  
  // Wizarding/Minecraft flavor
  "Christie is enchanting the backend—Unbreaking III for uptime. Feature unlocks soon.",
  "Christie's wand is recharging after a particularly spicy deploy spell. Try again shortly.",
  "Christie is brewing a fresh backend potion. Needs a few more stirs clockwise.",
  "Christie is mining for the perfect host and smelting a shiny new server.",
  "Christie whispered 'Accio stream!'—the owls are still in transit. Check back later.",

  // Anime / playful
  "Christie called a brief filler episode while the backend powers up. New arc soon™.",
  "Training montage in progress: Christie is leveling up the deploy. Please try again soon.",
  "Cliffhanger! Next episode: 'The Day the Endpoint Went Live.'",

  // Foodie / black sesame energy
  "Christie stepped out for black sesame ice cream fuel; deploy resumes after the last bite.",
  "Christie is meal-prepping her APIs—protein-packed endpoints coming soon.",
  "Christie is roasting bugs to a toasty golden brown. Feature will be delicious shortly.",

  // Upcycling / design-y
  "Christie is upcycling backend pieces into a clean, low-waste deploy. Finishing the seams.",
  "Christie is tailoring the API fit—snipping loose threads before release.",

  // Gentle & friendly
  "Christie is polishing the last mile of setup. Thanks for your patience—check back soon.",
  "Christie is almost done connecting this feature to its forever home. Try again soon.",
  "Christie is aligning the stars (and the servers). It won't be long now.",
  "Christie is giving the servers a pep talk. They'll be ready shortly.",

  // Your original tone, kept for variety
  "Christie is still deciding how to host her backend to allow this feature. Please check back later.",
  "This feature is waiting on deployment — Christie's finalizing hosting. Check back later.",
  "The backend for this feature isn't live yet. Christie's on it — please check back later.",
  "Temporarily unavailable while Christie prepares the backend.",
  "Setup in progress: Christie is connecting the API for this feature.",
] as const;

export type ServiceUnavailableMessage =
  (typeof serviceUnavailableMessages)[number];

export function getRandServiceUnavailMsg(
  rng: () => number = Math.random
): ServiceUnavailableMessage {
  const i = Math.floor(rng() * serviceUnavailableMessages.length);
  return serviceUnavailableMessages[i];
}