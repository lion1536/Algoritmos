import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

const alunos = [];

async function adicionarAluno() {
  const nome = await rl.question("Digite o nome do aluno: ");
  const notasStr = await rl.question(
    "Digite as notas do aluno (separadas por espaço): "
  );
  const notas = notasStr.split(" ").map(Number);
  alunos.push({ nome, notas });
}

function calcularMedia(notas) {
  const soma = notas.reduce((acc, nota) => acc + nota, 0);
  return soma / notas.length;
}

function determinarResultado(media) {
  const mediaMinima = 6;
  return media >= mediaMinima ? "Aprovado" : "Reprovado";
}

async function exibirRelatorio() {
  console.log("\n--- Relatório Final ---");
  for (const aluno of alunos) {
    const media = calcularMedia(aluno.notas);
    const resultado = determinarResultado(media);
    console.log(`Aluno: ${aluno.nome}`);
    console.log(`Notas: ${aluno.notas.join(", ")}`);
    console.log(`Média: ${media.toFixed(2)}`);
    console.log(`Resultado: ${resultado}\n`);
  }
}

async function main() {
  let continuar = true;
  while (continuar) {
    await adicionarAluno();
    const resposta = await rl.question("Deseja adicionar outro aluno? (s\n):");
    continuar = resposta.toLocaleLowerCase() === "s";
  }
  await exibirRelatorio();
  rl.close();
}

main().catch((err) => console.error(err));
