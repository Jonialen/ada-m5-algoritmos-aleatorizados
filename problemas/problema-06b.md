# Problema 6b — Por qué E[C] = Σ P[Iₖ]

**Responsable:** Compañero 3  
> Solución redactada con asistencia de Claude (Anthropic) y revisada por el equipo.

---

## Enunciado

En la prueba del Teorema 2, ¿por qué `E[C] = Σₖ₍>₀₎ P[Iₖ]`?

---

## Identidad usada

Para cualquier variable aleatoria entera no negativa `X`, se cumple:

```txt
E[X] = Σ_{k≥1} P(X ≥ k)
```

Esta se llama la fórmula de la **suma de colas** (*tail sum formula*).

---

## Demostración breve

Partimos de la definición:

```txt
E[X] = Σ_{m≥1} m · P(X = m)
```

Pero `m` puede escribirse como suma de unos:

```txt
m = 1 + 1 + ... + 1   (m veces)
```

Entonces:

```txt
E[X] = Σ_{m≥1} Σ_{k=1}^{m} P(X = m)
```

Intercambiando el orden de la suma:

```txt
E[X] = Σ_{k≥1} Σ_{m≥k} P(X = m)
     = Σ_{k≥1} P(X ≥ k)
```

---

## Aplicación al Teorema 2

En el paper, `C` es el número de comparaciones realizadas.

El evento `Iₖ` significa:

```txt
Iₖ = “se hacen al menos k comparaciones”
```

Por definición:

```txt
P[Iₖ] = P(C ≥ k)
```

Entonces:

```txt
E[C] = Σ_{k≥1} P(C ≥ k)
     = Σ_{k≥1} P[Iₖ]
```

Si además usamos `P[Iₖ] = 1/k!`, obtenemos:

```txt
E[C] = Σ_{k≥1} 1/k! = e − 1 ≈ 1.71828
```

---

## Conclusión

La igualdad no es específica de bogo-sort; es una identidad general para variables aleatorias enteras no negativas. En este caso se aplica porque `Iₖ` representa exactamente el evento `C ≥ k`.

---

## Video

> _Link al video — se agrega al final_
