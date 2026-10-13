# Ejercicio 10: Objeto Estándar String

## Objetivo
Explorar y dominar los métodos y propiedades nativos del objeto envoltorio `String` en JavaScript para consultar su tamaño, transformar su capitalización, localizar subcadenas, extraer fragmentos y segmentar cadenas en arreglos.

## Conceptos Aplicados
- Propiedad de longitud: `str.length`.
- Métodos de caja: `str.toUpperCase()` y `str.toLowerCase()`.
- Métodos de búsqueda: `str.includes()` y `str.indexOf()`.
- Extracción y reemplazo: `str.slice(inicio, fin)` y `str.replace(buscado, reemplazo)`.
- Conversión a arreglo: `str.split(separador)`.
- Inmutabilidad de las cadenas de texto en JavaScript (los métodos devuelven cadenas nuevas, no alteran la original).

## Instrucciones
1. Abre `index.html` en el navegador.
2. Observa cómo se calculan y visualizan de inmediato las 5 operaciones sobre el texto `"JavaScript es genial"`.
3. Revisa cada una de las 5 tarjetas para entender qué método se usó y qué valor retornó.
4. Si lo deseas, escribe una nueva frase en la caja de texto superior y haz clic en **Analizar Cadena** para ver las 5 operaciones aplicadas a tu propio texto.

## Captura / Resultado Esperado
- Un banner superior azul con `"JavaScript es genial"`.
- 5 tarjetas con resultados:
  1. `Longitud: 20 caracteres (incluye espacios)`
  2. `Mayúsculas: "JAVASCRIPT ES GENIAL" | Minúsculas: "javascript es genial"`
  3. `¿Contiene "genial"?: Sí (true) | Posición (índice) de "es": Índice 11`
  4. `slice(0, 10): "JavaScript" | replace: "JavaScript es increíble"`
  5. `Palabras detectadas (3): ["JavaScript", "es", "genial"]`

## Código Clave Explicado
```javascript
const texto = "JavaScript es genial";

// 1. Longitud
console.log(texto.length); // 20

// 2. Mayúsculas y minúsculas
console.log(texto.toUpperCase()); // "JAVASCRIPT ES GENIAL"

// 3. Búsqueda
console.log(texto.includes("genial")); // true
console.log(texto.indexOf("es")); // 11

// 4. Extracción y sustitución
console.log(texto.slice(0, 10)); // "JavaScript"
console.log(texto.replace("genial", "increíble")); // "JavaScript es increíble"

// 5. Segmentación en arreglo de palabras
const palabras = texto.split(" "); // ["JavaScript", "es", "genial"]
```
> **Explicación didáctica:** En JavaScript, los strings primitivos son inmutables. Cuando invocas un método como `.replace()` o `.toUpperCase()`, JavaScript no modifica la variable original en memoria, sino que devuelve una copia completamente nueva con la transformación aplicada.

## Retos Adicionales
1. **Limpieza de espacios en blanco:** Agrega una demostración con el método `.trim()`, `.trimStart()` y `.trimEnd()` para limpiar entradas con espacios sobrantes.
2. **Reemplazo global:** Utiliza `.replaceAll()` o una expresión regular `/g` para reemplazar múltiples apariciones de una vocal por un asterisco `*`.
3. **Inversor de texto:** Combina `.split("").reverse().join("")` para crear una función que invierta cualquier texto ingresado.
