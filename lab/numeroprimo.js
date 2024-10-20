import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

function primo(n) {
  if (n <= 1) return false;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

try {
  const input = await rl.question("Digite um número: ");
  const numero = parseInt(input);
  if (primo(numero)) {
    console.log(`O número ${numero} é primo.`);
  } else {
    console.log(`O número ${numero} não é primo.`);
  }
} finally {
  rl.close();
}
