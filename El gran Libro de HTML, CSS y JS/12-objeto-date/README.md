# Ejercicio 12: Objeto Estándar Date

## Objetivo
Comprender la manipulación de fechas, marcas de tiempo y calendarios en JavaScript mediante la clase nativa `Date`, aprendiendo a extraer sus componentes atómicos (`getFullYear`, `getMonth`, `getDate`, `getDay`), a gestionar el desfase de meses con base 0 y a calcular intervalos temporales como la edad y los días faltantes para un evento.

## Conceptos Aplicados
- Instanciación de fechas con `new Date(año, mes, día)`.
- Métodos extractores:
  - `getFullYear()` para obtener el año en 4 dígitos.
  - `getMonth()` con índice base cero (0 = Enero, 11 = Diciembre).
  - `getDate()` para el día del mes (1 al 31).
  - `getDay()` para el día de la semana (0 = Domingo, 6 = Sábado).
- Aritmética de fechas restando marcas temporales en milisegundos (`.getTime()`).
- Conversión de unidades temporales ($1\text{ día} = 24 \times 60 \times 60 \times 1000\text{ ms} = 86{,}400{,}000\text{ ms}$).

## Instrucciones
1. Abre `index.html` en el navegador.
2. Observa la fecha de nacimiento precargada (`15 de mayo de 1995`).
3. Comprueba el desglose de los 4 getters, la edad calculada y los días faltantes para el próximo aniversario.
4. Selecciona tu propia fecha de nacimiento en el selector `<input type="date">` o escribe una fecha arbitraria y pulsa **Procesar Fecha**.

## Captura / Resultado Esperado
- Dos tarjetas moradas destacadas:
  - `Edad Actual Calculada: 31 años` (según el año en curso)
  - `Días para el Próximo Cumpleaños: XX días`
- 4 cajas con el desglose exacto de los métodos del objeto Date:
  - `.getFullYear()` -> `1995`
  - `.getMonth() (0-11)` -> `4 (Mayo)`
  - `.getDate() (1-31)` -> `15`
  - `.getDay() (0-6)` -> `1 (Lunes)`
- Nota de advertencia pedagógica sobre el índice de los meses.

## Código Clave Explicado
```javascript
// Creación de fecha (año, mesBaseCero, día)
const cumpleanos = new Date(1995, 4, 15); // 4 representa Mayo

// Extracción de componentes
const anio = cumpleanos.getFullYear(); // 1995
const mes = cumpleanos.getMonth(); // 4
const dia = cumpleanos.getDate(); // 15
const diaSemana = cumpleanos.getDay(); // 1 (Lunes)

// Cálculo de días restantes en milisegundos
const unDiaEnMs = 1000 * 60 * 60 * 24;
const diferenciaMs = proximoCumple.getTime() - fechaHoy.getTime();
const diasFaltantes = Math.ceil(diferenciaMs / unDiaEnMs);
```
> **Explicación didáctica:** En JavaScript, el tiempo se mide internamente como la cantidad de milisegundos transcurridos desde el 1 de enero de 1970 a las 00:00:00 UTC (la *Época Unix*). Al restar dos objetos Date, JavaScript resta sus valores numéricos en milisegundos.

## Retos Adicionales
1. **Formato regionalizado:** Muestra la fecha con `toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })`.
2. **Cálculo de minutos u horas vividas:** Agrega una estadística que informe aproximadamente cuántas horas o minutos han transcurrido desde el nacimiento.
3. **Validación de fechas futuras:** Agrega una condición que advierta si el usuario selecciona una fecha posterior a la fecha de hoy.
