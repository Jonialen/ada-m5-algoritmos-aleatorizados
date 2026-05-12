# Problema 5 — Inversiones

**Responsable:** Compañero 3

> Solución redactada con asistencia de Claude (Anthropic) y revisada por el equipo.

---

## Enunciado

Analizar el número esperado de inversiones en una permutación aleatoria.

---

## Definición

Una inversión es un par de índices `(i, j)` tal que:

```txt
i < j  y  A[i] > A[j]
```

En una permutación de `n` elementos hay:

```txt
C(n,2) = n(n-1)/2
```

pares posibles.

---

## Variable indicadora

Para cada par `(i, j)`, definimos:

```txt
X_ij = 1 si (i,j) es una inversión
X_ij = 0 si no lo es
```

El número total de inversiones es:

```txt
X = Σ X_ij
```

---

## Probabilidad de inversión

Para cualquier par `i < j`, en una permutación aleatoria es igualmente probable que:

```txt
A[i] < A[j]
```

o que:

```txt
A[i] > A[j]
```

Por lo tanto:

```txt
P(X_ij = 1) = 1/2
```

---

## Valor esperado

Por linealidad de la esperanza:

```txt
E[X] = Σ E[X_ij]
     = Σ P(X_ij = 1)
     = C(n,2) · 1/2
     = n(n-1)/4
```

---

## Conclusión

El número esperado de inversiones en una permutación aleatoria de `n` elementos es:

```txt
E[inversiones] = n(n-1)/4
```

Esto es exactamente la mitad del máximo posible de inversiones.

---
