"use strict";

/**
 * ============================================================================
 * EJERCICIO 03: Ámbito de Variables (Global vs Local)
 * Módulo 6.2 - Funciones
 * ============================================================================
 * Objetivo: Demostrar las fronteras de visibilidad y ciclo de vida de las
 * variables en JavaScript: el ámbito global (accesible en cualquier lugar)
 * frente al ámbito local/funcional (restringido a la función donde se declara).
 */

// ============================================================================
// 1. DECLARACIÓN DE VARIABLES GLOBALES Y ELEMENTOS DEL DOM
// ============================================================================
// Esta variable vive en el ÁMBITO GLOBAL. Está disponible para cualquier función.
const mensajeGlobal = "Soy una variable GLOBAL: accesible en cualquier rincón del script.";

// Variable global que luego será "sombreada" (shadowed) en una función
const usuarioActivo = "Ana (Global)";

// Elementos de la interfaz
const pantallaConsola = document.getElementById("pantallaConsola");
const btnProbarGlobal = document.getElementById("btnProbarGlobal");
const btnProbarLocalDentro = document.getElementById("btnProbarLocalDentro");
const btnProbarLocalFuera = document.getElementById("btnProbarLocalFuera");
const btnProbarSombreado = document.getElementById("btnProbarSombreado");
const btnLimpiarLogs = document.getElementById("btnLimpiarLogs");

// ============================================================================
// 2. FUNCIONES DE RENDERIZADO EN PANTALLA
// ============================================================================

/**
 * Imprime un mensaje con formato y color en la consola visual del DOM.
 * 
 * @param {string} texto - Mensaje a mostrar.
 * @param {"info" | "success" | "warning" | "error"} tipo - Categoría visual.
 */
function registrarLog(texto, tipo = "info") {
  const entrada = document.createElement("div");
  entrada.className = `log-entry ${tipo}`;
  entrada.textContent = `> ${texto}`;
  pantallaConsola.appendChild(entrada);
  pantallaConsola.scrollTop = pantallaConsola.scrollHeight;
}

// ============================================================================
// 3. FUNCIONES DEMOSTRATIVAS DE ÁMBITO (SCOPE)
// ============================================================================

/**
 * Demuestra la lectura de una variable global tanto fuera como dentro de una función.
 */
function probarAccesoGlobal() {
  registrarLog("Iniciando prueba de variable global...", "info");
  registrarLog(`Lectura directa de 'mensajeGlobal': "${mensajeGlobal}"`, "success");
  
  function funcionInterna() {
    // La función interna busca la variable en su propio ámbito; al no encontrarla,
    // sube en la cadena de ámbitos (scope chain) hasta encontrar la global.
    registrarLog(`Lectura anidada dentro de funcionInterna(): "${mensajeGlobal}"`, "success");
  }
  
  funcionInterna();
}

/**
 * Declara y lee una variable en ámbito local (funcional).
 */
function demostrarAmbitoLocal() {
  // Esta variable solo existe mientras esta función se esté ejecutando en la pila.
  const mensajeLocal = "Soy una variable LOCAL: existo solo dentro de demostrarAmbitoLocal().";
  registrarLog("Dentro de la función: variable 'mensajeLocal' creada exitosamente.", "info");
  registrarLog(`Valor leído desde dentro: "${mensajeLocal}"`, "success");
}

/**
 * Intenta acceder intencionalmente a una variable local desde el ámbito exterior.
 * Esto ilustra por qué JavaScript lanza un ReferenceError.
 */
function intentarAccesoInvalido() {
  registrarLog("Intentando leer 'mensajeLocal' desde fuera de su función contenedora...", "warning");
  
  try {
    // Nota didáctica: 'mensajeLocal' no fue declarada en este ámbito.
    // 'eval' se usa aquí exclusivamente con fines didácticos controlados para simular
    // el intento de acceso estático sin romper la compilación general del archivo.
    eval("mensajeLocal");
  } catch (error) {
    registrarLog(`¡Capturado ReferenceError esperado!: "${error.message}"`, "error");
    registrarLog("Explicación: Las variables locales son destruidas al terminar la función y son invisibles al exterior.", "warning");
  }
}

/**
 * Demuestra el fenómeno de 'Variable Shadowing' (sombreado de variables).
 * Ocurre cuando una variable local tiene el mismo identificador que una global.
 */
function demostrarSombreado() {
  registrarLog(`1. Antes de entrar a la función sombra, 'usuarioActivo' vale: "${usuarioActivo}"`, "info");
  
  function funcionConSombra() {
    // Al declarar otra variable con el mismo nombre 'usuarioActivo' aquí dentro,
    // se oculta la global temporalmente durante la ejecución de esta función.
    const usuarioActivo = "Carlos (Local Sombreado)";
    registrarLog(`2. Dentro de funcionConSombra(), 'usuarioActivo' vale: "${usuarioActivo}"`, "warning");
  }

  funcionConSombra();
  registrarLog(`3. Al salir de la función, la global permanece intacta: "${usuarioActivo}"`, "success");
}

// ============================================================================
// 4. EJECUCIÓN INICIAL Y REGISTRO DE EVENTOS
// ============================================================================
// Mensaje de bienvenida inicial en la consola visual
registrarLog("Sistema de inspección de ámbitos cargado. Haz clic en los botones para iniciar las pruebas.", "info");

// Configuración de escuchadores con addEventListener
btnProbarGlobal.addEventListener("click", probarAccesoGlobal);
btnProbarLocalDentro.addEventListener("click", demostrarAmbitoLocal);
btnProbarLocalFuera.addEventListener("click", intentarAccesoInvalido);
btnProbarSombreado.addEventListener("click", demostrarSombreado);

btnLimpiarLogs.addEventListener("click", () => {
  pantallaConsola.innerHTML = "";
  registrarLog("Consola reiniciada.", "info");
});
