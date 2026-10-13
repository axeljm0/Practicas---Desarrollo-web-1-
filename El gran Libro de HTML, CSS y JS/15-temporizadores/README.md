# Ejercicio 15: Temporizadores

## Objetivo
Comprender la naturaleza asíncrona de JavaScript en el navegador mediante el uso de temporizadores: repetición periódica con `setInterval`, detención de intervalos con `clearInterval`, ejecución diferida única con `setTimeout` y cancelación defensiva con `clearTimeout`.

## Conceptos Aplicados
- Modelo de concurrencia y *Event Loop* (Web APIs y Task Queue).
- Ejecución periódica: `setInterval(callback, milisegundos)`.
- Cancelación de procesos periódicos: `clearInterval(intervalId)`.
- Programación de tareas diferidas: `setTimeout(callback, milisegundos)`.
- Prevención de fugas de memoria y control defensivo de concurrencia múltiple.
- Formateo temporal con `String.prototype.padStart()`.

## Instrucciones
1. Abre `index.html` en el navegador.
2. Observa la pantalla digital del cronómetro en estado `DETENIDO` con `00:00:00`.
3. Haz clic en **▶ Iniciar**: el contador comenzará a correr con precisión de centésimas de segundo y el indicador cambiará a verde `EN EJECUCIÓN`.
4. Haz clic en **⏸ Pausar** para congelar el tiempo. Pulsa **▶ Iniciar** nuevamente para reanudar desde donde quedó.
5. Haz clic en **⏹ Reiniciar** para regresar el tiempo a ceros.
6. En la sección inferior, ingresa `3` segundos y presiona **⏰ Programar Alarma (seg)**. Observa cómo tras 3 segundos aparece una notificación flotante disparada por `setTimeout`.

## Captura / Resultado Esperado
- Un visor digital negro con dígitos luminosos en color azul cian: `00:14:82`.
- Tres botones con colores semánticos: Iniciar (verde), Pausar (amarillo/naranja) y Reiniciar (rojo).
- Un banner de notificación azul claro que surge tras completarse la cuenta diferida de `setTimeout`.
- Registros limpios en la consola del navegador con los IDs numéricos generados por la Web API.

## Código Clave Explicado
```javascript
let idIntervalo = null;
let centesimas = 0;

// Iniciar repetición cada 10ms
function iniciar() {
  if (idIntervalo !== null) return; // Evita solapamiento de intervalos
  idIntervalo = setInterval(() => {
    centesimas++;
    display.textContent = formatear(centesimas);
  }, 10);
}

// Pausar y liberar memoria
function pausar() {
  clearInterval(idIntervalo);
  idIntervalo = null; // Reiniciar referencia
}

// Ejecución diferida única tras 3000ms (3 segundos)
setTimeout(() => {
  console.log("¡Han pasado 3 segundos!");
}, 3000);
```
> **Explicación didáctica:** `setInterval` no ejecuta el código en un hilo paralelo; JavaScript sigue siendo monohilo (*single-threaded*). El navegador programa la función en la cola de eventos y la ejecuta cada vez que el hilo principal queda libre y se cumple el intervalo. Por eso, si olvidas `clearInterval`, la función continuará consumiendo memoria y CPU indefinidamente.

## Retos Adicionales
1. **Registro de Vueltas (Laps):** Añade un botón "Vuelta (Lap)" que guarde y muestre en una lista los tiempos intermedios sin pausar el cronómetro.
2. **Cuenta Regresiva (Pomodoro):** Implementa un modo que inicie en 25:00 minutos y descuente hasta llegar a cero, disparando una alerta sonora o visual.
3. **Animación CSS sincronizada:** Agrega una barra de progreso que se llene visualmente a medida que transcurre el tiempo programado de la alarma.
