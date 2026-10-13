# Ejercicio 01: Funciones Básicas

## Objetivo
Aprender a declarar y utilizar funciones tradicionales en JavaScript utilizando la palabra reservada `function`, comprender cómo se definen los parámetros, cómo se pasan los argumentos en la llamada y comprobar la capacidad de reutilizar un mismo bloque de código múltiples veces.

## Conceptos Aplicados
- Declaración de funciones (`function nombreFuncion(parametro) { ... }`).
- Parámetros vs Argumentos.
- Ámbito funcional y valor de retorno (`return`).
- Invocación y reutilización de funciones.
- Manipulación básica del DOM con `createElement`, `appendChild` y `addEventListener`.
- Modo estricto (`"use strict";`).

## Instrucciones
1. Abre el archivo `index.html` directamente en tu navegador web favorito (Google Chrome, Firefox, Edge, Safari) haciendo doble clic o usando una extensión como *Live Server* en tu editor de código.
2. Observarás que al cargar la página se muestran automáticamente tres saludos iniciales ejecutados por JavaScript.
3. Escribe un nuevo nombre en el campo de texto y haz clic en el botón **Saludar** (o presiona la tecla `Enter`) para emitir un nuevo saludo dinámico.

## Captura / Resultado Esperado
Al abrir la página verás:
- Un encabezado indicando el módulo y ejercicio actual.
- Un formulario con un campo de texto y un botón azul **Saludar**.
- Un panel gris claro con el título **Registro de Saludos en Pantalla** conteniendo tres tarjetas con los saludos iniciales:
  1. `#1 ¡Hola, Ana García! Bienvenido al apasionante mundo de JavaScript.`
  2. `#2 ¡Hola, Carlos Mendoza! Bienvenido al apasionante mundo de JavaScript.`
  3. `#3 ¡Hola, Lucía Morales! Bienvenido al apasionante mundo de JavaScript.`
- Nuevas tarjetas añadidas correlativamente cuando se interactúa con el formulario.

## Código Clave Explicado
```javascript
// Declaración formal de la función con un parámetro 'nombre'
function saludar(nombre) {
  // Validación básica del parámetro recibido
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    return "¡Hola, visitante anónimo! Bienvenido al curso de JavaScript.";
  }

  // Retorna una plantilla literal con el saludo personalizado
  return `¡Hola, ${nombre.trim()}! Bienvenido al apasionante mundo de JavaScript.`;
}

// Invocación múltiple pasando diferentes argumentos
ejecutarSaludo("Ana García");
ejecutarSaludo("Carlos Mendoza");
ejecutarSaludo("Lucía Morales");
```
> **Explicación didáctica:** Una función actúa como una receta o plantilla. El parámetro `nombre` funciona como una variable temporal que tomará el valor del argumento real pasado al invocarla (`"Ana García"`, `"Carlos Mendoza"`, etc.).

## Retos Adicionales
1. **Parámetro de hora/momento del día:** Modifica la función `saludar` para que reciba un segundo parámetro opcional `momentoDelDia` (por ejemplo: "mañana", "tarde", "noche") y devuelva "Buenos días", "Buenas tardes" o "Buenas noches".
2. **Botón para limpiar el registro:** Agrega un botón en el HTML llamado "Limpiar saludos" y escribe un escuchador de evento que elimine todas las tarjetas de la pantalla y reinicie el contador.
3. **Validación con feedback visual:** Si el usuario presiona "Saludar" con el campo vacío, haz que el borde del input se pinte de color rojo por 2 segundos indicando que el campo es requerido.
