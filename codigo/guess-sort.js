// ═══════════════════════════════════════════════════════════════
// PROBLEMA 7a: guess-sort vs bozo-sort⁺_opt
// ADA M5 · UVG
// ═══════════════════════════════════════════════════════════════
//
// DIFERENCIA CLAVE:
//
//   bozo-sort⁺_opt: elige dos índices i,j al azar.
//     Si es un "par malo" (i<j y A[i]>A[j]) → intercambia.
//     Si es un "par bueno" → PASO DESPERDICIADO, no avanza.
//
//   guess-sort: sigue eligiendo pares al azar hasta encontrar
//     uno malo, ENTONCES intercambia.
//     => Cada swap es garantizadamente útil (reduce inversiones en 1).
//     => swaps/pasos ≈ 1 siempre.
//
// RESULTADO: guess-sort garantiza que cada swap sea útil:
// intercambia únicamente pares invertidos. Un swap puede eliminar
// una o varias inversiones, pero nunca se hace sobre un par bueno.
// bozo-sort⁺_opt necesita más "pasos" para el mismo resultado
// porque desperdicia pasos en pares buenos.
// ═══════════════════════════════════════════════════════════════

function countInversions(arr) {
  let inv = 0;
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] > arr[j]) inv++;
  return inv;
}

function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++)
    if (arr[i] > arr[i + 1]) return false;
  return true;
}

function randInt(n) {
  return Math.floor(Math.random() * n);
}

// bozo-sort⁺_opt: en cada paso elige par al azar, solo intercambia si es malo
function bozoSortOptStep(arr) {
  let steps = 0, swaps = 0;
  const a = [...arr];

  while (!isSorted(a)) {
    // Elegir dos índices distintos al azar
    let i = randInt(a.length);
    let j = randInt(a.length);
    if (i === j) { steps++; continue; }
    if (i > j) [i, j] = [j, i];

    steps++;
    if (a[i] > a[j]) {
      [a[i], a[j]] = [a[j], a[i]];
      swaps++;
    }
    // Si no es par malo → paso desperdiciado
  }

  return { sorted: a, steps, swaps };
}

// guess-sort: busca par malo hasta encontrarlo, ENTONCES intercambia
function guessSortStep(arr) {
  let comparisons = 0, swaps = 0;
  const a = [...arr];

  while (!isSorted(a)) {
    // Buscar un par malo (repetir hasta encontrar uno)
    let i, j;
    do {
      i = randInt(a.length);
      j = randInt(a.length);
      comparisons++;
    } while (i === j || i > j || a[i] <= a[j]);
    // Par malo encontrado → intercambiar (nunca se desperdicia)
    [a[i], a[j]] = [a[j], a[i]];
    swaps++;
  }

  return { sorted: a, comparisons, swaps };
}

// ── Experimento comparativo ─────────────────────────────────────
function runExperiment(arr, label) {
  const inversions = countInversions(arr);
  console.log(`\nArreglo: [${arr}]  (${inversions} inversiones)`);

  // bozo-sort⁺_opt
  const bozo = bozoSortOptStep(arr);
  console.log(`  bozo-sort⁺_opt:`);
  console.log(`    pasos totales   = ${bozo.steps}`);
  console.log(`    swaps útiles    = ${bozo.swaps}`);
  console.log(`    pasos perdidos  = ${bozo.steps - bozo.swaps}`);
  console.log(`    eficiencia      = ${(bozo.swaps / bozo.steps * 100).toFixed(1)}%`);

  // guess-sort
  const guess = guessSortStep(arr);
  console.log(`  guess-sort:`);
  console.log(`    comparaciones   = ${guess.comparisons}`);
  console.log(`    swaps           = ${guess.swaps}`);
  console.log(`    swaps/comp      = ${(guess.swaps / guess.comparisons * 100).toFixed(1)}%`);
  console.log(`    swaps útiles    = ${guess.swaps} (todos sobre pares malos)`);
}

// ── Simulación estadística ───────────────────────────────────────
function simulateMany(n, trials) {
  let totalBozoSteps = 0, totalBozoSwaps = 0;
  let totalGuessComps = 0, totalGuessSwaps = 0;

  for (let t = 0; t < trials; t++) {
    // Generar permutación aleatoria
    const arr = Array.from({ length: n }, (_, i) => i + 1)
      .sort(() => Math.random() - 0.5);

    const bozo = bozoSortOptStep(arr);
    const guess = guessSortStep(arr);

    totalBozoSteps += bozo.steps;
    totalBozoSwaps += bozo.swaps;
    totalGuessComps += guess.comparisons;
    totalGuessSwaps += guess.swaps;
  }

  const maxInv = n * (n - 1) / 2;
  console.log(`\n─── Simulación n=${n}, ${trials} ensayos ───`);
  console.log(`  bozo-sort⁺_opt — pasos promedio : ${(totalBozoSteps / trials).toFixed(1)}`);
  console.log(`  bozo-sort⁺_opt — swaps promedio : ${(totalBozoSwaps / trials).toFixed(1)}`);
  console.log(`  guess-sort     — comps promedio  : ${(totalGuessComps / trials).toFixed(1)}`);
  console.log(`  guess-sort     — swaps promedio  : ${(totalGuessSwaps / trials).toFixed(1)}`);
  console.log(`  C(n,2) = max inversiones         : ${maxInv}`);
}

console.log("=== guess-sort vs bozo-sort⁺_opt ===\n");

runExperiment([8, 3, 7, 1, 5, 4, 6, 2], "ejemplo del paper");
runExperiment([5, 4, 3, 2, 1], "peor caso n=5");

simulateMany(8, 1000);
simulateMany(10, 500);
