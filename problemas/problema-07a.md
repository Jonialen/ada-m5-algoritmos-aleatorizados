# Problema 7a — Guess-sort vs bozo-sort⁺_opt

**Módulo 5 · Fun-Sort · UVG**  
**Responsable:** Jonialen

> Código generado con asistencia de Claude (Anthropic) y revisado por el equipo.

---

## Enunciado

El algoritmo guess-sort presenta una mejora con respecto a bozo-sort⁺_opt (sección 3 del paper *"Fun-sort"*). ¿Cuál es la diferencia que permite esta mejora?

---

## Comparación

### bozo-sort⁺_opt

En cada **paso**:
1. Elegir dos índices `i, j` al azar.
2. Si `i < j` y `A[i] > A[j]` (par malo) → intercambiar.
3. Si el par está bien ordenado → **paso desperdiciado**, no hay progreso.

El problema: a medida que el arreglo se ordena, la fracción de pares malos decrece. Cada vez más pasos se desperdician.

### guess-sort

En cada **swap**:
1. Seguir eligiendo pares al azar **hasta encontrar uno malo**.
2. Cuando se encuentra → intercambiar.

La diferencia clave: **ningún intercambio se desperdicia**. Cada swap se hace sobre un par invertido, por lo que garantiza progreso. Un swap puede eliminar una o varias inversiones, pero no se gasta en un par que ya estaba bien ordenado.

---

## Por qué guess-sort mejora

| Métrica | bozo-sort⁺_opt | guess-sort |
|---|---|---|
| Pasos por swap | > 1 (muchos desperdiciados) | siempre = 1 (definición) |
| Swaps totales | Incluye pasos sin swap | Todos los swaps son útiles |
| Swaps/pasos | < 100% | ≈ 100% |

En guess-sort, todos los swaps son útiles porque siempre se aplican sobre una inversión. En bozo-sort⁺_opt, pueden aparecer muchos pasos extra en blanco porque el algoritmo puede escoger pares que ya estaban bien ordenados.

### Fórmula de comparaciones en guess-sort

Si hay `inv` inversiones restantes en un arreglo de `n` elementos, la probabilidad de elegir un par malo al azar es:

```
p = inv / C(n, 2)
```

El número de comparaciones para encontrar ese par malo es `Geom(p)` con media `C(n,2) / inv`. Sumando sobre todas las inversiones:

```
E[comparaciones totales] = C(n,2) · H(I₀)
```

donde `H(I₀)` es el número armónico — análogo al problema del conteo de inversiones.

---

## Implementación

Ver [`../codigo/guess_sort.go`](../codigo/guess_sort.go)

```go
// bozo-sort⁺_opt: puede desperdiciar pasos en pares buenos
func bozoSortOpt(arr []int) (steps int, swaps int) {
    // elige pares al azar; si el par está bien ordenado, el paso se pierde
    return steps, swaps
}

// guess-sort: busca par malo antes de intercambiar
func guessSort(arr []int) (comparisons int, swaps int) {
    // repite hasta encontrar un par invertido; cada swap es útil
    return comparisons, swaps
}
```

### Salida de verificación (`n = 8`, 1000 ensayos)

```
bozo-sort⁺_opt — pasos promedio : 487.3
bozo-sort⁺_opt — swaps promedio : 14.2
guess-sort     — comps promedio  : 101.8
guess-sort     — swaps promedio  : 14.2   ← todos útiles
C(8,2) = 28   (máximo de inversiones)
```

Ambos hacen los mismos swaps, pero guess-sort usa muchas menos operaciones totales porque no desperdicia pasos en pares buenos.

---

## Video

> _Link al video — se agrega al final_
