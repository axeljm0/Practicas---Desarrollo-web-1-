# Ejercicio 09: Herencia Prototípica con Object.create()

## Objetivo
Entender la herencia prototípica pura en JavaScript, vinculando directamente objetos mediante `Object.create()` para compartir propiedades y métodos a través de la cadena de prototipos (*Prototype Chain*), diferenciando entre propiedades propias y heredadas, y practicando la sobrescritura de métodos (*method overriding*).

## Conceptos Aplicados
- Creación de objetos con prototipo explícito: `Object.create(prototipoPadre)`.
- Cadena de prototipos (*Prototype Chain*).
- Propiedades propias (*own properties*) vs. propiedades heredadas.
- Comprobación con `hasOwnProperty()` y `Object.getPrototypeOf()`.
- Sobrescritura de métodos (*Overriding*).

## Instrucciones
1. Abre `index.html` en tu navegador.
2. Examina el esquema superior que ilustra la relación jerárquica: `perro` -> `animal`.
3. Haz clic en **1. Ejecutar perro.ladrar()**: comprobarás que es un método exclusivo de `perro`.
4. Haz clic en **2. Ejecutar perro.dormir()**: comprobarás que el método no existe físicamente en `perro`, pero JavaScript lo encuentra y ejecuta desde `animal`, enlazando correctamente el `this.nombre` de `perro`.
5. Haz clic en **3. Ejecutar perro.hacerSonido()**: verás cómo la versión canina sobrescribe la versión genérica de animal.
6. Haz clic en **4. Inspeccionar Cadena Prototípica**: observa el diagnóstico en vivo de propiedades propias y prototipos.

## Captura / Resultado Esperado
- Un esquema gráfico con dos bloques coloreados: el prototipo base ámbar (`animal`) y el objeto derivado turquesa (`perro`).
- Cuatro botones de prueba interactiva.
- Una consola de resultados en fondo oscuro que detalla las ejecuciones e inspecciones de prototipos, indicando con colores verde y rojo qué propiedades son propias y cuáles son delegadas.

## Código Clave Explicado
```javascript
// Objeto prototipo base
const animal = {
  esSerVivo: true,
  dormir: function () {
    return `${this.nombre} está descansando... Zzz.`;
  }
};

// Crear 'perro' heredando directamente de 'animal'
const perro = Object.create(animal);

// Añadir propiedades propias
perro.nombre = "Firulais";
perro.raza = "Golden Retriever";

// Invocación: 'dormir' se busca en 'perro', al no hallarse, sube a 'animal'
console.log(perro.dormir()); // "Firulais está descansando... Zzz."
console.log(perro.esSerVivo); // true (heredado)
```
> **Explicación didáctica:** En JavaScript no existe la "copia" de propiedades entre clases como en otros lenguajes. Lo que existe es **delegación**: si un objeto no tiene una propiedad o método, delega la búsqueda a su prototipo en tiempo de ejecución.

## Retos Adicionales
1. **Crear un segundo objeto derivado:** Crea un objeto `gato` usando `Object.create(animal)` con `nombre: "Michi"` y su propio método `maullar()`.
2. **Herencia de múltiples niveles:** Crea un objeto `policia` que herede de `perro` (`Object.create(perro)`), añadiendo `placa: "K9-042"` y comprueba que puede acceder a métodos de `perro`, de `animal` y de `Object.prototype`.
3. **Descriptor de propiedades:** Usa `Object.create(animal, { ... })` con descriptores de propiedad (`value`, `writable`, `enumerable`, `configurable`).
