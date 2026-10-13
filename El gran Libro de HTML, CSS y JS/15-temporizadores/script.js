"use strict";

/**
 * ============================================================================
 * EJERCICIO 15: Temporizadores en JavaScript
 * Módulo 6.5 - Asincronía y Temporizadores
 * ============================================================================
 * Objetivo: Comprender las funciones de temporización asíncronas de la Web API
 * del navegador (`setInterval`, `clearInterval`, `setTimeout`, `clearTimeout`),
 * aprendiendo a gestionar identificadores de intervalos para evitar fugas de
 * memoria e intervalos duplicados.
 */

// ============================================================================
// 1. VARIABLES DE ESTADO Y ELEMENTOS DEL DOM
// ============================================================================
let idIntervalo = null; // Almacenará el ID devuelto por setInterval
let idTimeoutAlarma = null; // Almacenará el ID devuelto por setTimeout
let centesimasTranscurridas = 0; // Unidad mínima de tiempo para fluidez visual

const displayTiempo = document.getElementById("displayTiempo");
const indicadorEstado = document.getElementById("indicadorEstado");
const btnIniciar = document.getElementById("btnIniciar");
const btnPausar = document.getElementById("btnPausar");
const btnReiniciar = document.getElementById("btnReiniciar");

const inputSegundosAlarma = document.getElementById("inputSegundosAlarma");
const btnProgramarAlarma = document.getElementById("btnProgramarAlarma");
const alertaToast = document.getElementById("alertaToast");

// ============================================================================
// 2. FUNCIONES DE FORMATEO Y CRONOMETRAJE
// ============================================================================

/**
 * Convierte las centésimas acumuladas en un formato digital MM:SS:CC legible.
 * 
 * @param {number} totalCentesimas - Centésimas de segundo acumuladas.
 * @returns {string} Cadena formateada "00:00:00".
 */
function formatearTiempo(totalCentesimas) {
  const minutos = Math.floor(totalCentesimas / 6000);
  const segundos = Math.floor((totalCentesimas % 6000) / 100);
  const centesimas = totalCentesimas % 100;

  // Rellenar con ceros a la izquierda usando padStart
  const minStr = String(minutos).padStart(2, "0");
  const segStr = String(segundos).padStart(2, "0");
  const cenStr = String(centesimas).padStart(2, "0");

  return `${minStr}:${segStr}:${cenStr}`;
}

/**
 * Inicia el cronómetro repitiendo un bloque de código cada 10 milisegundos con setInterval.
 * Buena práctica: verificar si 'idIntervalo' ya existe para no duplicar procesos.
 */
function iniciarCronometro() {
  if (idIntervalo !== null) {
    console.warn("[Temporizador]: El cronómetro ya está en ejecución.");
    return;
  }

  indicadorEstado.textContent = "EN EJECUCIÓN";
  indicadorEstado.className = "status-indicator running";

  // setInterval registra una tarea recurrente cada 10ms
  idIntervalo = setInterval(() => {
    centesimasTranscurridas++;
    displayTiempo.textContent = formatearTiempo(centesimasTranscurridas);
  }, 10);

  console.log(`[setInterval]: Intervalo iniciado con ID=${idIntervalo}`);
}

/**
 * Pausa la ejecución limpiando el intervalo mediante clearInterval.
 */
function pausarCronometro() {
  if (idIntervalo !== null) {
    clearInterval(idIntervalo);
    idIntervalo = null; // Reiniciar referencia para permitir reanudar
    indicadorEstado.textContent = "PAUSADO";
    indicadorEstado.className = "status-indicator paused";
    console.log("[clearInterval]: Intervalo detenido correctamente.");
  }
}

/**
 * Detiene el cronómetro y devuelve el contador a cero.
 */
function reiniciarCronometro() {
  pausarCronometro();
  centesimasTranscurridas = 0;
  displayTiempo.textContent = formatearTiempo(0);
  indicadorEstado.textContent = "DETENIDO";
  indicadorEstado.className = "status-indicator";
  console.log("[Cronómetro]: Reiniciado a 00:00:00");
}

// ============================================================================
// 3. TEMPORIZADOR DE ALARMA CON setTimeout
// ============================================================================

/**
 * Programa una notificación que se ejecutará una única vez tras 'N' segundos.
 */
function programarAlarma() {
  const segundos = parseInt(inputSegundosAlarma.value, 10);

  if (isNaN(segundos) || segundos <= 0) {
    alert("Por favor, ingresa un número de segundos válido mayor a 0.");
    return;
  }

  // Ocultar alerta previa si estuviera visible
  alertaToast.style.display = "none";

  // Si había una alarma pendiente programada, la cancelamos primero con clearTimeout
  if (idTimeoutAlarma !== null) {
    clearTimeout(idTimeoutAlarma);
  }

  console.log(`[setTimeout]: Alarma programada para sonar en ${segundos} segundo(s)...`);
  btnProgramarAlarma.textContent = `⏳ Esperando ${segundos}s...`;
  btnProgramarAlarma.disabled = true;

  // setTimeout ejecuta el callback una sola vez tras vencer el retardo en milisegundos
  idTimeoutAlarma = setTimeout(() => {
    alertaToast.style.display = "block";
    btnProgramarAlarma.textContent = "⏰ Programar Alarma (seg)";
    btnProgramarAlarma.disabled = false;
    idTimeoutAlarma = null;

    console.log("[setTimeout]: ¡Callback disparado por el Event Loop!");

    // Ocultar la notificación visual automáticamente tras 5 segundos
    setTimeout(() => {
      alertaToast.style.display = "none";
    }, 5000);
  }, segundos * 1000);
}

// ============================================================================
// 4. CONFIGURACIÓN DE EVENTOS (addEventListener)
// ============================================================================
btnIniciar.addEventListener("click", iniciarCronometro);
btnPausar.addEventListener("click", pausarCronometro);
btnReiniciar.addEventListener("click", reiniciarCronometro);
btnProgramarAlarma.addEventListener("click", programarAlarma);
