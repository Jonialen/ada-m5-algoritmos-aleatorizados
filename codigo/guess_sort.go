package main

import (
	"fmt"
	"math/rand"
	"time"
)

// Problema 7a: guess-sort vs bozo-sort⁺_opt.
//
// bozo-sort⁺_opt puede desperdiciar pasos eligiendo pares ya ordenados.
// guess-sort sigue buscando hasta encontrar un par invertido, por lo que cada
// swap se hace sobre un par malo y garantiza progreso.
func countInversions(arr []int) int {
	inversions := 0
	for i := 0; i < len(arr); i++ {
		for j := i + 1; j < len(arr); j++ {
			if arr[i] > arr[j] {
				inversions++
			}
		}
	}
	return inversions
}

func sorted(arr []int) bool {
	for i := 0; i < len(arr)-1; i++ {
		if arr[i] > arr[i+1] {
			return false
		}
	}
	return true
}

func bozoSortOpt(arr []int) (steps int, swaps int) {
	a := append([]int(nil), arr...)
	n := len(a)

	for !sorted(a) {
		i := rand.Intn(n)
		j := rand.Intn(n)
		if i == j {
			steps++
			continue
		}
		if i > j {
			i, j = j, i
		}

		steps++
		if a[i] > a[j] {
			a[i], a[j] = a[j], a[i]
			swaps++
		}
	}

	return steps, swaps
}

func guessSort(arr []int) (comparisons int, swaps int) {
	a := append([]int(nil), arr...)
	n := len(a)

	for !sorted(a) {
		for {
			i := rand.Intn(n)
			j := rand.Intn(n)
			comparisons++

			if i == j {
				continue
			}
			if i > j {
				i, j = j, i
			}
			if a[i] > a[j] {
				a[i], a[j] = a[j], a[i]
				swaps++
				break
			}
		}
	}

	return comparisons, swaps
}

func runExperiment(arr []int) {
	inversions := countInversions(arr)
	steps, bozoSwaps := bozoSortOpt(arr)
	comparisons, guessSwaps := guessSort(arr)

	fmt.Printf("\nArreglo: %v (%d inversiones)\n", arr, inversions)
	fmt.Println("  bozo-sort⁺_opt:")
	fmt.Printf("    pasos totales  = %d\n", steps)
	fmt.Printf("    swaps útiles   = %d\n", bozoSwaps)
	fmt.Printf("    pasos perdidos = %d\n", steps-bozoSwaps)
	fmt.Printf("    eficiencia     = %.1f%%\n", float64(bozoSwaps)/float64(steps)*100)

	fmt.Println("  guess-sort:")
	fmt.Printf("    comparaciones  = %d\n", comparisons)
	fmt.Printf("    swaps útiles   = %d (todos sobre pares malos)\n", guessSwaps)
}

func randomPermutation(n int) []int {
	arr := make([]int, n)
	for i := range arr {
		arr[i] = i + 1
	}
	rand.Shuffle(n, func(i, j int) { arr[i], arr[j] = arr[j], arr[i] })
	return arr
}

func simulateMany(n, trials int) {
	totalBozoSteps, totalBozoSwaps := 0, 0
	totalGuessComps, totalGuessSwaps := 0, 0

	for i := 0; i < trials; i++ {
		arr := randomPermutation(n)
		steps, bozoSwaps := bozoSortOpt(arr)
		comparisons, guessSwaps := guessSort(arr)

		totalBozoSteps += steps
		totalBozoSwaps += bozoSwaps
		totalGuessComps += comparisons
		totalGuessSwaps += guessSwaps
	}

	maxInversions := n * (n - 1) / 2
	fmt.Printf("\n─── Simulación n=%d, %d ensayos ───\n", n, trials)
	fmt.Printf("  bozo-sort⁺_opt — pasos promedio : %.1f\n", float64(totalBozoSteps)/float64(trials))
	fmt.Printf("  bozo-sort⁺_opt — swaps promedio : %.1f\n", float64(totalBozoSwaps)/float64(trials))
	fmt.Printf("  guess-sort     — comps promedio  : %.1f\n", float64(totalGuessComps)/float64(trials))
	fmt.Printf("  guess-sort     — swaps promedio  : %.1f\n", float64(totalGuessSwaps)/float64(trials))
	fmt.Printf("  C(n,2) = max inversiones         : %d\n", maxInversions)
}

func main() {
	rand.Seed(time.Now().UnixNano())
	fmt.Println("=== guess-sort vs bozo-sort⁺_opt ===")
	runExperiment([]int{8, 3, 7, 1, 5, 4, 6, 2})
	runExperiment([]int{5, 4, 3, 2, 1})
	simulateMany(8, 1_000)
	simulateMany(10, 500)
}
