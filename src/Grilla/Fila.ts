// clase Fila, representa un registro de la tabla
export class Fila {
  private datos: any;

  constructor(valores: any) {
    // copiamos los valores iniciales adentro
    this.datos = { ...valores };
  }

  // getter para leer un campo
  public getCampo(col: string): any {
    return this.datos[col];
  }

  // setter para modificar o agregar un campo
  public setCampo(col: string, valor: any): void {
    this.datos[col] = valor;
  }

  // devuelve un objeto plano para renderizar en React
  public toObjeto(): any {
    return { ...this.datos };
  }
}