# Problema 7b — Caso promedio de Fun-sort

**Responsable:** Compañero 3

> Solución redactada con asistencia de Claude (Anthropic) y revisada por el equipo.

---

## Enunciado

Analizar el caso promedio de Fun-sort.

---

## Idea general

Fun-sort trabaja sobre inversiones. Una inversión es un par `(i,j)` tal que:

```txt
i < j  y  A[i] > A[j]
```

El algoritmo mejora el arreglo eliminando inversiones. Por eso, el análisis promedio depende de cuántas inversiones tiene una permutación aleatoria.

---

## Número esperado de inversiones

Para una permutación aleatoria de `n` elementos, el número esperado de inversiones es:

```txt
E[I] = n(n-1)/4
```

Esto se prueba con variables indicadoras: hay `C(n,2)` pares y cada par tiene probabilidad `1/2` de ser inversión.

---

## Interpretación para Fun-sort

Si el algoritmo elimina al menos una inversión por avance útil, entonces el número esperado de avances útiles está relacionado con:

```txt
Θ(n²)
```

porque:

```txt
n(n-1)/4 = Θ(n²)
```

El costo total depende además del trabajo para encontrar o procesar cada inversión.

---

## Relación con búsqueda binaria

En la página se menciona búsqueda binaria porque Fun-sort puede reducir el costo de localizar posiciones o inversiones usando comparaciones estructuradas en lugar de probar pares completamente al azar.

La mejora conceptual es:

- Algoritmos tipo bozo-sort desperdician muchos pasos.
- Guess-sort evita swaps inútiles pero todavía puede gastar comparaciones buscando pares malos.
- Fun-sort intenta usar más estructura para encontrar progreso de forma más eficiente.

---

## Conclusión

El caso promedio parte del hecho de que una permutación aleatoria tiene `n(n-1)/4` inversiones esperadas. Por eso, cualquier algoritmo que avance eliminando inversiones tiene una base de análisis ligada a `Θ(n²)` avances útiles, más el costo de encontrar cada avance.

---
