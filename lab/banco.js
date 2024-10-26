import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

class Account {
  constructor(accountHolder, password, balance = 0) {
    this.accountHolder = accountHolder;
    this.password = password;
    this.balance = balance;
    this.transactions = [];
  }

  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      this.transactions.push(`Deposited ${amount}`);
      console.log(`Deposited ${amount}`);
    } else {
      console.log("Deposit amount must be positive.");
    }
  }

  withdraw(amount) {
    if (amount <= 0) {
      console.log("Withdrawal amount must be positive.");
      return;
    }
    if (amount > this.balance) {
      console.log("Insufficient funds.");
      return;
    }
    this.balance -= amount;
    this.transactions.push(`Withdrew ${amount}`);
    console.log(`Withdrew ${amount}`);
  }

  transfer(amount, targetAccount) {
    if (amount <= 0) {
      console.log("Transfer amount must be positive.");
      return;
    }
    if (amount > this.balance) {
      console.log("Insufficient funds for transfer.");
      return;
    }
    this.balance -= amount;
    targetAccount.balance += amount;
    this.transactions.push(
      `Transferred ${amount} to ${targetAccount.accountHolder}`
    );
    console.log(`Transferred ${amount} to ${targetAccount.accountHolder}`);
  }

  getTransactions() {
    return this.transactions;
  }

  authenticate(password) {
    return this.password === password;
  }
}

const accounts = [];

const menu = () => {
  console.log(`\n1. Create Account
  2. Deposit
  3. Withdraw
  4. Transfer
  5. View Transactions
  6. Exit`);
};

const start = async () => {
  menu();
  const choice = await rl.question("Enter your choice: ");

  switch (choice) {
    case "1":
      await createAccount();
      break;
    case "2":
      await deposit();
      break;
    case "3":
      await withdraw();
      break;
    case "4":
      await transfer();
      break;
    case "5":
      await viewTransactions();
      break;
    case "6":
      rl.close();
      break;
    default:
      console.log("Invalid choice.");
      await start();
      break;
  }
};

const createAccount = async () => {
  const name = await rl.question("Enter your holder name: ");
  const password = await rl.question("Set a password: ");
  const newAccount = new Account(name, password);
  accounts.push(newAccount);
  console.log(`Account created for ${name}`);
  await start();
};

const findAccount = async (name, password) => {
  const account = accounts.find((acc) => acc.accountHolder === name);
  if (account && account.authenticate(password)) {
    return account;
  }
  console.log("Account not found or incorrect password.");
  return null;
};

const deposit = async () => {
  const name = await rl.question("Enter account holder name: ");
  const password = await rl.question("Enter password: ");
  const account = await findAccount(name, password);

  if (account) {
    const amount = parseFloat(await rl.question("Enter amount to deposit: "));
    account.deposit(amount);
  }
  await start();
};

const withdraw = async () => {
  const name = await rl.question("Enter account holder name: ");
  const password = await rl.question("Enter password: ");
  const account = await findAccount(name, password);

  if (account) {
    const amount = parseFloat(await rl.question("Enter amount to withdraw: "));
    account.withdraw(amount);
  }
  await start();
};

const transfer = async () => {
  const sourceName = await rl.question("Enter source account holder name: ");
  const sourcePassword = await rl.question("Enter source password: ");
  const sourceAccount = await findAccount(sourceName, sourcePassword);

  if (sourceAccount) {
    const targetName = await rl.question("Enter target account holder name: ");
    const targetAccount = accounts.find(
      (acc) => acc.accountHolder === targetName
    );

    if (!targetAccount) {
      console.log("Target account not found.");
    } else {
      const amount = parseFloat(
        await rl.question("Enter amount to transfer: ")
      );
      sourceAccount.transfer(amount, targetAccount);
    }
  }
  await start();
};

const viewTransactions = async () => {
  const name = await rl.question("Enter account holder name: ");
  const password = await rl.question("Enter password: ");
  const account = await findAccount(name, password);

  if (account) {
    console.log(account.getTransactions());
  }
  await start();
};

start();
