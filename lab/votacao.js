import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

class Voter {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.hasVoted = false;
  }

  vote(candidate) {
    if (this.hasVoted) {
      console.log("You have already voted.");
    } else {
      candidate.addVote();
      this.hasVoted = true;
      console.log(`${this.name} voted for ${candidate.name}`);
    }
  }
}

class Candidate {
  constructor(name) {
    this.name = name;
    this.votes = 0;
  }

  addVote() {
    this.votes += 1;
  }

  getVotes() {
    return this.votes;
  }
}

const voters = [];
const candidates = [
  new Candidate("Alice"),
  new Candidate("Bob"),
  new Candidate("Charlie"),
];

const registerVoter = async () => {
  const name = await rl.question("Enter your name: ");
  const id = await rl.question("Enter your ID: ");
  const voter = new Voter(name, id);
  voters.push(voter);
  console.log("Voter registered successfully.");
  await start();
};

const vote = async () => {
  const id = await rl.question("Enter your voter ID: ");
  const voter = voters.find((v) => v.id === id);

  if (voter) {
    console.log("Candidates:");
    candidates.forEach((candidate, index) => {
      console.log(`${index + 1}. ${candidate.name}`);
    });

    const num = await rl.question("Enter candidate number: ");
    const candidate = candidates[parseInt(num) - 1];

    if (candidate) {
      voter.vote(candidate);
    } else {
      console.log("Invalid candidate number.");
    }
  } else {
    console.log("Voter not found.");
  }
  await start();
};

const viewResults = async () => {
  candidates.forEach((candidate) => {
    console.log(`${candidate.name}: ${candidate.getVotes()} votes`);
  });
  await start();
};

const menu = () => {
  console.log(`\n1. Register Voter
2. Vote
3. View Results
4. Exit`);
};

const start = async () => {
  menu();
  const choice = await rl.question("Enter your choice: ");

  switch (choice) {
    case "1":
      await registerVoter();
      break;
    case "2":
      await vote();
      break;
    case "3":
      await viewResults();
      break;
    case "4":
      rl.close();
      break;
    default:
      console.log("Invalid choice.");
      await start();
      break;
  }
};

start();
