# Ejercicio 07: Métodos en Objetos y palabra clave 'this'

## Objetivo
Comprender la diferencia entre propiedades (datos) y métodos (funciones que operan sobre esos datos) dentro de un objeto en JavaScript, y dominar el uso de la palabra clave `this` como referencia al objeto que ejecuta el método.

## Conceptos Aplicados
- Declaración de métodos en objetos literales: `objeto = { metodo: function() { ... } }`.
- Contexto de ejecución y enlace implícito de `this`.
- Encapsulamiento de comportamiento y estado.
- Manejo de excepciones y validaciones de estado en métodos.

## Instrucciones
1. Abre `index.html` en el navegador.
2. Observa la descripción inicial en la caja central generada por `vehiculo.descripcion()`.
3. Haz clic en **Alternar Motor (Encender/Apagar)** para encender el vehículo.
4. Presiona **Llamar a vehiculo.acelerar() (+20 km/h)** un par de veces. Nota cómo la velocidad sube y el texto descriptivo se actualiza automáticamente reflejando la nueva velocidad y el estado del motor.
5. Si intentas acelerar con el motor apagado, se desplegará una alerta preventiva.
6. Haz clic en **Llamar a vehiculo.frenar()** para detener el vehículo a 0 km/h.

## Captura / Resultado Esperado
- Un panel turquesa con icono de coche y descripción dinámica entre comillas:
  - `"Este vehículo es un Toyota Corolla Hybrid (Año 2024). Se encuentra con el motor encendido y viaja a 40 km/h."`
- Dos tarjetas de instrumentación:
  - `Estado del Motor: Encendido 🟢`
  - `Velocímetro: 40 km/h`
- Al pulsar los botones, el texto de la descripción y los medidores se recalculan llamando a los métodos del objeto.

## Código Clave Explicado
```javascript
const vehiculo = {
  marca: "Toyota",
  modelo: "Corolla Hybrid",
  anio: 2024,
  motorEncendido: false,
  velocidadActual: 0,

  // Método que utiliza 'this' para leer sus propias propiedades
  descripcion: function () {
    const estadoMotor = this.motorEncendido ? "encendido" : "apagado";
    return `Este vehículo es un ${this.marca} ${this.modelo} (Año ${this.anio}). Se encuentra con el motor ${estadoMotor} y viaja a ${this.velocidadActual} km/h.`;
  }
};

// Invocación del método:
console.log(vehiculo.descripcion());
```
> **Explicación didáctica:** En JavaScript tradicional, `this` no se determina cuando la función se escribe, sino cuando se **invoca**. Al llamar `vehiculo.descripcion()`, JavaScript asigna automáticamente `this = vehiculo`. Si usaras una función flecha `() => {}`, `this` perdería este enlace y apuntaría al ámbito léxico superior (`window`), por lo que en métodos de objetos literales se usan funciones tradicionales.

## Retos Adicionales
1. **Pérdida de contexto con funciones flecha:** Cambia el método `descripcion` por una función flecha (`descripcion: () => { ... }`) y observa en la consola qué ocurre con `this.marca` (será `undefined`).
2. **Método con cálculo de combustible:** Agrega una propiedad `tanqueCombustible: 50` (litros) y haz que cada acelerada reste 2 litros. Si el combustible llega a cero, el motor debe apagarse automáticamente.
3. **Desestructuración con 'this':** Simplifica el método `descripcion` extrayendo las propiedades al inicio con desestructuración: `const { marca, modelo, anio } = this;`.
