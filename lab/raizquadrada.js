import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

try {
  const input = await rl.question("Digite um número: ");
  const numero = parseFloat(input);
  const matematica = Math.sqrt(numero);
  console.log(`A raiz quadrada de ${numero} é ${matematica}`);
} finally {
  rl.close();
}
