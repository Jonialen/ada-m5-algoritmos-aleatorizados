package main

import (
	"fmt"
	"math/rand"
	"time"
)

// Problema 6c: iteraciones de bogo-sort ~ Geom(1/n!).
//
// Cada iteración genera una permutación uniforme. Hay n! permutaciones y solo
// una está ordenada, entonces p = 1/n!. Repetir hasta el primer éxito es una
// distribución geométrica.
func isSorted(arr []int) bool {
	for i := 0; i < len(arr)-1; i++ {
		if arr[i] > arr[i+1] {
			return false
		}
	}
	return true
}

func shuffle(arr []int) []int {
	copyArr := append([]int(nil), arr...)
	rand.Shuffle(len(copyArr), func(i, j int) {
		copyArr[i], copyArr[j] = copyArr[j], copyArr[i]
	})
	return copyArr
}

func bogoSort(arr []int) (iterations int, swaps int) {
	current := append([]int(nil), arr...)

	for {
		current = shuffle(current)
		iterations++
		swaps += len(current) - 1 // rand.Shuffle conceptualmente usa swaps; modelo similar a Fisher-Yates
		if isSorted(current) {
			break
		}
	}

	return iterations, swaps
}

func factorial(n int) int {
	result := 1
	for i := 2; i <= n; i++ {
		result *= i
	}
	return result
}

func simulate(n, trials int) {
	nFact := factorial(n)
	arr := make([]int, n)
	for i := range arr {
		arr[i] = i + 1
	}

	totalIterations := 0
	totalSwaps := 0
	for i := 0; i < trials; i++ {
		iterations, swaps := bogoSort(arr)
		totalIterations += iterations
		totalSwaps += swaps
	}

	fmt.Printf("\nn = %d (n! = %d, %d ensayos)\n", n, nFact, trials)
	fmt.Printf("  E[iteraciones] teórico  = %d\n", nFact)
	fmt.Printf("  E[iteraciones] simulado = %.2f\n", float64(totalIterations)/float64(trials))
	fmt.Printf("  E[swaps] teórico        = %d\n", (n-1)*nFact)
	fmt.Printf("  E[swaps] simulado       = %.2f\n", float64(totalSwaps)/float64(trials))
}

func main() {
	rand.Seed(time.Now().UnixNano())
	fmt.Println("Bogo-sort — verificando I ~ Geom(1/n!)")
	simulate(3, 5_000)
	simulate(4, 2_000)
	simulate(5, 500)
}
