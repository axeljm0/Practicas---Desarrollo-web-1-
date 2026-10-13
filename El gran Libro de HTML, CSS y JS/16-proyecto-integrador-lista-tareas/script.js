"use strict";

/**
 * ============================================================================
 * EJERCICIO 16: Proyecto Integrador - Lista de Tareas (To-Do List)
 * Módulo 6 - Cierre e Integración
 * ============================================================================
 * Objetivo: Integrar en una sola aplicación web interactiva y modular todos los
 * conceptos abordados en el curso de JavaScript:
 * 1. Funciones (declaración, paso de parámetros, valor de retorno y ámbito).
 * 2. Objetos (modelado de cada tarea con propiedades id, texto, completada, fecha).
 * 3. Arreglos (almacenamiento, métodos funcionales filter, map, findIndex).
 * 4. Manipulación del DOM (creación de elementos, eventos, alternancia de clases).
 * 5. Persistencia de datos en el navegador con localStorage.
 */

// ============================================================================
// 1. CONSTANTES Y MODELO DE ESTADO
// ============================================================================
const CLAVE_LOCALSTORAGE = "ejercicios_js_tareas_v1";

// Tareas predeterminadas iniciales para una experiencia inmediata
const TAREAS_POR_DEFECTO = [
  {
    id: 1700000000001,
    texto: "Estudiar la declaración de funciones y el valor de retorno",
    completada: true,
    fechaCreacion: "10:30"
  },
  {
    id: 1700000000002,
    texto: "Aprender el modelo prototípico y Object.create()",
    completada: false,
    fechaCreacion: "11:15"
  },
  {
    id: 1700000000003,
    texto: "Completar los ejercicios del objeto estándar Array y Date",
    completada: false,
    fechaCreacion: "12:00"
  }
];

// Estado centralizado de la aplicación
let estado = {
  tareas: cargarTareasDesdeStorage(),
  filtroActual: "todas" // "todas" | "pendientes" | "completadas"
};

// ============================================================================
// 2. REFERENCIAS A ELEMENTOS DEL DOM
// ============================================================================
const formNuevaTarea = document.getElementById("formNuevaTarea");
const inputTarea = document.getElementById("inputTarea");
const listaTareas = document.getElementById("listaTareas");
const contadorPendientes = document.getElementById("contadorPendientes");
const botonesFiltro = document.querySelectorAll(".btn-filter");
const btnLimpiarCompletadas = document.getElementById("btnLimpiarCompletadas");

// ============================================================================
// 3. PERSISTENCIA CON LOCALSTORAGE
// ============================================================================

/**
 * Carga las tareas guardadas en localStorage o retorna las predeterminadas.
 * 
 * @returns {Array<Object>} Lista de objetos tarea.
 */
function cargarTareasDesdeStorage() {
  try {
    const datosSerializados = localStorage.getItem(CLAVE_LOCALSTORAGE);
    if (datosSerializados) {
      return JSON.parse(datosSerializados);
    }
  } catch (error) {
    console.error("[Storage]: Error al leer de localStorage:", error);
  }
  return [...TAREAS_POR_DEFECTO];
}

/**
 * Guarda el arreglo actual de tareas en localStorage mediante serialización JSON.
 */
function guardarTareasEnStorage() {
  try {
    localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(estado.tareas));
    console.log(`[Storage]: ${estado.tareas.length} tareas sincronizadas.`);
  } catch (error) {
    console.error("[Storage]: Error al escribir en localStorage:", error);
  }
}

// ============================================================================
// 4. FUNCIONES LÓGICAS DEL DOMINIO (OPERACIONES CRUD)
// ============================================================================

/**
 * Crea una nueva tarea y la añade al inicio de la lista.
 * 
 * @param {string} texto - Descripción de la tarea.
 */
function agregarTarea(texto) {
  const textoLimpio = texto.trim();
  if (!textoLimpio) return;

  const ahora = new Date();
  const horaFormateada = `${String(ahora.getHours()).padStart(2, "0")}:${String(ahora.getMinutes()).padStart(2, "0")}`;

  // Objeto literal que representa la nueva entidad Tarea
  const nuevaTarea = {
    id: Date.now(), // Marca de tiempo única como identificador
    texto: textoLimpio,
    completada: false,
    fechaCreacion: horaFormateada
  };

  // Operación inmutable: agregar al inicio del array
  estado.tareas.unshift(nuevaTarea);

  guardarTareasEnStorage();
  renderizarAplicacion();
  console.log("[CRUD - Crear]:", nuevaTarea);
}

/**
 * Alterna el estado 'completada' de una tarea según su id.
 * 
 * @param {number} id - Identificador de la tarea.
 */
function alternarCompletada(id) {
  estado.tareas = estado.tareas.map((tarea) => {
    if (tarea.id === id) {
      return { ...tarea, completada: !tarea.completada };
    }
    return tarea;
  });

  guardarTareasEnStorage();
  renderizarAplicacion();
  console.log(`[CRUD - Actualizar]: Tarea ${id} alternada.`);
}

/**
 * Elimina una tarea del listado mediante filtrado inmutable.
 * 
 * @param {number} id - Identificador de la tarea a eliminar.
 */
