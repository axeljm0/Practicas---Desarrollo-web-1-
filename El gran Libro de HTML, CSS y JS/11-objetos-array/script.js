"use strict";

/**
 * ============================================================================
 * EJERCICIO 11: Objeto Estándar Array
 * Módulo 6.4 - Objetos Estándar
 * ============================================================================
 * Objetivo: Dominar las operaciones esenciales sobre arreglos en JavaScript:
 * métodos mutables (push, pop, sort) frente a métodos inmutables/funcionales
 * de orden superior (filter, map, reduce, find).
 */

// ============================================================================
// 1. ARREGLO BASE ORIGINAL REQUERIDO
// ============================================================================
const ARREGLO_INICIAL = [15, 8, 42, 23, 4, 16];

// Arreglo de trabajo dinámico
let numeros = [...ARREGLO_INICIAL];

// ============================================================================
// 2. REFERENCIAS A ELEMENTOS DEL DOM
// ============================================================================
const contenedorTiles = document.getElementById("contenedorTiles");
const btnPush = document.getElementById("btnPush");
const btnPop = document.getElementById("btnPop");
const btnReset = document.getElementById("btnReset");

const resPushPop = document.getElementById("resPushPop");
const resSort = document.getElementById("resSort");
const resFilter = document.getElementById("resFilter");
const resMap = document.getElementById("resMap");
const resReduce = document.getElementById("resReduce");
const resFind = document.getElementById("resFind");

// ============================================================================
// 3. FUNCIONES DE RENDERIZADO Y OPERACIONES
// ============================================================================

/**
 * Dibuja las fichas visuales de los números actuales en el tablero superior.
 */
function renderizarTablero() {
  contenedorTiles.innerHTML = "";
  numeros.forEach((num) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = num;
    contenedorTiles.appendChild(tile);
  });
}

/**
 * Ejecuta y actualiza las 6 operaciones con Array mostrando el resultado en pantalla.
 */
function actualizarOperaciones() {
  renderizarTablero();

  // --------------------------------------------------------------------------
  // OPERACIÓN 1: Mutación con push() y pop()
  // --------------------------------------------------------------------------
  resPushPop.innerHTML = `
    Longitud actual: <strong>${numeros.length} elementos</strong><br>
    Último elemento: <strong>${numeros[numeros.length - 1] ?? "Vacío"}</strong>
  `;

  // --------------------------------------------------------------------------
  // OPERACIÓN 2: Ordenamiento numérico con .sort()
  // Nota didáctica: Usamos copia con slice() para no mutar inesperadamente el estado
  // --------------------------------------------------------------------------
  const arregloOrdenado = numeros.slice().sort(function (a, b) {
    return a - b;
  });
  resSort.textContent = `[${arregloOrdenado.join(", ")}]`;

  // --------------------------------------------------------------------------
  // OPERACIÓN 3: Filtrado con .filter() (valores mayores a 15)
  // --------------------------------------------------------------------------
  const mayoresA15 = numeros.filter(function (num) {
    return num > 15;
  });
  resFilter.innerHTML = `Mayores a 15: <strong>[${mayoresA15.join(", ")}]</strong> (${mayoresA15.length} encontrados)`;

  // --------------------------------------------------------------------------
  // OPERACIÓN 4: Transformación con .map() (multiplicar cada elemento por 2)
  // --------------------------------------------------------------------------
  const duplicados = numeros.map(function (num) {
    return num * 2;
  });
  resMap.textContent = `[${duplicados.join(", ")}]`;

  // --------------------------------------------------------------------------
  // OPERACIÓN 5: Reducción acumulativa con .reduce()
  // --------------------------------------------------------------------------
  const sumaTotal = numeros.reduce(function (acumulador, actual) {
    return acumulador + actual;
  }, 0);
  const promedio = (sumaTotal / (numeros.length || 1)).toFixed(2);
  resReduce.innerHTML = `Suma total: <strong>${sumaTotal}</strong> | Promedio: <strong>${promedio}</strong>`;

  // --------------------------------------------------------------------------
  // OPERACIÓN 6: Búsqueda con .find(), .indexOf() e .includes()
  // --------------------------------------------------------------------------
  const primerMayorA20 = numeros.find(function (num) {
    return num > 20;
  });
  const indiceDe42 = numeros.indexOf(42);
  const contiene23 = numeros.includes(23);

  resFind.innerHTML = `
    Primer número > 20: <strong>${primerMayorA20 ?? "Ninguno"}</strong><br>
    Índice del valor 42: <strong>${indiceDe42}</strong> | ¿Contiene el 23?: <strong>${contiene23 ? "Sí (true)" : "No (false)"}</strong>
  `;

  console.log("=== ESTADO ACTUAL DEL ARRAY ===", numeros);
  console.log("Ordenado:", arregloOrdenado);
  console.log("Filtrado > 15:", mayoresA15);
  console.log("Mapeado x2:", duplicados);
  console.log("Reduce suma:", sumaTotal);
}

// ============================================================================
// 4. CONFIGURACIÓN DE EVENTOS
// ============================================================================

btnPush.addEventListener("click", () => {
  numeros.push(99);
  actualizarOperaciones();
  console.log("[Array.push(99)]");
});

btnPop.addEventListener("click", () => {
  if (numeros.length > 0) {
    const eliminado = numeros.pop();
    actualizarOperaciones();
    console.log(`[Array.pop()] Eliminado: ${eliminado}`);
  }
});

btnReset.addEventListener("click", () => {
  numeros = [...ARREGLO_INICIAL];
  actualizarOperaciones();
  console.log("[Array restablecido a valores originales]");
});

// ============================================================================
// 5. EJECUCIÓN INICIAL
// ============================================================================
actualizarOperaciones();
