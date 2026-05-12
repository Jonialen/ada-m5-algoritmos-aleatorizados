# Problema 6a — Explicar la fórmula de P[Iₖ]

**Responsable:** Compañero 3

> Solución redactada con asistencia de Claude (Anthropic) y revisada por el equipo.

---

## Enunciado

Explique la fórmula usada para calcular `P[Iₖ]` en la prueba del Teorema 2 del paper _"Sorting the Slow Way"_.

---

## Contexto

En bogo-sort, antes de decidir si se debe barajar otra vez, el algoritmo verifica si el arreglo está ordenado comparando elementos adyacentes:

```txt
A[1] ≤ A[2], A[2] ≤ A[3], ..., A[n-1] ≤ A[n]
```

La variable `C` representa cuántas comparaciones se hacen antes de descubrir que el arreglo no está ordenado.

El evento `Iₖ` significa que se necesitan al menos `k` comparaciones.

---

## Intuición de P[Iₖ]

Para que se necesiten al menos `k` comparaciones, las primeras comparaciones no deben fallar. Es decir, los primeros elementos revisados deben estar en orden creciente.

Si observamos `k` elementos, todos los `k!` ordenamientos relativos son igualmente probables. Solo uno de esos ordenamientos está completamente creciente.

Por eso:

```txt
P[Iₖ] = 1/k!
```

---

## Ejemplo

Para `k = 3`, hay `3! = 6` formas de ordenar tres elementos:

```txt
123, 132, 213, 231, 312, 321
```

Solo `123` pasa todas las comparaciones iniciales.

Entonces:

```txt
P[I₃] = 1/3! = 1/6
```

---

## Conclusión

La fórmula aparece porque pasar las primeras comparaciones exige que un subconjunto de elementos esté en orden creciente. Entre `k!` órdenes relativos posibles, solo uno cumple eso.

---
