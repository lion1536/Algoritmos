import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

try {
  const input = await rl.question("Digite o primeiro número: ");
  const matematica = await rl.question("DIgite o segundo número: ");
  const numero = await rl.question("Digite o terceiro número: ");
  const valor = parseFloat(input);
  const computer = parseFloat(matematica);
  const processar = parseFloat(numero);
  const soma = valor + computer;

  if (soma > processar) {
    console.log(`A soma de ${valor} e ${computer} é maior que ${processar}`);
  } else if (soma < processar) {
    console.log(`A soma de ${valor} e ${computer} é menor que ${processar}`);
  } else {
    console.log(`A soma de ${valor} e ${computer} é igual a ${processar}`);
  }
} finally {
  rl.close();
}
