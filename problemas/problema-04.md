# Problema 4 — Dados

**Responsable:** Compañero 2  
> Solución redactada con asistencia de Claude (Anthropic) y revisada por el equipo.

---

## Enunciado

Analizar un experimento aleatorio con dados usando variables indicadoras y valor esperado.

---

## Idea general

Cuando un problema pide contar cuántas veces ocurre un evento en lanzamientos de dados, conviene definir variables indicadoras.

Por ejemplo, si queremos contar cuántas veces aparece cierto resultado, definimos:

```txt
X_i = 1 si el evento ocurre en el lanzamiento i
X_i = 0 si no ocurre
```

Entonces:

```txt
X = X_1 + X_2 + ... + X_n
```

Y por linealidad:

```txt
E[X] = E[X_1] + E[X_2] + ... + E[X_n]
```

---

## Ejemplo: número esperado de seises en n lanzamientos

Para cada lanzamiento:

```txt
P(sale 6) = 1/6
```

Por lo tanto:

```txt
E[X_i] = 1 · P(X_i=1) + 0 · P(X_i=0) = 1/6
```

Sumando para `n` lanzamientos:

```txt
E[X] = n · (1/6) = n/6
```

---

## Ejemplo: suma esperada de dos dados

Sea `D_1` y `D_2` el resultado de cada dado.

Para un dado justo:

```txt
E[D] = (1+2+3+4+5+6)/6 = 21/6 = 3.5
```

Entonces:

```txt
E[D_1 + D_2] = E[D_1] + E[D_2] = 3.5 + 3.5 = 7
```

---

## Conclusión

La herramienta principal es la linealidad de la esperanza. No hace falta que los eventos sean independientes para sumar esperanzas; solo necesitamos conocer el valor esperado de cada indicador.

---

## Video

> _Link al video — se agrega al final_
