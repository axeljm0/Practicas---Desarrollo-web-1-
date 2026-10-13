"use strict";

/**
 * ============================================================================
 * EJERCICIO 02: Funciones con Retorno
 * Módulo 6.2 - Funciones
 * ============================================================================
 * Objetivo: Comprender la instrucción `return` para que una función produzca
 * y devuelva un resultado aprovechable por quien la invoque, distinguiendo
 * entre la lógica pura de cálculo y la presentación en pantalla.
 */

// ============================================================================
// 1. DECLARACIÓN DE VARIABLES Y ELEMENTOS DEL DOM
// ============================================================================
const inputBase = document.getElementById("inputBase");
const inputAltura = document.getElementById("inputAltura");
const btnCalcular = document.getElementById("btnCalcular");
const valorArea = document.getElementById("valorArea");
const formulaExplicada = document.getElementById("formulaExplicada");
const listaHistorial = document.getElementById("listaHistorial");

// ============================================================================
// 2. DEFINICIÓN DE FUNCIONES
// ============================================================================

/**
 * Función matemática que calcula el área de un rectángulo.
 * Aplica la fórmula: Área = base × altura.
 * 
 * @param {number} base - Medida de la base del rectángulo.
 * @param {number} altura - Medida de la altura del rectángulo.
 * @returns {number} Área calculada del rectángulo.
 */
function calcularAreaRectangulo(base, altura) {
  // Convertir a número por seguridad y verificar valores positivos
  const b = Number(base);
  const h = Number(altura);

  if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) {
    throw new Error("Tanto la base como la altura deben ser números positivos mayores que cero.");
  }

  // La instrucción 'return' finaliza la ejecución de la función y entrega el valor resultante
  return b * h;
}

/**
 * Agrega una entrada en el historial visual de cálculos.
 * 
 * @param {number} base - Base utilizada.
 * @param {number} altura - Altura utilizada.
 * @param {number} area - Área resultante.
 */
function registrarEnHistorial(base, altura, area) {
  const item = document.createElement("div");
  item.className = "history-item";

  const spanDatos = document.createElement("span");
  spanDatos.textContent = `Base: ${base} cm | Altura: ${altura} cm`;

  const spanResultado = document.createElement("strong");
  spanResultado.textContent = `${area} cm²`;

  item.appendChild(spanDatos);
  item.appendChild(spanResultado);

  // Insertar al inicio de la lista de historial
  listaHistorial.prepend(item);
}

/**
 * Procesa la entrada del usuario, invoca la función con retorno y actualiza el DOM.
 */
function procesarCalculo() {
  const base = parseFloat(inputBase.value);
  const altura = parseFloat(inputAltura.value);

  try {
    // Invocación de la función con retorno y captura del valor en una variable
    const area = calcularAreaRectangulo(base, altura);

    // Actualización de los elementos en el DOM
    valorArea.textContent = `${area} cm²`;
    formulaExplicada.textContent = `Fórmula: ${base} × ${altura} = ${area} cm²`;

    // Registro en el historial
    registrarEnHistorial(base, altura, area);

    console.log(`[Cálculo exitoso]: Base=${base}, Altura=${altura} => Área=${area}`);
  } catch (error) {
    valorArea.textContent = "Error";
    formulaExplicada.textContent = error.message;
    console.error("[Error en cálculo]:", error.message);
  }
}

// ============================================================================
// 3. EJECUCIÓN INICIAL DEMOSTRATIVA
// ============================================================================
// Realizamos una llamada inicial con los valores predeterminados (12 y 6)
procesarCalculo();

// Demostración adicional de cómo el retorno de la función puede usarse directamente
// en una expresión matemática (ej: costo de alfombrado a $15 por cm²)
const areaEjemplo = calcularAreaRectangulo(5, 4); // Retorna 20
const costoEstimado = areaEjemplo * 15;
console.log(`Ejemplo de composición: Área de 5x4 = ${areaEjemplo} cm². Costo estimado: $${costoEstimado}`);

// ============================================================================
// 4. MANEJO DE EVENTOS
// ============================================================================
btnCalcular.addEventListener("click", procesarCalculo);

// Permitir calcular pulsando Enter en cualquiera de los dos inputs
[inputBase, inputAltura].forEach((input) => {
  input.addEventListener("keyup", (evento) => {
    if (evento.key === "Enter") {
      procesarCalculo();
    }
  });
});
