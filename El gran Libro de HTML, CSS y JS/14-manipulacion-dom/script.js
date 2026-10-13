"use strict";

/**
 * ============================================================================
 * EJERCICIO 14: Manipulación del DOM (Document Object Model)
 * Módulo 6.5 - DOM y Eventos
 * ============================================================================
 * Objetivo: Aprender a seleccionar nodos del documento con `getElementById`,
 * modificar su contenido textual (`textContent`), alterar propiedades de estilo
 * en línea (`style.color`, `style.fontSize`), manipular clases CSS con `classList`
 * y escuchar eventos mediante `addEventListener`.
 */

// ============================================================================
// 1. TEXTOS CONSTANTES Y ELEMENTOS DEL DOM
// ============================================================================
const TEXTO_ORIGINAL = "Texto original inicial: Este párrafo es un nodo del DOM a la espera de ser manipulado mediante JavaScript.";
const TEXTO_MODIFICADO = "¡El DOM ha sido transformado con éxito! JavaScript tiene el poder de alterar el contenido, la estructura y los estilos en tiempo real.";

// Referencias a los elementos del DOM
const parrafoObjetivo = document.getElementById("parrafoObjetivo");
const escenarioObjetivo = document.getElementById("escenarioObjetivo");
const registroDom = document.getElementById("registroDom");

// Botones de contenido
const btnCambiarTexto = document.getElementById("btnCambiarTexto");
const btnRestaurarTexto = document.getElementById("btnRestaurarTexto");

// Botones de colores
const btnAzul = document.getElementById("btnAzul");
const btnVerde = document.getElementById("btnVerde");
const btnRojo = document.getElementById("btnRojo");
const btnPurpura = document.getElementById("btnPurpura");

// Botones de clases y estilos
const btnResaltar = document.getElementById("btnResaltar");
const btnNegrita = document.getElementById("btnNegrita");
const btnAumentar = document.getElementById("btnAumentar");
const btnReducir = document.getElementById("btnReducir");

// Estado del tamaño de fuente en píxeles
let tamanoFuenteActual = 18;

// ============================================================================
// 2. FUNCIONES DE MANIPULACIÓN DEL DOM
// ============================================================================

/**
 * Actualiza la consola visual inferior describiendo la operación del DOM ejecutada.
 * 
 * @param {string} operacion - Nombre del método o asignación DOM.
 * @param {string} detalle - Explicación pedagógica.
 */
function registrarOperacion(operacion, detalle) {
  registroDom.innerHTML = `> <code>${operacion}</code>: <span style="color: #38bdf8;">${detalle}</span>`;
  console.log(`[DOM API]: ${operacion} -> ${detalle}`);
}

/**
 * Modifica el texto interior del nodo párrafo usando 'textContent'.
 * Buena práctica: preferir 'textContent' sobre 'innerHTML' cuando no se inserta HTML,
 * para prevenir vulnerabilidades de Cross-Site Scripting (XSS).
 */
function cambiarTextoParrafo() {
  parrafoObjetivo.textContent = TEXTO_MODIFICADO;
  registrarOperacion("parrafoObjetivo.textContent = ...", "Texto cambiado dinámicamente.");
}

/**
 * Restaura el texto a su estado inicial.
 */
function restaurarTextoParrafo() {
  parrafoObjetivo.textContent = TEXTO_ORIGINAL;
  registrarOperacion("parrafoObjetivo.textContent = TEXTO_ORIGINAL", "Texto restablecido.");
}

/**
 * Cambia el color del texto mediante la propiedad de estilo en línea 'style.color'.
 * 
 * @param {string} colorHex - Código hexadecimal del color.
 * @param {string} nombreColor - Nombre legible para el log.
 */
function aplicarColor(colorHex, nombreColor) {
  parrafoObjetivo.style.color = colorHex;
  registrarOperacion(`parrafoObjetivo.style.color = "${colorHex}"`, `Color del texto cambiado a ${nombreColor}.`);
}

/**
 * Alterna una clase CSS en el contenedor del escenario utilizando 'classList.toggle'.
 */
function alternarResaltado() {
  const activo = escenarioObjetivo.classList.toggle("highlight-box");
  registrarOperacion("escenarioObjetivo.classList.toggle('highlight-box')", activo ? "Clase de resaltado añadida." : "Clase de resaltado retirada.");
}

/**
 * Alterna la clase de negrita en el párrafo.
 */
function alternarNegrita() {
  const activo = parrafoObjetivo.classList.toggle("font-bold");
  registrarOperacion("parrafoObjetivo.classList.toggle('font-bold')", activo ? "Negrita aplicada con classList." : "Negrita retirada.");
}

/**
 * Ajusta dinámicamente el tamaño de la fuente.
 * 
 * @param {number} delta - Variación en píxeles (+2 o -2).
 */
function cambiarTamanoFuente(delta) {
  tamanoFuenteActual = Math.max(12, Math.min(tamanoFuenteActual + delta, 30));
  parrafoObjetivo.style.fontSize = `${tamanoFuenteActual}px`;
  registrarOperacion(`parrafoObjetivo.style.fontSize = "${tamanoFuenteActual}px"`, `Tamaño ajustado a ${tamanoFuenteActual}px.`);
}

// ============================================================================
// 3. ASIGNACIÓN DE EVENTOS CON addEventListener
// ============================================================================

// Eventos de modificación de texto
btnCambiarTexto.addEventListener("click", cambiarTextoParrafo);
btnRestaurarTexto.addEventListener("click", restaurarTextoParrafo);

// Eventos de colores usando la función genérica aplicarColor
btnAzul.addEventListener("click", () => aplicarColor("#2563eb", "Azul"));
btnVerde.addEventListener("click", () => aplicarColor("#059669", "Verde"));
btnRojo.addEventListener("click", () => aplicarColor("#dc2626", "Rojo"));
btnPurpura.addEventListener("click", () => aplicarColor("#9333ea", "Púrpura"));

// Eventos de clases CSS
btnResaltar.addEventListener("click", alternarResaltado);
btnNegrita.addEventListener("click", alternarNegrita);

// Eventos de tamaño de fuente
btnAumentar.addEventListener("click", () => cambiarTamanoFuente(2));
btnReducir.addEventListener("click", () => cambiarTamanoFuente(-2));
