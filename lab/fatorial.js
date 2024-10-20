import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

function fatorial(n) {
  if (n === 0) return 1;
  return n * fatorial(n - 1);
}

try {
  const input = await rl.question("Digite um número: ");
  const numero = parseInt(input);
  const resultado = fatorial(numero);
  console.log(`O fatorial de ${numero} é ${resultado}`);
} finally {
  rl.close();
}
