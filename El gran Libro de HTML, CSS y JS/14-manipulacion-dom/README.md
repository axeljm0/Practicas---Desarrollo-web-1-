# Ejercicio 14: Manipulación del DOM

## Objetivo
Aprender los fundamentos de la manipulación del Modelo de Objetos del Documento (**DOM**), seleccionando elementos con `document.getElementById()`, modificando su texto interno de forma segura mediante `textContent`, alterando estilos CSS en línea a través de la propiedad `.style` y conmutando clases con la API `.classList`.

## Conceptos Aplicados
- Selección de nodos del DOM (`document.getElementById`).
- Propiedad de texto plano segura (`element.textContent` vs. `element.innerHTML`).
- Manipulación de estilos en línea (`element.style.color`, `element.style.fontSize`).
- Gestión de clases CSS con `element.classList.toggle()`.
- Registro limpio de escuchadores de eventos mediante `addEventListener('click', handler)`.
- Separación de responsabilidades: estructura en `index.html`, diseño en `styles.css` y comportamiento en `script.js`.

## Instrucciones
1. Abre `index.html` en el navegador.
2. Observa el párrafo central situado en el área punteada.
3. Haz clic en el botón **Cambiar Mensaje**: nota cómo el texto se transforma al instante.
4. Experimenta con la paleta de colores: haz clic en **Azul**, **Verde**, **Rojo** o **Púrpura** para cambiar el color del texto.
5. Haz clic en **Alternar Resaltado** para encender un fondo amarillo fosforescente y en **Alternar Negrita** para cambiar el grosor de la tipografía.
6. Aumenta o reduce el tamaño de la fuente con los botones de tamaño.
7. Revisa la consola inferior donde se imprime la instrucción exacta de la API del DOM ejecutada en cada clic.

## Captura / Resultado Esperado
- Un contenedor central con borde punteado donde el párrafo responde en tiempo real a los clics.
- Un panel organizado en cuatro grupos de botones con colores diferenciados.
- Un pie de página oscuro que documenta las llamadas JavaScript:
  `> parrafoObjetivo.style.color = "#dc2626": Color del texto cambiado a Rojo.`

## Código Clave Explicado
```javascript
const parrafo = document.getElementById("parrafoObjetivo");

// 1. Modificar contenido de texto seguro
parrafo.textContent = "¡Texto actualizado dinámicamente!";

// 2. Modificar propiedad de estilo CSS
parrafo.style.color = "#2563eb"; // Aplica color azul

// 3. Alternar clase CSS
parrafo.classList.toggle("font-bold"); // Añade o quita la clase según esté presente o no
```
> **Explicación didáctica:** El navegador convierte todo documento HTML en un árbol jerárquico de objetos. JavaScript no interactúa directamente con el archivo HTML plano, sino con esta representación viva en memoria llamada DOM. Cada etiqueta se convierte en un nodo `Element` con propiedades y métodos.

## Retos Adicionales
1. **Modo Noche:** Crea un botón que alterne una clase `.dark-mode` sobre el elemento `document.body` invirtiendo los colores de fondo y texto.
2. **Generador de párrafos dinámicos:** Agrega un botón que use `document.createElement("p")` y `appendChild()` para añadir nuevos párrafos a la página.
3. **Contador de caracteres dinámico:** Añade un campo `<input>` y haz que un `<span>` muestre en tiempo real la cantidad de letras que el usuario escribe mediante el evento `input`.
