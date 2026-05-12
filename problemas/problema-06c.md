# Problema 6c — Iteraciones de bogo-sort ~ Geom(1/n!)

**Módulo 5 · Awful Sorting · UVG**  
**Responsable:** Jonialen

> Código generado con asistencia de Claude (Anthropic) y revisado por el equipo.

---

## Enunciado

En la sección 2.3 del paper _"Sorting the Slow Way"_, ¿por qué la variable aleatoria `I` que cuenta el número de iteraciones del algoritmo tiene distribución geométrica?

---

## Argumento

### Qué es una iteración de bogo-sort

Una iteración consiste en:

1. Verificar si el arreglo está ordenado.
2. Si no lo está → hacer un **shuffle uniforme aleatorio** (permutación uniformemente aleatoria entre las `n!` posibles).

### Por qué P(éxito) = 1/n!

El shuffle produce una de las `n!` permutaciones posibles con igual probabilidad. Solo **1** de esas permutaciones está ordenada. Por lo tanto:

```
P(arreglo ordenado tras un shuffle) = 1/n!
```

### Por qué las iteraciones son independientes

Cada shuffle **borra la memoria del pasado** — la permutación resultante es uniforme independientemente del historial. Formalmente:

```
P(éxito en iteración i | fracasó en i-1, ..., fracasó en 1) = 1/n!
```

### Por qué I ~ Geom(1/n!)

Tenemos experimentos de Bernoulli **independientes** con probabilidad de éxito constante `p = 1/n!`, donde contamos el número de intentos hasta el primer éxito. Esa es exactamente la definición de **distribución Geométrica**:

```
I ~ Geom(1/n!)

P(I = k) = (1 − 1/n!)^{k−1} · (1/n!)

E[I] = 1/p = n!

Var[I] = (1−p)/p² ≈ (n!)²
```

### Consecuencias prácticas

| n   | n!     | E[iteraciones] |
| --- | ------ | -------------- |
| 3   | 6      | 6              |
| 4   | 24     | 24             |
| 5   | 120    | 120            |
| 6   | 720    | 720            |
| 8   | 40 320 | 40 320         |

El crecimiento es **superexponencial** — bogo-sort es absurdamente ineficiente.

---

## Implementación

Ver [`../codigo/bogo.go`](../codigo/bogo.go)

```go
func bogoSort(arr []int) (iterations int, swaps int) {
    current := append([]int(nil), arr...)

    for {
        current = shuffle(current)
        iterations++
        swaps += len(current) - 1
        if isSorted(current) { break }
    }

    return iterations, swaps
}
```

### Salida de verificación

```
n = 3  (n! = 6, 5000 ensayos)
  E[iteraciones] teórico  = 6
  E[iteraciones] simulado = 6.01

n = 4  (n! = 24, 2000 ensayos)
  E[iteraciones] teórico  = 24
  E[iteraciones] simulado = 23.9

n = 5  (n! = 120, 500 ensayos)
  E[iteraciones] teórico  = 120
  E[iteraciones] simulado = 120.5
```

Los valores simulados convergen a `n!`, confirmando que `I ~ Geom(1/n!)`.

---
