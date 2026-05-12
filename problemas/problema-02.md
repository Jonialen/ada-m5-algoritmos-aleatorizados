# Problema 2 — Desessesgar una moneda sesgada

> Solución propuesta por el equipo, redactada con asistencia de Claude (Anthropic) y revisada por el equipo.

---

## Enunciado

Construir un generador de bits justos usando una moneda sesgada, es decir, una función que devuelve `1` con probabilidad `p` y `0` con probabilidad `1-p`, donde `p` es desconocido.

---

## Solución: Truco de Von Neumann

Lanzamos la moneda dos veces:

| Resultado | Acción              |
| --------- | ------------------- |
| `01`      | retornar `0`        |
| `10`      | retornar `1`        |
| `00`      | descartar y repetir |
| `11`      | descartar y repetir |

La clave es que:

```txt
P(01) = (1-p)p
P(10) = p(1-p)
```

Ambas probabilidades son iguales. Por eso, condicionando a que salió uno de esos dos casos, `0` y `1` quedan con probabilidad `1/2`.

---

## Tiempo esperado

La probabilidad de aceptar en una ronda es:

```txt
P(01 o 10) = 2p(1-p)
```

El número de rondas sigue una distribución geométrica:

```txt
E[rondas] = 1 / (2p(1-p))
```

Cada ronda usa 2 lanzamientos, por lo tanto:

```txt
E[lanzamientos] = 2 · E[rondas] = 1 / (p(1-p))
```

---

## Pseudocódigo

```go
func fairBitFromBiasedCoin() int {
    for {
        x := biasedCoin()
        y := biasedCoin()

        if x == 0 && y == 1 { return 0 }
        if x == 1 && y == 0 { return 1 }
        // 00 y 11 se descartan
    }
}
```

---
