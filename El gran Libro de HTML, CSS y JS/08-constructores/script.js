"use strict";

/**
 * ============================================================================
 * EJERCICIO 08: Funciones Constructoras y el Operador 'new'
 * Módulo 6.3 - Objetos
 * ============================================================================
 * Objetivo: Comprender las funciones constructoras en JavaScript tradicional
 * (previo a las clases ES6), aprendiendo a definir un molde reusable y cómo
 * el operador `new` orquesta la creación y vinculación de nuevas instancias.
 */

// ============================================================================
// 1. DEFINICIÓN DE LA FUNCIÓN CONSTRUCTORA
// ============================================================================

/**
 * Función constructora para crear entidades de tipo Persona.
 * Por convención didáctica y comunitaria, las funciones constructoras inician con Mayúscula.
 * 
 * @param {string} nombre - Nombre completo.
 * @param {number} edad - Edad en años.
 * @param {string} profesion - Ocupación laboral o profesión.
 */
function Persona(nombre, edad, profesion) {
  // Inicialización de propiedades propias de cada instancia mediante 'this'
  this.nombre = nombre;
  this.edad = Number(edad);
  this.profesion = profesion;
  this.fechaRegistro = new Date();
}

/**
 * Definición de método en el PROTOTIPO de Persona.
 * Buena práctica: definir métodos en el prototipo evita duplicar la función
 * en la memoria de cada objeto individual instanciado.
 * 
 * @returns {string} Saludo personalizado de la persona.
 */
Persona.prototype.presentarse = function () {
  return `¡Hola! Soy ${this.nombre}, tengo ${this.edad} años y trabajo como ${this.profesion}.`;
};

// ============================================================================
// 2. CREACIÓN DE LAS 3 INSTANCIAS INICIALES REQUERIDAS
// ============================================================================
// Cada llamada con 'new' crea un objeto único con su propia copia de datos
const persona1 = new Persona("Sofía Ramos", 28, "Ingeniera de Software");
const persona2 = new Persona("Mateo Fernández", 34, "Diseñador UX/UI");
const persona3 = new Persona("Elena Gómez", 42, "Arquitecta Cloud");

// Arreglo para gestionar y renderizar todas las instancias en la interfaz
const listaPersonas = [persona1, persona2, persona3];

// ============================================================================
// 3. REFERENCIAS AL DOM Y RENDERIZADO
// ============================================================================
const contenedorInstancias = document.getElementById("contenedorInstancias");
const formNuevaPersona = document.getElementById("formNuevaPersona");
const inputNombre = document.getElementById("inputNombre");
const inputEdad = document.getElementById("inputEdad");
const inputProfesion = document.getElementById("inputProfesion");

/**
 * Renderiza la lista de instancias de Persona en tarjetas interactivas del DOM.
 */
function renderizarInstancias() {
  contenedorInstancias.innerHTML = "";

  listaPersonas.forEach((persona, indice) => {
    const card = document.createElement("article");
    card.className = "person-card";

    // Contenedor de información textual
    const infoDiv = document.createElement("div");

    const header = document.createElement("div");
    header.className = "person-header";
    header.textContent = `${indice + 1}. ${persona.nombre}`;

    const meta = document.createElement("div");
    meta.className = "person-meta";
    meta.textContent = `${persona.edad} años · ${persona.profesion}`;

    infoDiv.appendChild(header);
    infoDiv.appendChild(meta);

    // Botón para ejecutar el método de prototipo .presentarse()
    const btnSaludar = document.createElement("button");
    btnSaludar.className = "btn-saludar-card";
    btnSaludar.type = "button";
    btnSaludar.textContent = "Ejecutar .presentarse()";

    btnSaludar.addEventListener("click", () => {
      const saludo = persona.presentarse();
      alert(saludo);
      console.log(`[Método Prototípico]: ${saludo}`);
    });

    card.appendChild(infoDiv);
    card.appendChild(btnSaludar);
    contenedorInstancias.appendChild(card);
  });
}

// ============================================================================
// 4. MANEJO DE EVENTOS
// ============================================================================
// Permitir al usuario crear dinámicamente nuevas instancias mediante el formulario
formNuevaPersona.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = inputNombre.value.trim();
  const edad = parseInt(inputEdad.value, 10);
  const profesion = inputProfesion.value.trim();

  if (nombre && !isNaN(edad) && profesion) {
    // Instanciación dinámica con el operador 'new'
    const nuevaPersona = new Persona(nombre, edad, profesion);
    listaPersonas.push(nuevaPersona);

    renderizarInstancias();
    formNuevaPersona.reset();
    inputNombre.focus();

    console.log("[Nueva instancia creada con 'new']:", nuevaPersona);
  }
});

// ============================================================================
// 5. EJECUCIÓN INICIAL
// ============================================================================
// Renderizar las 3 instancias iniciales solicitadas
renderizarInstancias();

// Registro educativo en consola comprobando la herencia prototípica con instanceof
console.log("persona1 instanceof Persona:", persona1 instanceof Persona); // true
console.log("¿Comparte el mismo prototipo que persona2?", Object.getPrototypeOf(persona1) === Object.getPrototypeOf(persona2)); // true
