export class ValidadorCnpj {

  private primeiroDigito: number;
  private segundoDigito: number;
  private modulo11: number = 11;

  validar(numero: string): boolean {
    if (numero != '' && numero != null) {
      let pesoPrimeiroDV: number[] = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      let pesoSegundoDV: number[] = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      this.primeiroDigito = this.digitoVerificador(numero, pesoPrimeiroDV);
      this.segundoDigito = this.digitoVerificador(numero.concat(String(this.primeiroDigito)), pesoSegundoDV);
      let digitoVerificador: string = String(this.primeiroDigito).concat(
        String(this.segundoDigito)
      );
      if (digitoVerificador == numero.substr(12, 2)) {
        return true;
      } else {
        return false;
      }
    }
  }

  private digitoVerificador(digitos: string, peso: number[]): number {
    let digito: number;
    let somaDigito: number = Number.parseInt(
      digitos.split('', peso.length).reduce((soma, valor, index) => {
        return String(
          Number.parseInt(soma) * (index == 1 ? peso[index - 1] : 1) + Number.parseInt(valor) * peso[index]
        );
      })
    );
    let resto: number = somaDigito % this.modulo11;
    if (resto < 2) {
      digito = 0;
    } else {
      digito = this.modulo11 - resto;
    }
    return digito;
  }

}
