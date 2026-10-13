"use strict";

/**
 * ============================================================================
 * EJERCICIO 05: Función Autoejecutable (IIFE)
 * Módulo 6.2 - Funciones
 * ============================================================================
 * Objetivo: Estudiar el patrón de diseño IIFE (Immediately Invoked Function
 * Expression). Esta técnica ejecuta una función anónima al instante en que
 * el motor de JavaScript la parsea, creando una "burbuja" de aislamiento
 * léxico que impide la fuga de variables al ámbito global (objeto window).
 */

// ============================================================================
// 1. PATRÓN IIFE: CÁLCULO DE ÁREA DE CÍRCULO CON Math.PI
// ============================================================================
// La estructura canónica es: (function(parametros) { ... })(argumentos);

(function (radioInicial) {
  // Constante privada interna: no contamina 'window'
  const PI_LOCAL = Math.PI;

  // Variables y elementos DOM locales dentro del ámbito del IIFE
  const circuloVisual = document.getElementById("circuloVisual");
  const inputRadio = document.getElementById("inputRadio");
  const btnRecalcular = document.getElementById("btnRecalcular");
  const dispRadio = document.getElementById("dispRadio");
  const dispArea = document.getElementById("dispArea");
  const checkPi = document.getElementById("checkPi");
  const checkFn = document.getElementById("checkFn");

  /**
   * Función privada que calcula el área de un círculo.
   * Fórmula: Área = π × r²
   * 
   * @param {number} radio - Radio de la circunferencia.
   * @returns {number} Área exacta calculada con Math.PI.
   */
  function calcularAreaCirculo(radio) {
    const r = Number(radio);
    if (isNaN(r) || r <= 0) {
      throw new Error("El radio debe ser un número positivo.");
    }

    // Uso del objeto estándar Math: Math.PI y Math.pow
    return PI_LOCAL * Math.pow(r, 2);
  }

  /**
   * Actualiza los elementos del DOM y ajusta el tamaño visual del círculo.
   * 
   * @param {number} radio - Radio a representar.
   */
  function renderizarCirculo(radio) {
    try {
      const area = calcularAreaCirculo(radio);

      // Formatear a 2 decimales para la visualización amigable
      dispRadio.textContent = `${radio} cm`;
      dispArea.textContent = `${area.toFixed(2)} cm²`;

      // Adaptar el círculo gráfico limitando el tamaño entre 60px y 200px
      const dimensionPixel = Math.min(Math.max(radio * 14, 60), 220);
      circuloVisual.style.width = `${dimensionPixel}px`;
      circuloVisual.style.height = `${dimensionPixel}px`;
      circuloVisual.textContent = `r = ${radio}`;

      console.log(`[IIFE - Cálculo]: Radio=${radio} => Área=${area.toFixed(4)}`);
    } catch (error) {
      dispArea.textContent = "Error";
      console.error("[IIFE Error]:", error.message);
    }
  }

  /**
   * Realiza una auditoría didáctica en el objeto global para demostrar la encapsulación.
   */
  function auditarAmbitoGlobal() {
    // Si la encapsulación tuvo éxito, window.PI_LOCAL y window.calcularAreaCirculo deben ser undefined
    const piEnWindow = typeof window.PI_LOCAL;
    const fnEnWindow = typeof window.calcularAreaCirculo;

    checkPi.textContent = `${piEnWindow} (Protegida)`;
    checkFn.textContent = `${fnEnWindow} (Encapsulada)`;

    console.log(`[Auditoría IIFE]: typeof window.PI_LOCAL = ${piEnWindow}`);
    console.log(`[Auditoría IIFE]: typeof window.calcularAreaCirculo = ${fnEnWindow}`);
  }

  // Ejecución inicial dentro del IIFE usando el parámetro recibido
  renderizarCirculo(radioInicial);
  auditarAmbitoGlobal();

  // Asignación de escuchadores de eventos dentro del módulo
  btnRecalcular.addEventListener("click", () => {
    const nuevoRadio = parseFloat(inputRadio.value);
    renderizarCirculo(nuevoRadio);
  });

  inputRadio.addEventListener("keyup", (evento) => {
    if (evento.key === "Enter") {
      btnRecalcular.click();
    }
  });

})(5); // Invocación inmediata con radioInicial = 5
