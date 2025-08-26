const catgif = [
  "https://c.tenor.com/CNI1fSM1XSoAAAAd/tenor.gif",
  "https://i.pinimg.com/originals/55/27/8a/55278ad88b28a94773f88a72e78cc05d.gif",
  "https://media.tenor.com/owsPz6f26FcAAAAM/happy-cat-silly-cat.gif",
  "https://media.tenor.com/I6j5DmlTTk0AAAAM/stare.gif",
  "https://media.tenor.com/BiEdW2zVchkAAAAM/cat.gif",
  "https://i.pinimg.com/originals/98/70/bb/9870bb35ba3e9c8edc023d94e039217c.gif",
  "https://media.tenor.com/4aCkAvBWvxIAAAAM/cat.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyOWtmaThoNTJscGVnemgyd3VzY2M4M2tvNmtsMGxxZGpmc3VoaXNocyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1OrIIOIcRTDaNidc5p/giphy.gif",
  "https://i.pinimg.com/originals/1f/a2/2b/1fa22befc10e3cbacd58c5b407a97997.gif",
  "https://i.pinimg.com/originals/23/51/bc/2351bc65b2b5d75cef146b7edddf805b.gif"

]

export type RandCatGif =
  (typeof catgif)[number];

export function getRandCatGif(
  rng: () => number = Math.random
): RandCatGif {
  const i = Math.floor(rng() * catgif.length);
  return catgif[i];
}