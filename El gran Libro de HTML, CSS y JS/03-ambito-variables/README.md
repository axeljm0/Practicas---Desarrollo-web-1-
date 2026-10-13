# Ejercicio 03: Ámbito de Variables

## Objetivo
Analizar y comprender las reglas de visibilidad, anidamiento y ciclo de vida de las variables en JavaScript, contrastando el **ámbito global** con el **ámbito local** (funcional) y experimentando con el comportamiento de `ReferenceError` y el sombreado de variables (*shadowing*).

## Conceptos Aplicados
- Ámbito Global (*Global Scope*).
- Ámbito Local / Funcional (*Function Scope*).
- Cadena de ámbitos (*Scope Chain*).
- Sombreado de variables (*Variable Shadowing*).
- Excepción de referencia (`ReferenceError`).
- Encapsulación para evitar colisiones en aplicaciones grandes.

## Instrucciones
1. Abre `index.html` en el navegador.
2. Observa el diagrama visual con cajas anidadas que ilustra cómo el ámbito global envuelve al ámbito local.
3. Haz clic en el botón **1. Acceder a variable global**: verás cómo la variable es visible tanto en el script exterior como dentro de una función hija.
4. Haz clic en **2. Acceder a variable local desde dentro**: comprueba cómo la variable nace y se imprime correctamente dentro de su función.
5. Haz clic en **3. Intentar acceder a variable local desde fuera**: observa cómo JavaScript dispara un error `ReferenceError` al intentar buscar una variable local desde afuera.
6. Haz clic en **4. Demostrar sombreado (Shadowing)**: analiza cómo una variable local con el mismo nombre oculta temporalmente a la global sin destruirla ni modificarla.

## Captura / Resultado Esperado
- Una terminal oscura interactiva en la parte inferior con mensajes coloreados:
  - Mensajes verdes para accesos permitidos.
  - Mensaje rojo para el error de referencia: `> ¡Capturado ReferenceError esperado!: "mensajeLocal is not defined"`.
  - Mensaje amarillo explicando el ciclo de vida.
- La consola cuenta con un botón **Limpiar** para reiniciar las trazas.

## Código Clave Explicado
```javascript
// ÁMBITO GLOBAL: Esta variable vive en la raíz del entorno
const mensajeGlobal = "Soy una variable GLOBAL";

function demostrarAmbitoLocal() {
  // ÁMBITO LOCAL: Esta variable vive y muere dentro de esta función
  const mensajeLocal = "Soy una variable LOCAL";
  console.log(mensajeLocal); // Correcto: visible aquí
  console.log(mensajeGlobal); // Correcto: asciende en la cadena de ámbitos
}

// Fuera de la función:
// console.log(mensajeLocal); // Lanza ReferenceError: mensajeLocal is not defined
```
> **Explicación didáctica:** En JavaScript, los ámbitos hijos pueden acceder a las variables de sus padres (ascendiendo por la cadena de ámbitos), pero los ámbitos padres **nunca** pueden ver hacia el interior de sus hijos. Esto garantiza la privacidad y la no colisión de datos.

## Retos Adicionales
1. **Ámbito de bloque (`let` vs `var`):** Agrega una prueba dentro de una estructura de control `if (true) { let bloque = 1; var noBloque = 2; }` y verifica por qué `var` se escapa del bloque pero `let` no.
2. **Contador encapsulado (Closure):** Crea una función `crearContador()` que devuelva una función interna que incremente una variable local, demostrando la retención de ámbito léxico.
3. **Modificación de variable global:** Experimenta qué ocurre si una función modifica directamente una variable global `let contadorGlobal = 0` y cómo afecta al resto del programa.
