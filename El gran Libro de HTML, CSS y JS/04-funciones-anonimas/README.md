# Ejercicio 04: Funciones Anónimas

## Objetivo
Entender el concepto de funciones anónimas y expresiones de función (*Function Expressions*), comprendiendo cómo en JavaScript las funciones son ciudadanos de primera clase (*first-class citizens*) que pueden ser asignadas a variables constantes y pasadas como argumentos (*callbacks*).

## Conceptos Aplicados
- Expresiones de función: `const elevarAlCuadrado = function(numero) { ... };`.
- Ausencia de nombre identificador propio (función anónima).
- Diferencia fundamental con la declaración de funciones: las expresiones de función **no sufren hoisting** de su definición, por lo que no pueden ser invocadas antes de su declaración.
- Uso de funciones anónimas como *callbacks* en métodos de orden superior como `Array.prototype.map()`.

## Instrucciones
1. Abre `index.html` en el navegador.
2. Ingresa cualquier número en el campo de texto (por ejemplo `7`, `12` o `-4`).
3. Haz clic en **Calcular Cuadrado** o presiona `Enter`.
4. Observa el resultado numérico en pantalla y la fórmula desglosada.
5. Revisa la sección inferior donde se aplica la función a un arreglo `[2, 3, 4, 5, 6]` para obtener `[4, 9, 16, 25, 36]`.

## Captura / Resultado Esperado
- Un visor numérico azul que muestra el cuadrado (por ejemplo `81` con fórmula `9² = 9 × 9 = 81`).
- Dos filas de etiquetas (*chips*):
  - Arreglo original: `2`, `3`, `4`, `5`, `6`.
  - Arreglo procesado con la función anónima: `4`, `9`, `16`, `25`, `36`.

## Código Clave Explicado
```javascript
// La función no tiene nombre entre 'function' y los paréntesis '()'
// Se asigna la referencia de la función a la constante 'elevarAlCuadrado'
const elevarAlCuadrado = function (numero) {
  const n = Number(numero);
  if (isNaN(n)) {
    throw new Error("El valor proporcionado no es un número válido.");
  }
  return n * n;
};

// Se invoca usando el identificador de la variable:
const resultado = elevarAlCuadrado(9); // resultado = 81
```
> **Explicación didáctica:** En JavaScript tradicional, asignar una función anónima a una constante es la base de las expresiones funcionales. Nos permite tratar a la función como un dato más: pasarla, retornarla o guardarla en estructuras de datos.

## Retos Adicionales
1. **Función Flecha (Arrow Function):** Reescribe la expresión `const elevarAlCuadrado` utilizando la sintaxis moderna de función flecha (`(numero) => numero * numero`) y compara la concisión sintáctica.
2. **Elevar al Cubo:** Crea otra función anónima `const elevarAlCubo = function(numero) { return numero ** 3; }` y añade un botón adicional en la interfaz para probarla.
3. **Filtro de números pares:** Utiliza una función anónima dentro de `.filter()` para obtener solo los números pares de una lista.
