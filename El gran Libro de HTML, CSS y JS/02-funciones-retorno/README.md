# Ejercicio 02: Funciones con Retorno

## Objetivo
Comprender el propósito y funcionamiento de la sentencia `return` en JavaScript para que una función produzca un valor de salida que pueda ser asignado a variables, utilizado en expresiones matemáticas posteriores o mostrado en la interfaz gráfica.

## Conceptos Aplicados
- Declaración de funciones con valor de retorno (`return`).
- Separación de responsabilidades: la función calcula un valor matemático puro y otra función se encarga de presentarlo en el DOM.
- Validación numérica y manejo de excepciones con `try...catch` y `throw new Error()`.
- Captura de eventos con `addEventListener` para teclado (`keyup`) y clic (`click`).

## Instrucciones
1. Abre `index.html` en tu navegador.
2. Observarás que se realiza un cálculo automático inicial para una base de `12` y una altura de `6`.
3. Modifica los valores en los campos "Base" y "Altura" e ingresa números enteros o decimales.
4. Presiona el botón **Calcular Área** o presiona la tecla `Enter` en los inputs.
5. Observa cómo el resultado principal se actualiza y cada cálculo queda registrado en la sección de historial.

## Captura / Resultado Esperado
- Un panel central verde con el valor destacado en fuente grande: `72 cm²`.
- Una línea descriptiva de la fórmula: `Fórmula: 12 × 6 = 72 cm²`.
- Una sección de historial inferior donde cada nuevo cálculo se va listando con sus medidas y su área respectiva.
- En caso de ingresar números negativos o cero, se muestra un mensaje de error descriptivo en lugar de un número incorrecto.

## Código Clave Explicado
```javascript
// Función pura: no toca el DOM, solo recibe datos y devuelve un resultado numérico
function calcularAreaRectangulo(base, altura) {
  const b = Number(base);
  const h = Number(altura);

  if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) {
    throw new Error("Tanto la base como la altura deben ser números positivos mayores que cero.");
  }

  // La sentencia 'return' entrega el producto y finaliza inmediatamente la función
  return b * h;
}

// Al invocarla, podemos guardar el valor retornado en una variable:
const area = calcularAreaRectangulo(12, 6); // area = 72
```
> **Explicación didáctica:** El valor que devuelve `return` sustituye la llamada de la función exactamente donde fue ejecutada. Esto permite componer operaciones complejas, como multiplicar el área devuelta por el precio unitario de un material.

## Retos Adicionales
1. **Cálculo de Perímetro:** Agrega una función complementaria `calcularPerimetroRectangulo(base, altura)` con la fórmula $2 \times (b + h)$ y muestra el perímetro al lado del área.
2. **Selector de Unidades:** Añade un elemento `<select>` con opciones como "cm", "m" o "pulgadas" y concatena la unidad adecuada al resultado (`m²`, `in²`).
3. **Botón para borrar el historial:** Agrega un botón para vaciar el contenedor del historial cuando contenga demasiados cálculos.
