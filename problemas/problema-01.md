# Problema 1 — `random(a, b)` desde `random(0, 1)`

**Módulo 5 · Análisis Probabilístico · UVG**  
**Responsable:** Jonialen

> Código generado con asistencia de Claude (Anthropic) y revisado por el equipo.

---

## Enunciado

Describe una implementación de un generador de números enteros aleatorios dentro del intervalo `[a, b]`, basada únicamente en llamadas a `random(0, 1)` donde `P(0) = P(1) = ½`. Luego, calcula el tiempo de ejecución esperado del algoritmo.

---

## Idea del algoritmo

Para generar un número uniforme en `[a, b]` existen `(b - a + 1)` valores posibles. Para representarlos en binario necesitamos:

```
k = ⌈log₂(b − a + 1)⌉  bits
```

Con `k` bits podemos representar números en `[0, 2^k − 1]`. El rango válido es `[0, b−a]` (tamaño `b−a+1`). Si el número generado cae fuera de ese rango, lo descartamos y repetimos.

### Pasos

1. Calcular `k = ⌈log₂(b − a + 1)⌉`
2. Generar `k` bits con `random01()` → número `r ∈ [0, 2^k − 1]`
3. Si `r ≤ (b − a)` → retornar `a + r` ✓
4. Si `r > (b − a)` → descartar y repetir (garantiza uniformidad)

---

## Análisis del tiempo esperado

Cada intento tiene probabilidad de éxito:

```
p = (b − a + 1) / 2^k
```

Los intentos son independientes y cada uno tiene la misma probabilidad `p` de éxito → el número de intentos sigue una **distribución Geométrica**:

```
T ~ Geom(p)

E[intentos] = 1/p = 2^k / (b − a + 1)
```

### Cota superior

Como `k = ⌈log₂(b−a+1)⌉`, se tiene `2^k < 2(b−a+1)`, por lo tanto:

```
E[intentos] < 2
```

El tiempo esperado es **O(k) = O(log(b−a+1))** bits generados en promedio.

### Ejemplo: `random(1, 6)`

| Parámetro | Valor |
|---|---|
| `range` | 6 |
| `k` | `⌈log₂(6)⌉ = 3` bits |
| Rango generado | `[0, 7]` |
| Valores válidos | `0,1,2,3,4,5` → retorna `1,2,3,4,5,6` |
| Valores inválidos | `6, 7` → reintentar |
| `P(éxito)` | `6/8 = 0.75` |
| `E[intentos]` | `1/0.75 ≈ 1.33` |

---

## Implementación

Ver [`../codigo/random.go`](../codigo/random.go)

```go
func randomAB(a, b int) (value int, attempts int) {
    rangeSize := b - a + 1
    k := int(math.Ceil(math.Log2(float64(rangeSize))))

    for {
        attempts++
        r := 0
        for i := 0; i < k; i++ {
            r = r*2 + random01()
        }
        if r < rangeSize {
            return a + r, attempts
        }
    }
}
```

### Salida de verificación (50 000 muestras, `random(1, 6)`)

```
random(1, 6) — 50000 muestras
k = 3 bits,  P(éxito) = 0.7500,  E[intentos] teórico = 1.3333

Distribución:
  1:   8342 ██████████
  2:   8361 ██████████
  3:   8298 ██████████
  4:   8317 ██████████
  5:   8356 ██████████
  6:   8326 ██████████

E[intentos] simulado = 1.3321
E[intentos] teórico  = 1.3333
```

La distribución es uniforme y el número promedio de intentos coincide con el valor teórico.

---

## Video

> _Link al video — se agrega al final_
