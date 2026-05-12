# ADA — Módulo 5: Algoritmos Aleatorizados

**Análisis y Diseño de Algoritmos · UVG**  
Homework M5 · [Página del curso](https://ada-m5-homework.vercel.app/)

> Generado con asistencia de Claude (Anthropic). Todo el código y análisis fue revisado y explicado por el equipo.

---

## Integrantes y división

| Integrante    | Problemas        |
| ------------- | ---------------- |
| Jonathan Diaz | 1 · 6c · 7a      |
| Jose Merida   | 2 · 3 · 4        |
| Luis Padilla  | 5 · 6a · 6b · 7b |

---

## Problemas

### Página 1 — Análisis Probabilístico

| #   | Problema                          | Archivo                                      |
| --- | --------------------------------- | -------------------------------------------- |
| 1   | `random(a,b)` desde `random(0,1)` | [problema-01.md](./problemas/problema-01.md) |
| 2   | Desessesgar moneda sesgada        | [problema-02.md](./problemas/problema-02.md) |
| 3   | Problema de contratación          | [problema-03.md](./problemas/problema-03.md) |
| 4   | Dados                             | [problema-04.md](./problemas/problema-04.md) |
| 5   | Inversiones                       | [problema-05.md](./problemas/problema-05.md) |

### Página 2 — Awful Sorting

| #   | Problema                           | Archivo                                        |
| --- | ---------------------------------- | ---------------------------------------------- |
| 6a  | P[Iₖ] en Teorema 2                 | [problema-06a.md](./problemas/problema-06a.md) |
| 6b  | Por qué E[C] = Σ P[Iₖ]             | [problema-06b.md](./problemas/problema-06b.md) |
| 6c  | Iteraciones bogo-sort ~ Geom(1/n!) | [problema-06c.md](./problemas/problema-06c.md) |

### Página 3 — Fun-Sort

| #   | Problema                     | Archivo                                        |
| --- | ---------------------------- | ---------------------------------------------- |
| 7a  | Guess-sort vs bozo-sort⁺_opt | [problema-07a.md](./problemas/problema-07a.md) |
| 7b  | Caso promedio de Fun-sort    | [problema-07b.md](./problemas/problema-07b.md) |

---

## Video

> _Link al video de YouTube (no listado) — se agrega al final_

---

## Código

Todo el código está en [`/codigo`](./codigo/).

```
codigo/
  random.go        # Problema 1
  bogo.go          # Problema 6c
  guess_sort.go    # Problema 7a
```

Para ejecutar cualquier archivo:

```bash
go run codigo/random.go
go run codigo/bogo.go
go run codigo/guess_sort.go
```
