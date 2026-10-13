"use strict";

/**
 * ============================================================================
 * EJERCICIO 01: Funciones Básicas
 * Módulo 6.2 - Funciones
 * ============================================================================
 * Objetivo: Comprender la declaración estándar de funciones con la palabra
 * reservada `function`, el paso de parámetros, la ejecución del bloque de
 * código y la invocación múltiple reutilizando la misma lógica.
 */

// ============================================================================
// 1. DECLARACIÓN DE VARIABLES Y ELEMENTOS DEL DOM
// ============================================================================
const contenedorSaludos = document.getElementById("contenedorSaludos");
const inputNombre = document.getElementById("inputNombre");
const btnSaludar = document.getElementById("btnSaludar");

// Contador para numerar visualmente cada saludo emitido
let contadorSaludos = 0;

// ============================================================================
// 2. DEFINICIÓN DE FUNCIONES
// ============================================================================

/**
 * Función que recibe un nombre como parámetro y genera un saludo estructurado.
 * Retorna el mensaje de saludo como una cadena de texto.
 * 
 * @param {string} nombre - Nombre de la persona a saludar.
 * @returns {string} Mensaje de saludo formateado.
 */
function saludar(nombre) {
  // Validación básica del parámetro para evitar saludos vacíos
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    return "¡Hola, visitante anónimo! Bienvenido al curso de JavaScript.";
  }

  return `¡Hola, ${nombre.trim()}! Bienvenido al apasionante mundo de JavaScript.`;
}

/**
 * Función encargada de insertar visualmente el saludo en el DOM.
 * Crea una tarjeta HTML accesible y dinámica en lugar de usar alert().
 * 
 * @param {string} mensaje - Texto del saludo que se va a mostrar.
 */
function mostrarSaludoEnPantalla(mensaje) {
  contadorSaludos++;

  // Crear el elemento contenedor de la tarjeta
  const tarjeta = document.createElement("article");
  tarjeta.className = "greeting-card";

  // Crear el indicador numérico del saludo
  const spanIndice = document.createElement("span");
  spanIndice.className = "greeting-index";
  spanIndice.textContent = `#${contadorSaludos}`;

  // Crear el texto del mensaje
  const spanTexto = document.createElement("span");
  spanTexto.className = "greeting-text";
  spanTexto.textContent = mensaje;

  // Insertar elementos en la tarjeta y luego al DOM
  tarjeta.appendChild(spanIndice);
  tarjeta.appendChild(spanTexto);
  contenedorSaludos.appendChild(tarjeta);
}

/**
 * Función auxiliar para coordinar la llamada a la función `saludar` y su renderizado.
 * 
 * @param {string} nombre - Nombre a enviar a la función saludar.
 */
function ejecutarSaludo(nombre) {
  const mensajeGenerado = saludar(nombre);
  mostrarSaludoEnPantalla(mensajeGenerado);
  console.log(`[Registro de saludo]: ${mensajeGenerado}`);
}

// ============================================================================
// 3. EJECUCIÓN INICIAL REQUERIDA (LLAMADA A SALUDAR 3 VECES)
// ============================================================================
// Se realizan 3 invocaciones iniciales con diferentes argumentos tal como
// lo solicita el manual para demostrar la reutilización de código.
ejecutarSaludo("Ana García");
ejecutarSaludo("Carlos Mendoza");
ejecutarSaludo("Lucía Morales");

// ============================================================================
// 4. MANEJO DE EVENTOS INTERACTIVOS (addEventListener)
// ============================================================================
// Permite que el estudiante o usuario agregue sus propios saludos desde la interfaz.
btnSaludar.addEventListener("click", () => {
  const nombreIngresado = inputNombre.value;
  ejecutarSaludo(nombreIngresado);

  // Limpiar el campo y devolver el foco para mejorar la experiencia de usuario
  inputNombre.value = "";
  inputNombre.focus();
});

// Permitir también enviar con la tecla Enter
inputNombre.addEventListener("keyup", (evento) => {
  if (evento.key === "Enter") {
    btnSaludar.click();
  }
});
