"use strict";

/**
 * ============================================================================
 * EJERCICIO 07: Métodos en Objetos y la palabra clave 'this'
 * Módulo 6.3 - Objetos
 * ============================================================================
 * Objetivo: Aprender a vincular funciones a las propiedades de un objeto
 * (métodos) y utilizar la palabra clave `this` para acceder y manipular el
 * estado interno del objeto en el contexto de ejecución actual.
 */

// ============================================================================
// 1. DEFINICIÓN DEL OBJETO CON PROPIEDADES Y MÉTODOS
// ============================================================================
const vehiculo = {
  // Propiedades de estado (datos)
  marca: "Toyota",
  modelo: "Corolla Hybrid",
  anio: 2024,
  motorEncendido: false,
  velocidadActual: 0,

  /**
   * Método que construye y retorna un texto descriptivo del estado del vehículo.
   * Utiliza `this` para referenciar dinámicamente las propiedades del propio objeto.
   * 
   * @returns {string} Frase descriptiva compuesta.
   */
  descripcion: function () {
    const estadoMotor = this.motorEncendido ? "encendido" : "apagado";
    return `Este vehículo es un ${this.marca} ${this.modelo} (Año ${this.anio}). Se encuentra con el motor ${estadoMotor} y viaja a ${this.velocidadActual} km/h.`;
  },

  /**
   * Método para encender o apagar el motor.
   */
  alternarMotor: function () {
    this.motorEncendido = !this.motorEncendido;
    // Si se apaga el motor, la velocidad debe caer a cero por seguridad
    if (!this.motorEncendido) {
      this.velocidadActual = 0;
    }
    return this.motorEncendido;
  },

  /**
   * Método que incrementa la velocidad si el motor está encendido.
   * 
   * @param {number} incremento - Cantidad de km/h a sumar.
   * @returns {number} Velocidad resultante.
   */
  acelerar: function (incremento) {
    if (!this.motorEncendido) {
      throw new Error("¡No puedes acelerar con el motor apagado! Enciéndelo primero.");
    }
    this.velocidadActual += incremento;
    return this.velocidadActual;
  },

  /**
   * Método para detener el vehículo por completo.
   */
  frenar: function () {
    this.velocidadActual = 0;
    return this.velocidadActual;
  }
};

// ============================================================================
// 2. REFERENCIAS A ELEMENTOS DEL DOM
// ============================================================================
const cajaDescripcion = document.getElementById("cajaDescripcion");
const dispMotor = document.getElementById("dispMotor");
const dispVelocidad = document.getElementById("dispVelocidad");
const btnObtenerDescripcion = document.getElementById("btnObtenerDescripcion");
const btnAlternarMotor = document.getElementById("btnAlternarMotor");
const btnAcelerar = document.getElementById("btnAcelerar");
const btnFrenar = document.getElementById("btnFrenar");

// ============================================================================
// 3. FUNCIONES DE ACTUALIZACIÓN DEL DOM
// ============================================================================

/**
 * Actualiza la interfaz gráfica con el estado más reciente del objeto.
 */
function actualizarInterfaz() {
  // Invocación formal del método requerido: vehiculo.descripcion()
  const textoDescripcion = vehiculo.descripcion();
  cajaDescripcion.textContent = `"${textoDescripcion}"`;

  // Actualizar indicadores individuales
  dispMotor.textContent = vehiculo.motorEncendido ? "Encendido 🟢" : "Apagado 🔴";
  dispMotor.style.color = vehiculo.motorEncendido ? "#059669" : "#dc2626";
  dispVelocidad.textContent = `${vehiculo.velocidadActual} km/h`;

  console.log(`[vehiculo.descripcion()]: ${textoDescripcion}`);
}

// ============================================================================
// 4. CONFIGURACIÓN DE EVENTOS (addEventListener)
// ============================================================================

btnObtenerDescripcion.addEventListener("click", () => {
  actualizarInterfaz();
});

btnAlternarMotor.addEventListener("click", () => {
  vehiculo.alternarMotor();
  actualizarInterfaz();
});

btnAcelerar.addEventListener("click", () => {
  try {
    vehiculo.acelerar(20);
    actualizarInterfaz();
  } catch (error) {
    alert(error.message); // Notificación contextual al usuario
    console.warn("[Aviso del vehículo]:", error.message);
  }
});

btnFrenar.addEventListener("click", () => {
  vehiculo.frenar();
  actualizarInterfaz();
});

// ============================================================================
// 5. EJECUCIÓN INICIAL
// ============================================================================
// Inicializar la pantalla con la descripción por defecto
actualizarInterfaz();
