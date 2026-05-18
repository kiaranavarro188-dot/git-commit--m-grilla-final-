import { Fila } from './Fila'

// clase Grilla, aca vive la logica de la tabla
export class Grilla {
  // atributos privados, solo se acceden por getters
  private filas: Fila[];
  private columnas: string[];
  private fuente: string;
  private color: string;
  private busqueda: string;
  private fuentes: string[] = ["Arial", "Georgia", "Courier New"];
  private colores: string[] = ["black", "blue", "red"];
  private iFuente: number = 0;
  private iColor: number = 0;

  constructor(datos: any[], columnas: string[]) {
    this.columnas = [...columnas];
    this.filas = datos.map(function (d) { return new Fila(d) });
    this.fuente = this.fuentes[0];
    this.color = this.colores[0];
    this.busqueda = "";
  }

  // metodos para modificar la tabla
  public agregarFila(): void {
    const nueva: any = { id: this.filas.length + 1 };
    for (const col of this.columnas) {
      if (col !== 'id') nueva[col] = 'nuevo';
    }
    this.filas.push(new Fila(nueva));
  }

  public borrarFila(): void {

  this.filas.pop();
}

  public agregarColumna(): void {
    // si ya existe Extra le sumamos un numero
    let nombre = "Extra";
    let n = 1;
    while (this.columnas.includes(nombre)) {
      nombre = "Extra " + n;
      n++;
    }
    this.columnas.push(nombre);
    for (const fila of this.filas) fila.setCampo(nombre, "");
  }

  public cambiarFuente(): void {
    this.iFuente = (this.iFuente + 1) % this.fuentes.length;
    this.fuente = this.fuentes[this.iFuente];
  }

  public renombrarColumna(viejoNombre: string, nuevoNombre: string): void {
  const indice = this.columnas.indexOf(viejoNombre)
  if (indice !== -1) {
    this.columnas[indice] = nuevoNombre
   
    for (const fila of this.filas) {
      const valor = fila.getCampo(viejoNombre)
      fila.setCampo(nuevoNombre, valor)
    }
  }
}

  public cambiarColor(): void {
    this.iColor = (this.iColor + 1) % this.colores.length;
    this.color = this.colores[this.iColor];
  }

  public buscar(texto: string): void {
    this.busqueda = texto;
  }

  public editarFila(indice: number, datos: any): void {
    if (this.filas[indice]) this.filas[indice] = new Fila(datos);


  }
public eliminarFila(indice: number): void {
  // saca la fila del array
  this.filas.splice(indice, 1);
}

public getFila(indice: number): any {
  // devuelve el objeto plano de una fila especifica
  if (this.filas[indice]) {
    return this.filas[indice].toObjeto();
  }

  
  return null;
}


  // getters
  public getFilasFiltradas(): any[] {
    const texto = this.busqueda.toLowerCase();
    return this.filas
      .map(function (f, i) {
        const obj = f.toObjeto();
        obj._indiceOriginal = i; // guardamos el indice original
        return obj;
      })
      .filter(function (obj) {
        if (!texto) return true;
        return Object.values(obj).join(' ').toLowerCase().includes(texto);
      });
  }

  public getColumnas(): string[] { return this.columnas; }
  public getFuente(): string { return this.fuente; }
  public getColor(): string { return this.color; }
  public getBusqueda(): string { return this.busqueda; }
}