function eliminarTarea(id) {
  estado.tareas = estado.tareas.filter((tarea) => tarea.id !== id);

  guardarTareasEnStorage();
  renderizarAplicacion();
  console.log(`[CRUD - Eliminar]: Tarea ${id} eliminada.`);
}

/**
 * Elimina todas las tareas marcadas como completadas.
 */
function limpiarCompletadas() {
  const cantidadCompletadas = estado.tareas.filter((t) => t.completada).length;
  if (cantidadCompletadas === 0) {
    alert("No hay tareas completadas para eliminar.");
    return;
  }

  if (confirm(`¿Deseas eliminar las ${cantidadCompletadas} tareas completadas?`)) {
    estado.tareas = estado.tareas.filter((tarea) => !tarea.completada);
    guardarTareasEnStorage();
    renderizarAplicacion();
    console.log(`[CRUD - Limpieza]: Se eliminaron ${cantidadCompletadas} tareas.`);
  }
}

// ============================================================================
// 5. RENDERIZADO VISUAL EN EL DOM
// ============================================================================

/**
 * Genera el nodo HTML para una sola tarea.
 * 
 * @param {Object} tarea - Objeto de la tarea a renderizar.
 * @returns {HTMLLIElement} Elemento listo para ser inyectado en el DOM.
 */
function crearElementoTarea(tarea) {
  const li = document.createElement("li");
  li.className = `task-item ${tarea.completada ? "completed" : ""}`;
  li.dataset.id = tarea.id;

  // Contenedor clicable con checkbox y texto
  const contenedorInfo = document.createElement("div");
  contenedorInfo.className = "task-content";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = tarea.completada;
  checkbox.setAttribute("aria-label", `Marcar como completada: ${tarea.texto}`);

  const spanTexto = document.createElement("span");
  spanTexto.className = "task-text";
  spanTexto.textContent = tarea.texto;

  contenedorInfo.appendChild(checkbox);
  contenedorInfo.appendChild(spanTexto);

  // Fecha / hora de creación
  const spanFecha = document.createElement("span");
  spanFecha.className = "task-date";
  spanFecha.textContent = tarea.fechaCreacion;

  // Botón de eliminación
  const btnBorrar = document.createElement("button");
  btnBorrar.className = "btn-delete";
  btnBorrar.type = "button";
  btnBorrar.innerHTML = "×";
  btnBorrar.title = "Eliminar tarea";
  btnBorrar.setAttribute("aria-label", `Eliminar tarea ${tarea.texto}`);

  // Eventos específicos por elemento
  checkbox.addEventListener("change", () => alternarCompletada(tarea.id));
  btnBorrar.addEventListener("click", () => eliminarTarea(tarea.id));

  li.appendChild(contenedorInfo);
  li.appendChild(spanFecha);
  li.appendChild(btnBorrar);

  return li;
}

/**
 * Aplica el filtro activo (todas, pendientes, completadas) al arreglo de tareas.
 * 
 * @returns {Array<Object>} Arreglo filtrado.
 */
function obtenerTareasFiltradas() {
  switch (estado.filtroActual) {
    case "pendientes":
      return estado.tareas.filter((t) => !t.completada);
    case "completadas":
      return estado.tareas.filter((t) => t.completada);
    case "todas":
    default:
      return estado.tareas;
  }
}

/**
 * Orquesta la actualización integral de la interfaz de usuario.
 */
function renderizarAplicacion() {
  // 1. Limpiar lista actual
  listaTareas.innerHTML = "";

  // 2. Obtener tareas según el filtro
  const tareasParaMostrar = obtenerTareasFiltradas();

  // 3. Manejo de estado vacío
  if (tareasParaMostrar.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `
      <div class="empty-icon">📝</div>
      <p>No hay tareas en esta categoría.</p>
    `;
    listaTareas.appendChild(emptyState);
  } else {
    // 4. Inyectar elementos li
    tareasParaMostrar.forEach((tarea) => {
      const nodo = crearElementoTarea(tarea);
      listaTareas.appendChild(nodo);
    });
  }

  // 5. Actualizar contador de tareas pendientes
  const cantidadPendientes = estado.tareas.filter((t) => !t.completada).length;
  contadorPendientes.textContent = `${cantidadPendientes} tarea${cantidadPendientes === 1 ? "" : "s"} pendiente${cantidadPendientes === 1 ? "" : "s"}`;
}

// ============================================================================
// 6. ASIGNACIÓN DE EVENTOS PRINCIPALES
// ============================================================================

// Formulario de inserción
formNuevaTarea.addEventListener("submit", (evento) => {
  evento.preventDefault();
  agregarTarea(inputTarea.value);
  inputTarea.value = "";
  inputTarea.focus();
});

// Botones de filtro de estado
botonesFiltro.forEach((boton) => {
  boton.addEventListener("click", () => {
    botonesFiltro.forEach((b) => b.classList.remove("active"));
    boton.classList.add("active");
    estado.filtroActual = boton.dataset.filtro;
    renderizarAplicacion();
  });
});

// Botón para vaciar completadas
btnLimpiarCompletadas.addEventListener("click", limpiarCompletadas);

// ============================================================================
// 7. INICIALIZACIÓN DE LA APLICACIÓN
// ============================================================================
renderizarAplicacion();
console.log("=== PROYECTO INTEGRADOR INICIALIZADO ===");
console.log("Tareas cargadas:", estado.tareas);
