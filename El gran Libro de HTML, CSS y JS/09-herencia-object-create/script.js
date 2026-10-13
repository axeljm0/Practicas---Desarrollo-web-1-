"use strict";

/**
 * ============================================================================
 * EJERCICIO 09: Herencia Prototípica con Object.create()
 * Módulo 6.3 - Objetos
 * ============================================================================
 * Objetivo: Estudiar el mecanismo nativo de herencia prototípica en JavaScript
 * usando `Object.create()`, vinculando directamente un objeto hijo a su objeto
 * prototipo padre sin necesidad de constructores clásicos.
 */

// ============================================================================
// 1. DEFINICIÓN DEL OBJETO BASE (PROTOTIPO PADRE)
// ============================================================================
const animal = {
  esSerVivo: true,
  tipo: "Animal genérico",

  hacerSonido: function () {
    return `${this.nombre || "El animal"} emite un sonido biológico estándar.`;
  },

  dormir: function () {
    return `${this.nombre || "El animal"} está descansando plácidamente... Zzz.`;
  }
};

// ============================================================================
// 2. CREACIÓN DEL OBJETO DERIVADO MEDIANTE Object.create()
// ============================================================================
// 'perro' nace con su enlace interno [[Prototype]] apuntando a 'animal'
const perro = Object.create(animal);

// Asignación de propiedades PROPIAS (own properties) del objeto derivado
perro.tipo = "Canino";
perro.nombre = "Firulais";
perro.raza = "Golden Retriever";

// Asignación de método PROPIO de perro
perro.ladrar = function () {
  return `¡Guau! ¡Guau! (Dice ${this.nombre} moviendo la cola).`;
};

// Sobrescritura (override) del método 'hacerSonido' heredado de animal
perro.hacerSonido = function () {
  return `${this.nombre} ladra con entusiasmo canino.`;
};

// ============================================================================
// 3. REFERENCIAS AL DOM Y MANEJO DE EVENTOS
// ============================================================================
const pantallaSalida = document.getElementById("pantallaSalida");
const btnLadrar = document.getElementById("btnLadrar");
const btnDormir = document.getElementById("btnDormir");
const btnSonido = document.getElementById("btnSonido");
const btnInspeccionar = document.getElementById("btnInspeccionar");

/**
 * Muestra el resultado de una acción en la terminal visual de la página.
 * 
 * @param {string} texto - Mensaje a desplegar.
 */
function mostrarEnPantalla(texto) {
  pantallaSalida.innerHTML = texto;
}

// 1. Ejecución de método propio
btnLadrar.addEventListener("click", () => {
  const mensaje = perro.ladrar();
  mostrarEnPantalla(`> [Método Propio perro.ladrar()]:<br><strong style="color: #38bdf8;">${mensaje}</strong>`);
  console.log("[perro.ladrar()]:", mensaje);
});

// 2. Ejecución de método heredado del prototipo 'animal'
btnDormir.addEventListener("click", () => {
  // Nota didáctica: 'dormir' no está en 'perro', JavaScript sube en la cadena y lo halla en 'animal'
  const mensaje = perro.dormir();
  mostrarEnPantalla(`> [Método Heredado animal.dormir()]:<br><strong style="color: #4ade80;">${mensaje}</strong><br><small style="color: #94a3b8;">(El método fue encontrado en el prototipo 'animal', pero 'this.nombre' resolvió a '${perro.nombre}')</small>`);
  console.log("[perro.dormir() - heredado]:", mensaje);
});

// 3. Ejecución de método sobrescrito
btnSonido.addEventListener("click", () => {
  const mensaje = perro.hacerSonido();
  mostrarEnPantalla(`> [Método Sobrescrito perro.hacerSonido()]:<br><strong style="color: #facc15;">${mensaje}</strong><br><small style="color: #94a3b8;">(Se ejecutó la versión de 'perro', ocultando la versión genérica de 'animal')</small>`);
  console.log("[perro.hacerSonido() - override]:", mensaje);
});

// 4. Diagnóstico e inspección de la cadena de prototipos
btnInspeccionar.addEventListener("click", () => {
  const tieneNombrePropio = Object.prototype.hasOwnProperty.call(perro, "nombre");
  const tieneDormirPropio = Object.prototype.hasOwnProperty.call(perro, "dormir");
  const prototipoDePerro = Object.getPrototypeOf(perro);
  const esHijoDeAnimal = prototipoDePerro === animal;

  const reporte = `
    > [Diagnóstico de la Cadena Prototípica]:<br>
    • ¿'nombre' es propiedad PROPIA de perro?: <span style="color: #4ade80;">${tieneNombrePropio}</span><br>
    • ¿'dormir' es propiedad PROPIA de perro?: <span style="color: #f87171;">${tieneDormirPropio} (Viene de animal)</span><br>
    • ¿Object.getPrototypeOf(perro) === animal?: <span style="color: #4ade80;">${esHijoDeAnimal}</span><br>
    • perro.esSerVivo (heredado sin definir en perro): <span style="color: #38bdf8;">${perro.esSerVivo}</span>
  `;

  mostrarEnPantalla(reporte);
  console.log("Prototipo de perro:", prototipoDePerro);
});
