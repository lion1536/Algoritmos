import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

try {
  const input = await rl.question("Digite os números (separados por espaço): ");
  const numeros = input.split(" ").map(Number);
  let pares = 0;
  let impares = 0;

  for (const num of numeros) {
    if (num % 2 === 0) {
      pares++;
    } else {
      impares++;
    }
  }
  console.log(`Existem ${pares} números pares e ${impares} números ímpares.`);
} finally {
  rl.close();
}
