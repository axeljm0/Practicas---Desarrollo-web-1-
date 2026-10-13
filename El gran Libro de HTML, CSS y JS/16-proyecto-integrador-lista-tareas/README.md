# Ejercicio 16: Proyecto Integrador - Lista de Tareas (To-Do List)

## Objetivo
Consolidar e integrar todos los conceptos fundamentales de JavaScript aprendidos a lo largo del manual en una aplicación web interactiva completa: modelado de entidades con **Objetos literales**, colecciones y métodos de orden superior con **Arreglos**, flujo de control con **Funciones puras y con retorno**, actualización del árbol del **DOM**, manejo de eventos con **`addEventListener`**, manipulación de fechas con el objeto **`Date`** y persistencia en el navegador mediante **`localStorage`**.

## Conceptos Aplicados
- **Estructura y modularidad:** Funciones separadas por responsabilidad única (lógica CRUD, persistencia y renderizado).
- **Objetos literales:** Cada tarea se modela como `{ id, texto, completada, fechaCreacion }`.
- **Arreglos y programación funcional:** Uso de `.filter()`, `.map()`, `.unshift()` y desestructuración sin mutar estado directamente.
- **Manipulación dinámica del DOM:** Creación de nodos con `document.createElement`, atributos accesibles `aria-label`, clases dinámicas con `classList` y delegación de eventos.
- **Objeto estándar Date:** Generación de marcas de hora legibles (`HH:MM`).
- **Almacenamiento persistente:** Uso de la API `localStorage` con serialización `JSON.stringify()` y deserialización `JSON.parse()`.

## Instrucciones
1. Abre `index.html` en el navegador.
2. Observarás que la aplicación carga tres tareas educativas predeterminadas para experimentar de inmediato.
3. **Agregar una tarea:** Escribe un texto en el campo superior (ej: "Repasar eventos del DOM") y haz clic en **＋ Agregar** (o presiona `Enter`).
4. **Completar una tarea:** Haz clic sobre la casilla de verificación (checkbox) o sobre el texto de la tarea; verás cómo se tacha y se atenúa.
5. **Filtrar tareas:** Usa los botones **Todas**, **Pendientes** y **Completadas** para alternar la vista activa.
6. **Eliminar una tarea:** Haz clic en el botón de la cruz `×` a la derecha de cualquier tarea.
7. **Limpiar completadas:** Haz clic en el enlace inferior **Borrar tareas completadas** para depurar la lista.
8. **Prueba de persistencia:** Recarga la página (`F5` o `Ctrl+R`) y comprueba que todas tus tareas y estados se conservan intactos gracias a `localStorage`.

## Captura / Resultado Esperado
- Una tarjeta principal blanca centrada con sombra sutil y esquinas redondeadas.
- Campo de entrada con botón índigo `＋ Agregar`.
- Barra de estado con tres filtros interactivos y contador dinámico (ej: `2 tareas pendientes`).
- Listado de tareas con checkbox azul, texto tachado cuando está completada, etiqueta de hora y botón de eliminación rojo al hacer *hover*.
- Indicador inferior de sincronización: `💾 Sincronizado en LocalStorage`.

## Código Clave Explicado
```javascript
// 1. Modelado de la tarea con un Objeto Literal
function agregarTarea(texto) {
  const nuevaTarea = {
    id: Date.now(), // Identificador numérico único
    texto: texto.trim(),
    completada: false,
    fechaCreacion: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  // Inserción en el array de estado
  estado.tareas.unshift(nuevaTarea);
  
  // Persistencia y actualización visual
  guardarTareasEnStorage();
  renderizarAplicacion();
}

// 2. Alternar estado con inmutabilidad usando .map()
function alternarCompletada(id) {
  estado.tareas = estado.tareas.map(t => 
    t.id === id ? { ...t, completada: !t.completada } : t
  );
  guardarTareasEnStorage();
  renderizarAplicacion();
}
```
> **Explicación didáctica:** Este proyecto sigue el patrón arquitectónico unidireccional moderno: cualquier cambio del usuario modifica primero el **Estado en memoria (`estado.tareas`)**, se guarda en **LocalStorage**, y finalmente se dispara la función de **Renderizado (`renderizarAplicacion`)** para sincronizar el DOM. De este modo, la interfaz gráfica siempre es un reflejo puro del estado de los datos.

## Retos Adicionales
1. **Edición en línea:** Permite hacer doble clic sobre el texto de una tarea para convertirlo en un `<input>` editable y guardar las modificaciones con `Enter`.
2. **Prioridades con colores:** Agrega un selector de prioridad ("Alta", "Media", "Baja") al crear la tarea y muéstrala como una insignia de color (*badge*).
3. **Buscador de tareas:** Añade un campo de búsqueda en tiempo real que filtre dinámicamente las tareas mientras el usuario escribe mediante el evento `input`.
