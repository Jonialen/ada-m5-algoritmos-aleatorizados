package main

import (
	"fmt"
	"math"
	"math/rand"
	"time"
)

// Problema 1: random(a,b) usando únicamente random(0,1).
//
// Generamos k = ceil(log2(b-a+1)) bits para obtener r en [0, 2^k-1].
// Si r cae dentro del rango válido [0, b-a], retornamos a+r.
// Si cae fuera, lo descartamos y repetimos. Eso conserva uniformidad.
func random01() int {
	if rand.Float64() < 0.5 {
		return 0
	}
	return 1
}

func randomAB(a, b int) (value int, attempts int) {
	rangeSize := b - a + 1
	k := int(math.Ceil(math.Log2(float64(rangeSize))))

	for {
		attempts++
		r := 0
		for i := 0; i < k; i++ {
			r = r*2 + random01()
		}

		if r < rangeSize {
			return a + r, attempts
		}
	}
}

func main() {
	rand.Seed(time.Now().UnixNano())

	const a, b = 1, 6
	const samples = 50_000

	rangeSize := b - a + 1
	k := int(math.Ceil(math.Log2(float64(rangeSize))))
	pSuccess := float64(rangeSize) / math.Pow(2, float64(k))
	theoreticalExpected := 1 / pSuccess

	counts := make(map[int]int)
	totalAttempts := 0
	for i := a; i <= b; i++ {
		counts[i] = 0
	}

	for i := 0; i < samples; i++ {
		value, attempts := randomAB(a, b)
		counts[value]++
		totalAttempts += attempts
	}

	fmt.Printf("\nrandom(%d, %d) — %d muestras\n", a, b, samples)
	fmt.Printf("k = ceil(log2(%d)) = %d bits\n", rangeSize, k)
	fmt.Printf("P(éxito) = %d/2^%d = %.4f\n", rangeSize, k, pSuccess)
	fmt.Printf("E[intentos] teórico = %.4f\n\n", theoreticalExpected)

	fmt.Printf("Distribución esperada: ~%.0f apariciones por valor\n", float64(samples)/float64(rangeSize))
	for i := a; i <= b; i++ {
		fmt.Printf("  %d: %6d\n", i, counts[i])
	}

	simulatedExpected := float64(totalAttempts) / float64(samples)
	fmt.Printf("\nE[intentos] simulado = %.4f\n", simulatedExpected)
	fmt.Printf("E[intentos] teórico  = %.4f\n", theoreticalExpected)
	fmt.Printf("Diferencia           = %.4f\n", math.Abs(simulatedExpected-theoreticalExpected))
}
