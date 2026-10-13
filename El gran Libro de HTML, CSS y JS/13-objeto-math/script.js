"use strict";

/**
 * ============================================================================
 * EJERCICIO 13: Objeto Estándar Math
 * Módulo 6.4 - Objetos Estándar
 * ============================================================================
 * Objetivo: Estudiar el objeto integrado `Math`, un objeto estático provisto
 * por JavaScript que reúne constantes matemáticas universales (PI, E) y
 * métodos para cálculos numéricos, trigonometría, potencias y números aleatorios.
 */

// ============================================================================
// 1. REFERENCIAS A ELEMENTOS DEL DOM
// ============================================================================
const numAleatorio = document.getElementById("numAleatorio");
const btnGenerarRandom = document.getElementById("btnGenerarRandom");

const resSqrt = document.getElementById("resSqrt");
const resPow = document.getElementById("resPow");
const resPow3 = document.getElementById("resPow3");
const resPi = document.getElementById("resPi");

const numDividido = document.getElementById("numDividido");
const resFloor = document.getElementById("resFloor");
const resCeil = document.getElementById("resCeil");
const resRound = document.getElementById("resRound");

// ============================================================================
// 2. FUNCIONES MATEMÁTICAS CON EL OBJETO Math
// ============================================================================

/**
 * Genera un número entero pseudoaleatorio inclusivo entre min y max.
 * Utiliza Math.random() (rango [0, 1)) combinado con Math.floor.
 * 
 * @param {number} min - Límite inferior (ej: 1).
 * @param {number} max - Límite superior (ej: 100).
 * @returns {number} Entero aleatorio en el rango [min, max].
 */
function generarEnteroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Realiza los cálculos solicitados sobre el número N y actualiza la pantalla.
 * 
 * @param {number} n - Número entero base.
 */
function procesarCalculosMath(n) {
  // 1. Visualizar número aleatorio central
  numAleatorio.textContent = n;

  // 2. Raíz cuadrada con Math.sqrt()
  const raiz = Math.sqrt(n);
  resSqrt.textContent = raiz % 1 === 0 ? raiz : raiz.toFixed(4);

  // 3. Potencias con Math.pow()
  const alCuadrado = Math.pow(n, 2);
  const alCubo = Math.pow(n, 3);
  resPow.textContent = alCuadrado.toLocaleString("es-ES");
  resPow3.textContent = alCubo.toLocaleString("es-ES");

  // 4. Operación con constante Math.PI
  const multiplicacionPi = (Math.PI * n).toFixed(4);
  resPi.textContent = multiplicacionPi;

  // 5. Comparativa de redondeos sobre una división no exacta (n / 3)
  const division = n / 3;
  numDividido.textContent = division.toFixed(4);

  // Math.floor: mayor entero menor o igual
  resFloor.textContent = `${Math.floor(division)} (piso)`;

  // Math.ceil: menor entero mayor o igual
  resCeil.textContent = `${Math.ceil(division)} (techo)`;

  // Math.round: redondeo aritmético al más cercano (>= .5 hacia arriba)
  resRound.textContent = `${Math.round(division)} (redondeo estándar)`;

  console.log(`=== OBJETO MATH: N = ${n} ===`);
  console.log(`Math.sqrt(${n}) = ${raiz}`);
  console.log(`Math.pow(${n}, 2) = ${alCuadrado}`);
  console.log(`Math.floor(${division.toFixed(2)}) = ${Math.floor(division)}`);
  console.log(`Math.ceil(${division.toFixed(2)}) = ${Math.ceil(division)}`);
  console.log(`Math.round(${division.toFixed(2)}) = ${Math.round(division)}`);
}

// ============================================================================
// 3. EJECUCIÓN INICIAL Y CONFIGURACIÓN DE EVENTOS
// ============================================================================
// Generar un primer valor al cargar la página
procesarCalculosMath(generarEnteroAleatorio(1, 100));

// Escuchador para generar nuevos números al pulsar el botón
btnGenerarRandom.addEventListener("click", () => {
  const nuevoNumero = generarEnteroAleatorio(1, 100);
  procesarCalculosMath(nuevoNumero);
});
