// Import what we need from Match class.
const { PI, abs, sqrt, pow, random, atan2 } = Math;

const HALF_PI = 0.5 * PI;
const TAU = 2 * PI;
const TO_RAD = PI / 180;
const floor = (n: number) => n | 0;
const rand = (n: number) => n * random();
const randIn = (min: number, max: number) => rand(max - min) + min;
const randRange = (n: number) => n - rand(2 * n);
const fadeIn = (t: number, m: number) => t / m;
const fadeOut = (t: number, m: number) => (m - t) / m;
const fadeInOut = (t: number, m: number) => {
  let hm = 0.5 * m;
  return abs(((t + hm) % m) - hm) / hm;
};
const dist = (x1: number, y1: number, x2: number, y2: number) =>
  sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));
const angle = (x1: number, y1: number, x2: number, y2: number) =>
  atan2(y2 - y1, x2 - x1);
const lerp = (n1: number, n2: number, speed: number) =>
  (1 - speed) * n1 + speed * n2;

export {
  HALF_PI,
  TAU,
  TO_RAD,
  floor,
  rand,
  randIn,
  randRange,
  fadeIn,
  fadeOut,
  fadeInOut,
  dist,
  angle,
  lerp,
};
