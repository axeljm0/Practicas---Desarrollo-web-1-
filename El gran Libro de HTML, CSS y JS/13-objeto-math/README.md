# Ejercicio 13: Objeto Estándar Math

## Objetivo
Explorar el objeto estándar estático `Math` en JavaScript, aprendiendo a generar números pseudoaleatorios acotados en un intervalo entero `[1, 100]` y a aplicar funciones matemáticas elementales: redondeos (`floor`, `ceil`, `round`), radicación (`sqrt`) y potenciación (`pow`).

## Conceptos Aplicados
- Naturaleza del objeto `Math` (objeto estático que no se instancia con `new`).
- Generación de números aleatorios: `Math.random()`.
- Algoritmo para intervalo entero `[min, max]`: `Math.floor(Math.random() * (max - min + 1)) + min`.
- Raíz cuadrada: `Math.sqrt()`.
- Potencias: `Math.pow(base, exponente)`.
- Comparativa de los 3 tipos de redondeo:
  - `Math.floor()`: Trunca hacia abajo.
  - `Math.ceil()`: Redondea hacia arriba al entero inmediatamente superior.
  - `Math.round()`: Redondea al entero más próximo según el criterio de $\ge 0.5$.

## Instrucciones
1. Abre `index.html` en el navegador.
2. Observa el número aleatorio inicial generado entre 1 y 100 en la tarjeta naranja principal.
3. Examina las 4 tarjetas con el cálculo de su raíz cuadrada, potencia al cuadrado, potencia al cubo y multiplicación por $\pi$.
4. Revisa la sección inferior que divide $N / 3$ y compara en paralelo cómo actúan `floor`, `ceil` y `round` sobre el mismo valor decimal.
5. Haz clic en **🎲 Generar Nuevo Número** tantas veces como desees para observar diferentes casos (números con raíces exactas vs decimales).

## Captura / Resultado Esperado
- Un gran número central (ej: `64` o `27`) en tipografía naranja destacada.
- 4 tarjetas con resultados matemáticos precisos.
- Una tabla comparativa inferior:
  - `Math.floor(21.33) -> 21`
  - `Math.ceil(21.33) -> 22`
  - `Math.round(21.33) -> 21`

## Código Clave Explicado
```javascript
// Generador de entero aleatorio entre 1 y 100 inclusivo
function generarEnteroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const n = generarEnteroAleatorio(1, 100);

// Raíz cuadrada y potencias
const raiz = Math.sqrt(n);
const cuadrado = Math.pow(n, 2);

// Redondeos sobre decimales
const decimal = 14.65;
console.log(Math.floor(decimal)); // 14
console.log(Math.ceil(decimal));  // 15
console.log(Math.round(decimal)); // 15
```
> **Explicación didáctica:** A diferencia de `Date` o `String`, `Math` no es una función constructora. Es un espacio de nombres (*namespace*) global estático con métodos utilitarios directamente accesibles.

## Retos Adicionales
1. **Lanzador de dados:** Crea una función `lanzarDado()` que genere un número aleatorio exclusivamente del 1 al 6 y muestre el icono del dado correspondiente (⚀, ⚁, ⚂, ⚃, ⚄, ⚅).
2. **Métodos `Math.min()` y `Math.max()`:** Muestra el número más pequeño y el más grande de un conjunto de 5 números aleatorios simultáneos.
3. **Simulador de ruleta o lotería:** Genera 6 números aleatorios únicos sin repetición simulando un sorteo de lotería.
