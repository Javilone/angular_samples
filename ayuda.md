En esta carpeta se instaló Angular de forma "local"

```
npm i @angular/cli
```

Crear la primera app en la carpeta "solution", elegir tipo de motor de estilos y seleccioné "no" para crear una single page application.

```
npx ng new app
```

Para generar un componente nuevo:

- Lo importamos en el app.component.ts
- Lo aplicamos en el app.component.html

```
npx ng c utils/search
```

## Interpolation

```ts
class MyComponent {
  publicPropery = "Cualquier valor";
}
```

```html
<p>{{publicProperty }}</p>
```

## Bindings

- Attribute Binding '[]'
  - Primitives: string, number, obj, date... Not functions.
- Event Binding '()'
  - Feed with 'callback': Class Component method.

```ts
class MyComponent {
  publicPropery = "Cualquier valor";

  myValue = "un valor...";

  inputEvent($event: any) {
    this.myValue = $event.target.value;
  }
}
```

```html
<p>{{publicProperty }}</p>

<input [value]="myValue" (input)="inputEvent($event)" />
```

## Custom Events

Para hacer un custom event necesitamos

- @Output
  - Para registrar el atributo de evento para poder pasar un callback (enlazarlo).
- EventEmitter
  - Permite lanzar el evento.

## Directives

En Angular, una directiva es una función especial que puedes aplicar a elementos del DOM para modificar su comportamiento o apariencia (cambia el template).

## Directiva estructural

- NgFor

## Formularios

- Template - Usan el motor de validaciones de HTML5
  - Required, min, max... y los atributos que se usen en HTML5
- Reactive - El motor de validaciones las pone Angular y permiten mayor control inyectando nuestro propio código

- Directiva 'ngModel'
  - Acumula validaciones a nivel de campo de formulario.
  - Two way binding.
- Directiva 'ngForm' recibe notificaciones de todos los ngModel bajo su tutela (childrens) y decide en función de las notificaciones recibidas si el formulario es válido o no.

## Dependency Injection

```ts
class Employee {

  constructor(private salaryReport: SalaryReport;()) { // <-- Hacer esto es la inyección de dependencia. Si recibes la dependencia por el constructor (desde otra parte), es fácilmente reemplazable por otra cosa
    // salaryReport = new SalaryReport(); // Tiene dependencia de la class SalaryReport
  }

  calcSalary() {
    this.salaryReport....etc();
  }
}

class SalaryReport {
  getSalaryByHour(hours: number) {}

  getSalaryByRole(role: string) {}
}
```
