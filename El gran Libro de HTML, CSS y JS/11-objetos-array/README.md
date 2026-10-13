# Ejercicio 11: Objeto Estándar Array

## Objetivo
Dominar las 6 operaciones fundamentales de manipulación de listas en JavaScript utilizando el objeto estándar `Array`, distinguiendo entre métodos que mutan el arreglo original (`push`, `pop`, `sort`) y métodos inmutables o funcionales (`filter`, `map`, `reduce`, `find`).

## Conceptos Aplicados
- Arreglo base: `[15, 8, 42, 23, 4, 16]`.
- Mutación de extremos con `arr.push()` y `arr.pop()`.
- Función de comparación en ordenamiento: `arr.sort((a, b) => a - b)` para evitar el ordenamiento lexicográfico por defecto.
- Métodos funcionales iterativos:
  - `filter()` para seleccionar subconjuntos condicionales.
  - `map()` para transformar elementos uno a uno.
  - `reduce()` para acumular un único valor escalar a partir de una lista.
  - `find()`, `indexOf()` e `includes()` para búsqueda de elementos y posiciones.

## Instrucciones
1. Abre `index.html` en el navegador.
2. Observa las fichas verdes superiores con los 6 números del arreglo base: `15`, `8`, `42`, `23`, `4`, `16`.
3. Revisa la lista de operaciones calculadas en tiempo real.
4. Presiona el botón **+ push(99) al final**: verás aparecer una nueva ficha con el `99` y todos los cálculos (suma, duplicados, orden ascendente) se recalculan automáticamente.
5. Presiona **- pop() último** para retirar el elemento final.
6. Pulsa **Restablecer Original** para regresar al estado inicial en cualquier momento.

## Captura / Resultado Esperado
- Tablero superior con las fichas numéricas estilizadas.
- 6 bloques con resultados:
  1. `Longitud actual: 6 elementos | Último elemento: 16`
  2. `Orden Ascendente: [4, 8, 15, 16, 23, 42]`
  3. `Mayores a 15: [42, 23, 16] (3 encontrados)`
  4. `Multiplicar por 2: [30, 16, 84, 46, 8, 32]`
  5. `Suma total: 108 | Promedio: 18.00`
  6. `Primer número > 20: 42 | Índice de 42: 2 | ¿Contiene 23?: Sí (true)`

## Código Clave Explicado
```javascript
const numeros = [15, 8, 42, 23, 4, 16];

// Ordenamiento numérico seguro
const ordenados = numeros.slice().sort((a, b) => a - b); // [4, 8, 15, 16, 23, 42]

// Filtrado de elementos mayores a 15
const mayores = numeros.filter(n => n > 15); // [42, 23, 16]

// Mapeo duplicando cada valor
const dobles = numeros.map(n => n * 2); // [30, 16, 84, 46, 8, 32]

// Reducción para calcular la sumatoria
const total = numeros.reduce((acc, curr) => acc + curr, 0); // 108
```
> **Explicación didáctica:** El método `sort()` por defecto convierte los elementos a cadenas de texto antes de ordenar, por lo que sin una función de comparación `(a, b) => a - b`, `15` se ubicaría erróneamente antes que `4` (`"15" < "4"`).

## Retos Adicionales
1. **Métodos `unshift` y `shift`:** Añade botones para agregar y quitar elementos al inicio del arreglo.
2. **Método `some` y `every`:** Añade una comprobación lógica con `numeros.every(n => n > 0)` y `numeros.some(n => n > 100)`.
3. **Desestructuración de Arrays:** Extrae los dos primeros elementos en variables independientes (`const [primero, segundo] = numeros;`) y muéstralos en pantalla.
