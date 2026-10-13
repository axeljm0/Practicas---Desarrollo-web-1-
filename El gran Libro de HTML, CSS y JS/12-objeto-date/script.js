"use strict";

/**
 * ============================================================================
 * EJERCICIO 12: Objeto Estándar Date
 * Módulo 6.4 - Objetos Estándar
 * ============================================================================
 * Objetivo: Manejar fechas, horas y calendarios en JavaScript con la clase
 * `Date`. Comprender sus métodos extractores (`getFullYear`, `getMonth`,
 * `getDate`, `getDay`), la peculiaridad del índice 0 en meses y días, y
 * realizar aritmética de fechas (diferencias de marcas de tiempo).
 */

// ============================================================================
// 1. CONSTANTES DIDÁCTICAS Y ELEMENTOS DEL DOM
// ============================================================================
// Nombres de los días según el índice retornado por .getDay() (0 = Domingo)
const DIAS_SEMANA = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado"
];

// Nombres de los meses según el índice retornado por .getMonth() (0 = Enero)
const MESES_ANIO = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

const inputCumple = document.getElementById("inputCumple");
const btnCalcularFecha = document.getElementById("btnCalcularFecha");
const dispEdad = document.getElementById("dispEdad");
const dispDiasRestantes = document.getElementById("dispDiasRestantes");
const getAnio = document.getElementById("getAnio");
const getMes = document.getElementById("getMes");
const getDiaMes = document.getElementById("getDiaMes");
const getDiaSemana = document.getElementById("getDiaSemana");

// ============================================================================
// 2. FUNCIONES DE CÁLCULO Y EXTRACCIÓN CON DATE
// ============================================================================

/**
 * Procesa una fecha de nacimiento dada como string "AAAA-MM-DD",
 * extrae sus componentes mediante los métodos estándar de Date y calcula
 * la edad actual y los días restantes para el próximo cumpleaños.
 * 
 * @param {string} fechaString - Fecha en formato estándar ISO "YYYY-MM-DD".
 */
function procesarFechaCumpleanos(fechaString) {
  if (!fechaString) return;

  // Creamos el objeto Date asegurando interpretación horaria local limpia
  const partes = fechaString.split("-");
  const anioInput = parseInt(partes[0], 10);
  const mesInput = parseInt(partes[1], 10) - 1; // Ajuste didáctico a base 0
  const diaInput = parseInt(partes[2], 10);

  const fechaNacimiento = new Date(anioInput, mesInput, diaInput);
  const fechaHoy = new Date();

  // --------------------------------------------------------------------------
  // EXTRACCIÓN DE COMPONENTES CON GETTERS DE DATE
  // --------------------------------------------------------------------------
  const anio = fechaNacimiento.getFullYear(); // Año completo de 4 dígitos
  const indiceMes = fechaNacimiento.getMonth(); // 0 al 11
  const diaDelMes = fechaNacimiento.getDate(); // 1 al 31 (día del calendario)
  const indiceDiaSemana = fechaNacimiento.getDay(); // 0 al 6 (día de la semana)

  // Despliegue en la interfaz
  getAnio.textContent = anio;
  getMes.textContent = `${indiceMes} (${MESES_ANIO[indiceMes]})`;
  getDiaMes.textContent = diaDelMes;
  getDiaSemana.textContent = `${indiceDiaSemana} (${DIAS_SEMANA[indiceDiaSemana]})`;

  // --------------------------------------------------------------------------
  // CÁLCULO DE LA EDAD EXACTA
  // --------------------------------------------------------------------------
  let edad = fechaHoy.getFullYear() - anio;
  const mesActual = fechaHoy.getMonth();
  const diaActual = fechaHoy.getDate();

  // Si aún no ha llegado el mes de cumpleaños en el año en curso, o es el mismo mes
  // pero aún no llega el día, todavía no cumple un año más
  if (mesActual < indiceMes || (mesActual === indiceMes && diaActual < diaDelMes)) {
    edad--;
  }

  dispEdad.textContent = `${edad} años`;

  // --------------------------------------------------------------------------
  // CÁLCULO DE DÍAS FALTANTES PARA EL PRÓXIMO CUMPLEAÑOS
  // --------------------------------------------------------------------------
  let proximoCumple = new Date(fechaHoy.getFullYear(), indiceMes, diaDelMes);

  // Si el cumpleaños de este año ya pasó, el próximo será el año entrante
  if (fechaHoy > proximoCumple && !(mesActual === indiceMes && diaActual === diaDelMes)) {
    proximoCumple.setFullYear(fechaHoy.getFullYear() + 1);
  }

  // Diferencia en milisegundos convertida a días enteros (1 día = 86,400,000 ms)
  const unDiaEnMs = 1000 * 60 * 60 * 24;
  const diferenciaMs = proximoCumple.getTime() - fechaHoy.getTime();
  const diasFaltantes = Math.ceil(diferenciaMs / unDiaEnMs);

  if (mesActual === indiceMes && diaActual === diaDelMes) {
    dispDiasRestantes.textContent = "¡Hoy es tu cumpleaños! 🎉";
  } else {
    dispDiasRestantes.textContent = `${diasFaltantes} días`;
  }

  console.log("=== ANÁLISIS DE FECHA ===");
  console.log("Fecha nacimiento:", fechaNacimiento.toLocaleDateString("es-ES"));
  console.log(`Año: ${anio}, Mes: ${indiceMes} (${MESES_ANIO[indiceMes]}), Día: ${diaDelMes}, Semana: ${DIAS_SEMANA[indiceDiaSemana]}`);
  console.log(`Edad: ${edad} años. Días restantes: ${diasFaltantes}`);
}

// ============================================================================
// 3. EJECUCIÓN INICIAL Y EVENTOS
// ============================================================================
// Procesa la fecha por defecto cargada en el input
procesarFechaCumpleanos(inputCumple.value);

btnCalcularFecha.addEventListener("click", () => {
  procesarFechaCumpleanos(inputCumple.value);
});

inputCumple.addEventListener("change", () => {
  procesarFechaCumpleanos(inputCumple.value);
});
