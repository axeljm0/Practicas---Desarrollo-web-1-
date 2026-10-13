# Ejercicio 08: Funciones Constructoras y 'new'

## Objetivo
Aprender a definir y utilizar **funciones constructoras** en JavaScript como moldes o plantillas para generar múltiples instancias de objetos con propiedades propias y métodos compartidos eficientemente mediante `prototype`.

## Conceptos Aplicados
- Declaración de funciones constructoras (convención de mayúscula inicial: `Persona`).
- Inicialización de propiedades de instancia mediante `this`.
- El operador `new` y su proceso interno de cuatro pasos.
- Eficiencia de memoria mediante la asignación de métodos a `Persona.prototype`.
- Verificación de tipos mediante `instanceof` y `Object.getPrototypeOf()`.

## Instrucciones
1. Abre `index.html` en el navegador.
2. Comprueba que aparecen en pantalla las 3 instancias iniciales solicitadas:
   - `1. Sofía Ramos` (28 años · Ingeniera de Software)
   - `2. Mateo Fernández` (34 años · Diseñador UX/UI)
   - `3. Elena Gómez` (42 años · Arquitecta Cloud)
3. Haz clic en el botón **Ejecutar .presentarse()** de cualquiera de las tarjetas para invocar el método prototípico en esa instancia específica.
4. Utiliza el formulario superior para crear una cuarta persona y presiona **Instanciar** para ver cómo se añade al listado en memoria y en pantalla.

## Captura / Resultado Esperado
- Un formulario rosado superior con tres campos (Nombre, Edad, Profesión) y botón **Instanciar**.
- Una lista ordenada de tarjetas blancas con borde izquierdo fucsia.
- Al pulsar "Ejecutar .presentarse()", se despliega el mensaje contextualizado de esa persona (por ejemplo: `¡Hola! Soy Sofía Ramos, tengo 28 años y trabajo como Ingeniera de Software.`).

## Código Clave Explicado
```javascript
// Molde constructor
function Persona(nombre, edad, profesion) {
  // Propiedades exclusivas de cada instancia
  this.nombre = nombre;
  this.edad = Number(edad);
  this.profesion = profesion;
}

// Método único compartido en el prototipo (ahorra memoria)
Persona.prototype.presentarse = function () {
  return `¡Hola! Soy ${this.nombre}, tengo ${this.edad} años y trabajo como ${this.profesion}.`;
};

// Creación de 3 instancias con el operador 'new'
const persona1 = new Persona("Sofía Ramos", 28, "Ingeniera de Software");
const persona2 = new Persona("Mateo Fernández", 34, "Diseñador UX/UI");
const persona3 = new Persona("Elena Gómez", 42, "Arquitecta Cloud");
```
> **Explicación didáctica:** Si agregáramos `this.presentarse = function...` dentro del constructor, cada vez que creemos una persona se crearía una función idéntica en memoria. Al colocarla en `Persona.prototype`, existe una sola copia de la función en memoria que todas las instancias comparten a través de la cadena de prototipos.

## Retos Adicionales
1. **Método de cumpleaños:** Agrega el método `Persona.prototype.cumplirAnios = function() { this.edad++; }` y un botón en la tarjeta para aumentar la edad en 1 año.
2. **Constructor sin 'new':** Implementa un chequeo defensivo con `new.target` dentro del constructor para que funcione aunque el programador olvide escribir `new` (`if (!new.target) return new Persona(nombre, edad, profesion);`).
3. **Array de intereses:** Agrega un cuarto parámetro `intereses` (arreglo de strings) y muestra las aficiones de cada persona como etiquetas.
