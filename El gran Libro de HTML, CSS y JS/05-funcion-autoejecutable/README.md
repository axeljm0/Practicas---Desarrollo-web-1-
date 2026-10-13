# Ejercicio 05: Función Autoejecutable (IIFE)

## Objetivo
Comprender el concepto y las ventajas del patrón **IIFE** (*Immediately Invoked Function Expression*), aprendiendo cómo ejecutar una función en el momento exacto de su definición para crear un ámbito privado que evite la contaminación accidental del objeto global `window`.

## Conceptos Aplicados
- Sintaxis canónica de un IIFE: `(function(args) { ... })(params);`.
- Encapsulación léxica y privacidad de variables.
- Paso de parámetros iniciales a la función autoejecutable.
- Uso del objeto estándar `Math` (`Math.PI` y `Math.pow`).
- Auditoría de inspección en `window` para comprobar la ausencia de variables globales residuales.

## Instrucciones
1. Abre `index.html` en el navegador.
2. Nota cómo el cálculo se realiza automáticamente desde el arranque gracias a la autoejecución con radio `5`.
3. Observa el círculo gráfico interactivo que cambia de tamaño dinámicamente según el radio.
4. Ingresa un nuevo valor de radio (ej: `8` o `12`) y presiona **Actualizar Área**.
5. Revisa la tabla de auditoría en la parte inferior: confirma que las variables internas no son accesibles desde el objeto `window` (marcan `undefined`).

## Captura / Resultado Esperado
- Un círculo dorado en el centro con la inscripción `r = 5`.
- Dos tarjetas métricas:
  - Radio actual: `5 cm`
  - Área del círculo: `78.54 cm²`
- Un panel inferior de auditoría con distintivos verdes:
  - `Variable interna PI_LOCAL en window: undefined (Protegida)`
  - `Función calcularAreaCirculo directa en window: undefined (Encapsulada)`

## Código Clave Explicado
```javascript
// La función está envuelta en paréntesis () para convertir la declaración en expresión,
// y seguida de () para invocarla inmediatamente pasando el argumento 5
(function (radioInicial) {
  // Variable estrictamente local al IIFE
  const PI_LOCAL = Math.PI;

  function calcularAreaCirculo(radio) {
    return PI_LOCAL * Math.pow(radio, 2);
  }

  // Se ejecuta al instante al cargar el script
  const area = calcularAreaCirculo(radioInicial);
  console.log("Área calculada:", area);
})(5);
```
> **Explicación didáctica:** Antes de la llegada de los módulos ES6 (`import`/`export`), los IIFE eran el patrón arquitectónico estándar de la industria (utilizado por bibliotecas como jQuery) para evitar colisiones entre librerías en aplicaciones web comerciales.

## Retos Adicionales
1. **Patrón Módulo Exponiendo una API:** Modifica el IIFE para que retorne un objeto literal con métodos públicos: `return { cambiarRadio, obtenerArea };` asignándolo a una variable y pruébalo desde la consola.
2. **Cálculo del Perímetro:** Agrega dentro del IIFE el cálculo de la longitud de la circunferencia ($2 \times \pi \times r$) y muéstralo en una tercera tarjeta métrica.
3. **Control Deslizante (Slider):** Reemplaza o complementa el `<input type="number">` con un `<input type="range" min="1" max="25">` para que el círculo crezca o encoja en tiempo real con el evento `input`.
