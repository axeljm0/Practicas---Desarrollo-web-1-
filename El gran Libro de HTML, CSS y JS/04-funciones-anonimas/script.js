"use strict";

/**
 * ============================================================================
 * EJERCICIO 04: Funciones Anónimas y Expresiones de Función
 * Módulo 6.2 - Funciones
 * ============================================================================
 * Objetivo: Aprender a definir funciones sin identificador de nombre
 * (funciones anónimas) y almacenarlas en variables constantes, así como
 * entender su uso como funciones de primera clase y callbacks.
 */

// ============================================================================
// 1. DECLARACIÓN DE VARIABLES Y ELEMENTOS DEL DOM
// ============================================================================
const inputNumero = document.getElementById("inputNumero");
const btnCalcular = document.getElementById("btnCalcular");
const resultadoCuadrado = document.getElementById("resultadoCuadrado");
const detalleOperacion = document.getElementById("detalleOperacion");
const contenedorOriginal = document.getElementById("contenedorOriginal");
const contenedorTransformado = document.getElementById("contenedorTransformado");

// Conjunto de datos para demostrar el uso de la función anónima con arrays
const numerosPrueba = [2, 3, 4, 5, 6];

// ============================================================================
// 2. DEFINICIÓN DE LA FUNCIÓN ANÓNIMA (EXPRESIÓN DE FUNCIÓN)
// ============================================================================

/**
 * Función anónima asignada a una constante.
 * Eleva cualquier número pasado por parámetro a su potencia cuadrada (n * n).
 * 
 * @param {number} numero - Número que se desea elevar al cuadrado.
 * @returns {number} El cuadrado del número recibido.
 */
const elevarAlCuadrado = function (numero) {
  const n = Number(numero);

  if (isNaN(n)) {
    throw new Error("El valor proporcionado no es un número válido.");
  }

  // Operación de elevación al cuadrado
  return n * n;
};

// ============================================================================
// 3. FUNCIONES DE PRESENTACIÓN EN EL DOM
// ============================================================================

/**
 * Procesa el input del usuario, ejecuta la función anónima y muestra el resultado.
 */
function calcularYMostrar() {
  const valor = parseFloat(inputNumero.value);

  try {
    // Invocación a través de la variable que contiene la función anónima
    const cuadrado = elevarAlCuadrado(valor);

    resultadoCuadrado.textContent = cuadrado;
    detalleOperacion.textContent = `${valor}² = ${valor} × ${valor} = ${cuadrado}`;
    console.log(`[elevarAlCuadrado]: ${valor}² = ${cuadrado}`);
  } catch (error) {
    resultadoCuadrado.textContent = "Error";
    detalleOperacion.textContent = error.message;
    console.error("[Error]:", error.message);
  }
}

/**
 * Renderiza una lista de números en formato de etiquetas (chips) en un contenedor.
 * 
 * @param {number[]} arreglo - Lista de números.
 * @param {HTMLElement} contenedor - Elemento del DOM donde insertar.
 * @param {boolean} resaltar - Si se debe aplicar el estilo destacado.
 */
function renderizarChips(arreglo, contenedor, resaltar = false) {
  contenedor.innerHTML = "";
  arreglo.forEach((num) => {
    const chip = document.createElement("span");
    chip.className = `chip ${resaltar ? "highlight" : ""}`;
    chip.textContent = num;
    contenedor.appendChild(chip);
  });
}

/**
 * Demuestra el uso de la función anónima como callback dentro de .map()
 */
function ejecutarDemostracionArray() {
  renderizarChips(numerosPrueba, contenedorOriginal, false);

  // Pasamos una función anónima directamente a .map() que a su vez invoca a elevarAlCuadrado
  const numerosElevados = numerosPrueba.map(function (num) {
    return elevarAlCuadrado(num);
  });

  renderizarChips(numerosElevados, contenedorTransformado, true);
  console.log("[Demostración Array.map]:", numerosPrueba, "->", numerosElevados);
}

// ============================================================================
// 4. EJECUCIÓN INICIAL Y MANEJO DE EVENTOS
// ============================================================================
// Cálculo inicial con el valor por defecto
calcularYMostrar();
ejecutarDemostracionArray();

// Eventos interactivos
btnCalcular.addEventListener("click", calcularYMostrar);

inputNumero.addEventListener("keyup", (evento) => {
  if (evento.key === "Enter") {
    calcularYMostrar();
  }
});
