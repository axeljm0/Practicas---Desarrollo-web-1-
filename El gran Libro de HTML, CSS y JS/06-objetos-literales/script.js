"use strict";

/**
 * ============================================================================
 * EJERCICIO 06: Objetos Literales
 * Módulo 6.3 - Objetos
 * ============================================================================
 * Objetivo: Comprender la creación y manipulación de estructuras de datos
 * basadas en objetos literales, utilizando la sintaxis de llaves `{}` con pares
 * clave: valor, y el acceso a sus miembros mediante notación de punto y corchetes.
 */

// ============================================================================
// 1. DEFINICIÓN DEL OBJETO LITERAL
// ============================================================================
// Objeto que representa un libro con diferentes tipos de datos (string, number, boolean)
const libro = {
  titulo: "Cien años de soledad",
  autor: "Gabriel García Márquez",
  anioPublicacion: 1967,
  paginas: 471,
  genero: "Realismo mágico",
  disponible: true
};

// ============================================================================
// 2. REFERENCIAS AL DOM
// ============================================================================
const dispTitulo = document.getElementById("dispTitulo");
const dispAutor = document.getElementById("dispAutor");
const dispAnio = document.getElementById("dispAnio");
const dispPaginas = document.getElementById("dispPaginas");
const dispGenero = document.getElementById("dispGenero");
const dispDisponible = document.getElementById("dispDisponible");
const codigoJson = document.getElementById("codigoJson");
const btnAlternarDisponibilidad = document.getElementById("btnAlternarDisponibilidad");
const btnModificarAnio = document.getElementById("btnModificarAnio");

// ============================================================================
// 3. FUNCIONES DE ACTUALIZACIÓN Y RENDERIZADO
// ============================================================================

/**
 * Sincroniza el estado del objeto 'libro' con los elementos de la interfaz.
 * Demuestra intencionalmente ambas formas de acceso: punto y corchetes.
 */
function renderizarLibro() {
  // Acceso mediante NOTACIÓN DE PUNTO (dot notation)
  dispTitulo.textContent = libro.titulo;
  dispAutor.textContent = `Por ${libro.autor}`;
  dispAnio.textContent = libro.anioPublicacion;
  dispPaginas.textContent = `${libro.paginas} págs.`;

  // Acceso mediante NOTACIÓN DE CORCHETES (bracket notation)
  dispGenero.textContent = libro["genero"];
  const estaDisponible = libro["disponible"];

  if (estaDisponible) {
    dispDisponible.textContent = "Disponible";
    dispDisponible.className = "status-badge available";
  } else {
    dispDisponible.textContent = "Prestado";
    dispDisponible.className = "status-badge borrowed";
  }

  // Serializar el objeto en formato JSON con sangría para la inspección visual
  codigoJson.textContent = JSON.stringify(libro, null, 2);
}

/**
 * Modifica una propiedad booleana en el objeto en tiempo de ejecución.
 */
function alternarDisponibilidad() {
  libro.disponible = !libro.disponible;
  renderizarLibro();
  console.log(`[Disponibilidad actualizada]: libro.disponible = ${libro.disponible}`);
}

/**
 * Demuestra la mutabilidad de propiedades numéricas en un objeto.
 */
function actualizarEdicion() {
  // Incrementar año o consultar al usuario mediante prompt con fallback
  const nuevoAnio = prompt("Ingresa el nuevo año de edición:", libro.anioPublicacion);
  if (nuevoAnio !== null && !isNaN(Number(nuevoAnio))) {
    libro.anioPublicacion = parseInt(nuevoAnio, 10);
    renderizarLibro();
    console.log(`[Año actualizado]: libro.anioPublicacion = ${libro.anioPublicacion}`);
  }
}

// ============================================================================
// 4. EJECUCIÓN INICIAL Y CONFIGURACIÓN DE EVENTOS
// ============================================================================
// Mostrar los datos en pantalla
renderizarLibro();

// Registro de eventos mediante addEventListener
btnAlternarDisponibilidad.addEventListener("click", alternarDisponibilidad);
btnModificarAnio.addEventListener("click", actualizarEdicion);

// Registro educativo en la consola del desarrollador
console.log("Objeto libro instanciado:", libro);
console.log(`Acceso por punto: libro.titulo -> "${libro.titulo}"`);
console.log(`Acceso por corchetes: libro["autor"] -> "${libro["autor"]}"`);
