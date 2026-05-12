// ═══════════════════════════════════════════════════════════════
// PROBLEMA 1: random(a, b) usando únicamente random(0, 1)
// ADA M5 · UVG
// ═══════════════════════════════════════════════════════════════
//
// IDEA:
//   Para generar un entero uniforme en [a, b] necesitamos
//   representar los (b-a+1) valores posibles en binario.
//   k = ceil(log2(b-a+1)) bits alcanzan para cubrirlos.
//
//   Generamos k bits → número r en [0, 2^k - 1].
//   - Si r <= (b-a): retornamos a+r  ✓ (está en rango)
//   - Si r >  (b-a): descartamos y repetimos
//
//   El número de intentos sigue distribución Geométrica(p)
//   donde p = (b-a+1) / 2^k, por lo tanto E[intentos] = 2^k / (b-a+1).
//
// COMPLEJIDAD ESPERADA: O(k) bits por intento · E[intentos] = O(log(b-a+1))
// ═══════════════════════════════════════════════════════════════

function random01() {
  return Math.random() < 0.5 ? 0 : 1;
}

function randomAB(a, b) {
  const range = b - a + 1;
  const k = Math.ceil(Math.log2(range)); // bits necesarios

  let attempts = 0;
  while (true) {
    attempts++;
    // Construir número r en [0, 2^k - 1] bit a bit
    let r = 0;
    for (let i = 0; i < k; i++) {
      r = r * 2 + random01();
    }
    // Solo aceptamos si r está dentro del rango válido
    if (r < range) {
      return { value: a + r, attempts };
    }
    // Si no, descartamos (garantiza uniformidad)
  }
}

// ── Verificación ────────────────────────────────────────────────
const A = 1, B = 6; // Simular un dado — cambiar para probar otros rangos
const N = 50000;
const range = B - A + 1;
const k = Math.ceil(Math.log2(range));
const pSuccess = range / Math.pow(2, k);
const theoreticalExpected = 1 / pSuccess;

console.log(`\nrandom(${A}, ${B}) — ${N} muestras`);
console.log(`k = ceil(log2(${range})) = ${k} bits`);
console.log(`P(éxito) = ${range}/2^${k} = ${pSuccess.toFixed(4)}`);
console.log(`E[intentos] teórico = ${theoreticalExpected.toFixed(4)}\n`);

const counts = {};
let totalAttempts = 0;
for (let i = A; i <= B; i++) counts[i] = 0;

for (let i = 0; i < N; i++) {
  const { value, attempts } = randomAB(A, B);
  counts[value]++;
  totalAttempts += attempts;
}

console.log("Distribución (debería ser uniforme ~" + (N / range).toFixed(0) + " cada una):");
for (let i = A; i <= B; i++) {
  const bar = "█".repeat(Math.round(counts[i] / (N / range) * 10));
  console.log(`  ${i}: ${counts[i].toString().padStart(6)} ${bar}`);
}

console.log(`\nE[intentos] simulado  = ${(totalAttempts / N).toFixed(4)}`);
console.log(`E[intentos] teórico   = ${theoreticalExpected.toFixed(4)}`);
console.log(`Diferencia            = ${Math.abs(totalAttempts / N - theoreticalExpected).toFixed(4)}`);
