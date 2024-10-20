import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

try {
  const input = await rl.question("Digite os números (separados por espaço): ");
  const numeros = input.split(" ").map(Number);
  const soma = numeros.reduce((acc, num) => +num, 0);
  const media = soma / numeros.length;
  console.log(`A média dos números é ${media}`);
} finally {
  rl.close();
}
