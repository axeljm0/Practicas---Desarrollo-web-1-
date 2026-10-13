# Ejercicio 06: Objetos Literales

## Objetivo
Aprender a estructurar información compleja del mundo real mediante **objetos literales** en JavaScript, dominando la sintaxis de llaves `{}` con pares `clave: valor`, y practicando el acceso tanto por **notación de punto** (`objeto.propiedad`) como por **notación de corchetes** (`objeto["propiedad"]`).

## Conceptos Aplicados
- Sintaxis de objetos literales (`const obj = { k: v }`).
- Tipos de datos en propiedades (cadenas, números, booleanos).
- Notación de punto vs notación de corchetes.
- Mutabilidad de objetos: modificación dinámica de propiedades existentes.
- Serialización a formato legible con `JSON.stringify(objeto, null, 2)`.

## Instrucciones
1. Abre `index.html` en el navegador.
2. Observa la tarjeta del libro que visualiza los datos del objeto: título, autor, año de publicación, número de páginas, género y estado de disponibilidad.
3. Haz clic en el botón **Alternar Disponibilidad (Prestar/Devolver)**: nota cómo la propiedad booleana cambia de `true` a `false`, la insignia pasa de verde ("Disponible") a rojo ("Prestado"), y el visor JSON inferior refleja el cambio inmediatamente.
4. Haz clic en **Actualizar Año de Edición** para ingresar un año diferente y verificar la mutabilidad de propiedades numéricas.

## Captura / Resultado Esperado
- Una ficha bibliográfica con portada azul y texto `Cien años de soledad` por `Gabriel García Márquez`.
- Cuatro tarjetas con las propiedades del libro.
- Una insignia de estado interactiva (`Disponible` o `Prestado`).
- Una consola de código oscuro en la parte inferior mostrando la estructura JSON en vivo del objeto en memoria:
  ```json
  {
    "titulo": "Cien años de soledad",
    "autor": "Gabriel García Márquez",
    "anioPublicacion": 1967,
    "paginas": 471,
    "genero": "Realismo mágico",
    "disponible": true
  }
  ```

## Código Clave Explicado
```javascript
// Definición del objeto literal con 6 propiedades
const libro = {
  titulo: "Cien años de soledad",
  autor: "Gabriel García Márquez",
  anioPublicacion: 1967,
  paginas: 471,
  genero: "Realismo mágico",
  disponible: true
};

// Acceso con notación de punto
console.log(libro.titulo); // "Cien años de soledad"

// Acceso con notación de corchetes (útil cuando la clave es dinámica o contiene guiones)
console.log(libro["autor"]); // "Gabriel García Márquez"

// Mutabilidad de propiedades:
libro.disponible = false; // El objeto ahora figura como prestado
```
> **Explicación didáctica:** Los objetos literales son la base de la programación orientada a objetos en JavaScript. Permiten agrupar variables relacionadas bajo una entidad lógica cohesiva.

## Retos Adicionales
1. **Propiedad de tipo Array:** Agrega una propiedad `personajes: ["Aureliano Buendía", "Úrsula Iguarán", "José Arcadio"]` y muestra la lista de personajes en el DOM.
2. **Propiedad Anidada:** Añade un objeto anidado `editorial: { nombre: "Editorial Sudamericana", ciudad: "Buenos Aires" }` y accede a él usando encadenamiento (`libro.editorial.nombre`).
3. **Eliminar propiedades:** Prueba el operador `delete libro.genero` y verifica cómo desaparece del inspector JSON.
