# Problema 3 — Problema de contratación

> Solución redactada con asistencia de Claude (Anthropic) y revisada por el equipo.

---

## Enunciado

Analizar el problema de contratación usando variables aleatorias indicadoras: se entrevista a candidatos en orden aleatorio y se contrata cuando el candidato actual es mejor que todos los anteriores.

---

## Modelo

Sea `X_i` una variable indicadora:

```txt
X_i = 1 si se contrata al candidato i
X_i = 0 si no se contrata
```

El número total de contrataciones es:

```txt
X = X_1 + X_2 + ... + X_n
```

---

## Probabilidad de contratar al candidato i

El candidato `i` se contrata si es el mejor entre los primeros `i` candidatos.

Como el orden es aleatorio, cualquiera de los primeros `i` candidatos tiene la misma probabilidad de ser el mejor.

Por lo tanto:

```txt
P(X_i = 1) = 1/i
```

---

## Valor esperado

Por linealidad de la esperanza:

```txt
E[X] = E[X_1 + X_2 + ... + X_n]
     = E[X_1] + E[X_2] + ... + E[X_n]
     = 1 + 1/2 + 1/3 + ... + 1/n
     = H_n
```

Donde `H_n` es el n-ésimo número armónico.

Como:

```txt
H_n = Θ(log n)
```

el número esperado de contrataciones es:

```txt
E[X] = Θ(log n)
```

---

## Conclusión

Aunque en el peor caso podríamos contratar a todos los candidatos, si el orden de entrevistas es aleatorio, el número esperado de contrataciones crece solo logarítmicamente.

---
