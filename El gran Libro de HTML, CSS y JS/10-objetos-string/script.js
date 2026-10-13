"use strict";

/**
 * ============================================================================
 * EJERCICIO 10: Objeto Estándar String
 * Módulo 6.4 - Objetos Estándar
 * ============================================================================
 * Objetivo: Conocer las propiedades y métodos más utilizados del envoltorio
 * primitivo `String` en JavaScript, realizando 5 operaciones de inspección,
 * transformación, búsqueda y segmentación de texto.
 */

// ============================================================================
// 1. TEXTO INICIAL REQUERIDO Y ELEMENTOS DEL DOM
// ============================================================================
const textoInicial = "JavaScript es genial";

const dispCadena = document.getElementById("dispCadena");
const inputCustomTexto = document.getElementById("inputCustomTexto");
const btnProcesar = document.getElementById("btnProcesar");

const resLongitud = document.getElementById("resLongitud");
const resMayusMinus = document.getElementById("resMayusMinus");
const resBusqueda = document.getElementById("resBusqueda");
const resExtraccion = document.getElementById("resExtraccion");
const resSplit = document.getElementById("resSplit");

// ============================================================================
// 2. FUNCIÓN CON LAS 5 OPERACIONES DIDÁCTICAS SOBRE STRING
// ============================================================================

/**
 * Ejecuta las 5 operaciones fundamentales sobre la cadena especificada
 * y plasma los resultados en los contenedores del DOM.
 * 
 * @param {string} texto - Cadena a analizar.
 */
function procesarOperacionesString(texto) {
  dispCadena.textContent = `"${texto}"`;

  // --------------------------------------------------------------------------
  // OPERACIÓN 1: Medir la longitud total de la cadena (.length)
  // --------------------------------------------------------------------------
  const longitud = texto.length;
  resLongitud.textContent = `${longitud} caracteres (incluye espacios)`;

  // --------------------------------------------------------------------------
  // OPERACIÓN 2: Transformación de mayúsculas y minúsculas
  // --------------------------------------------------------------------------
  const enMayusculas = texto.toUpperCase();
  const enMinusculas = texto.toLowerCase();
  resMayusMinus.innerHTML = `
    <strong>Mayúsculas:</strong> "${enMayusculas}"<br>
    <strong>Minúsculas:</strong> "${enMinusculas}"
  `;

  // --------------------------------------------------------------------------
  // OPERACIÓN 3: Búsqueda e inclusión de subcadenas
  // --------------------------------------------------------------------------
  const contieneGenial = texto.includes("genial");
  const indiceEs = texto.indexOf("es");
  resBusqueda.innerHTML = `
    ¿Contiene "genial"?: <strong>${contieneGenial ? "Sí (true)" : "No (false)"}</strong><br>
    Posición (índice) de "es": <strong>${indiceEs !== -1 ? `Índice ${indiceEs}` : "No encontrado (-1)"}</strong>
  `;

  // --------------------------------------------------------------------------
  // OPERACIÓN 4: Extracción con .slice() y reemplazo con .replace()
  // --------------------------------------------------------------------------
  // Extraer los primeros 10 caracteres (del índice 0 al 10 sin incluir el 10)
  const primeraPalabra = texto.slice(0, 10);
  const textoModificado = texto.replace("genial", "increíble");
  resExtraccion.innerHTML = `
    <strong>slice(0, 10):</strong> "${primeraPalabra}"<br>
    <strong>replace("genial", "increíble"):</strong> "${textoModificado}"
  `;

  // --------------------------------------------------------------------------
  // OPERACIÓN 5: Segmentación / división en un Array de palabras (.split)
  // --------------------------------------------------------------------------
  const arregloPalabras = texto.split(" ");
  resSplit.innerHTML = `
    <strong>Palabras detectadas (${arregloPalabras.length}):</strong> [${arregloPalabras.map((p) => `"${p}"`).join(", ")}]
  `;

  // Registro pedagógico en consola
  console.log("=== ANÁLISIS DE CADENA ===");
  console.log("Original:", texto);
  console.log("1. Length:", longitud);
  console.log("2. Upper:", enMayusculas, "| Lower:", enMinusculas);
  console.log("3. Includes('genial'):", contieneGenial, "| IndexOf('es'):", indiceEs);
  console.log("4. Slice(0,10):", primeraPalabra, "| Replace:", textoModificado);
  console.log("5. Split(' '):", arregloPalabras);
}

// ============================================================================
// 3. EJECUCIÓN INICIAL Y MANEJO DE EVENTOS
// ============================================================================
// Análisis inicial con la cadena "JavaScript es genial" solicitada
procesarOperacionesString(textoInicial);

// Permitir analizar textos personalizados
btnProcesar.addEventListener("click", () => {
  const valorIngresado = inputCustomTexto.value.trim();
  if (valorIngresado) {
    procesarOperacionesString(valorIngresado);
  } else {
    procesarOperacionesString(textoInicial);
  }
});

inputCustomTexto.addEventListener("keyup", (evento) => {
  if (evento.key === "Enter") {
    btnProcesar.click();
  }
});
