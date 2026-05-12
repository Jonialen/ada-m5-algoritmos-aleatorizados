// ═══════════════════════════════════════════════════════════════
// PROBLEMA 6c: Iteraciones de bogo-sort ~ Geom(1/n!)
// ADA M5 · UVG
// ═══════════════════════════════════════════════════════════════
//
// ARGUMENTO:
//   Cada iteración de bogo-sort hace un shuffle uniforme aleatorio.
//   Hay n! permutaciones posibles y solo 1 está ordenada.
//   => P(éxito en una iteración) = 1/n!
//
//   Las iteraciones son INDEPENDIENTES: el shuffle borra la memoria
//   del pasado — no importa cuántas veces fallamos antes.
//
//   Experimentos de Bernoulli independientes con P(éxito) = p = 1/n!
//   contando intentos hasta el primer éxito = definición exacta de
//   distribución Geométrica.
//
//   I ~ Geom(1/n!)  =>  E[I] = n!
// ═══════════════════════════════════════════════════════════════

function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}

// Fisher-Yates shuffle — produce permutación uniforme
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function bogoSort(arr) {
  let current = [...arr];
  let iterations = 0;
  let swaps = 0;

  while (true) {
    current = shuffle(current);
    iterations++;
    swaps += current.length - 1; // Fisher-Yates hace n-1 swaps
    if (isSorted(current)) break;
  }

  return { iterations, swaps };
}

// ── Simulación ───────────────────────────────────────────────────
function factorial(n) {
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  return f;
}

function simulate(n, trials) {
  const nFact = factorial(n);
  const arr = Array.from({ length: n }, (_, i) => i + 1);

  let totalIter = 0;
  let totalSwaps = 0;

  for (let t = 0; t < trials; t++) {
    // Barajar primero para empezar desde permutación aleatoria
    const start = shuffle(arr);
    const { iterations, swaps } = bogoSort(start);
    totalIter += iterations;
    totalSwaps += swaps;
  }

  const avgIter = totalIter / trials;
  const avgSwaps = totalSwaps / trials;

  console.log(`\nn = ${n}  (n! = ${nFact}, ${trials} ensayos)`);
  console.log(`  E[iteraciones] teórico  = ${nFact}`);
  console.log(`  E[iteraciones] simulado = ${avgIter.toFixed(2)}`);
  console.log(`  E[swaps] teórico        = ${(n - 1) * nFact}`);
  console.log(`  E[swaps] simulado       = ${avgSwaps.toFixed(2)}`);
}

console.log("Bogo-sort — verificando I ~ Geom(1/n!)");
simulate(3, 5000); // n=3: n!=6, rápido
simulate(4, 2000); // n=4: n!=24
simulate(5, 500);  // n=5: n!=120, más lento
