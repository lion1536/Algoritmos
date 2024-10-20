import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

async function calcularFatorial(n) {
  if (n < 0) {
    return "Erro: Número negativo não tem fatorial.";
  } else if (n === 0) {
    return 1;
  } else {
    let fatorial = 1;
    for (let i = 1; i <= n; i++) {
      fatorial *= i;
    }
    return fatorial;
  }
}

async function main() {
  let numero;
  while (true) {
    numero = await rl.question("Digite um número inteiro não negativo: ");
    numero = parseInt(numero);

    if (!isNaN(numero) && numero >= 0) {
      break;
    } else {
      console.log(
        "Entrada inválida. Por favor, insira um número inteiro não neativo,"
      );
    }
  }

  const resultado = await calcularFatorial(numero);
  console.log(`O fatorial de ${numero} é ${resultado}`);
  rl.close();
}

main();
