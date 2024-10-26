import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

class InventoryItem {
  constructor(name, category, quantity, minQuantity) {
    this.name = name;
    this.category = category;
    this.quantity = quantity;
    this.minQuantity = minQuantity;
  }

  restock(amount) {
    this.quantity += amount;
    console.log(
      `${amount} units of ${this.name} restocked. New quantity: ${this.quantity}`
    );
  }

  consume(amount) {
    if (this.quantity >= amount) {
      this.quantity -= amount;
      console.log(
        `${amount} units of ${this.name} consumed. New quantity ${this.quantity}`
      );
      if (this.quantity < this.minQuantity) {
        console.log(`Warning: ${this.name} is below minimum quantity!`);
      }
    } else {
      console.log("Not enough stock available.");
    }
  }
}

const inventory = [];

const addInventoryItem = async () => {
  const name = await rl.question("Enter item name: ");
  const category = await rl.question("Enter category: ");
  const quantity = parseFloat(await rl.question("Enter quantity: "));
  const minQuantity = parseFloat(await rl.question("Enter minimum quantity: "));

  const item = new InventoryItem(name, category, quantity, minQuantity);
  inventory.push(item);
  console.log("Item added to inventory.");
  await start();
};

const viewInventory = async () => {
  if (inventory.length === 0) {
    console.log("No items in inventory.");
  } else {
    inventory.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.name}, Category: ${item.category}, Quantity: ${
          item.quantity
        }`
      );
    });
  }
  await start();
};

const restockItem = async () => {
  if (inventory.length === 0) {
    console.log("No items to restock.");
    await start();
    return;
  }

  const num = parseInt(await rl.question("Choose item to restock: "));
  const item = inventory[num - 1];

  if (!item) {
    console.log("Invalid item number.");
    await start();
    return;
  }

  const amount = parseFloat(await rl.question("Enter amount to restock: "));
  item.restock(amount);
  await start();
};

const consumeItem = async () => {
  if (inventory.length === 0) {
    console.log("No items to consume.");
    await start();
    return;
  }

  await viewInventory();
  const num = parseInt(await rl.question("Choose item to consume: "));
  const item = inventory[num - 1];

  if (!item) {
    console.log("Invalid item number.");
    await start();
    return;
  }

  const amount = parseFloat(await rl.question("Enter amount to consume: "));
  item.consume(amount);
  await start();
};

const menu = () => {
  console.log(`\n1. Add Inventory Item
    2. View Inventory
    3. Restock Item
    4. Consume Item
    5. Exit`);
};

const start = async () => {
  menu();
  const choice = await rl.question("Enter your choice: ");
  switch (choice) {
    case "1":
      await addInventoryItem();
      break;
    case "2":
      await viewInventory();
      break;
    case "3":
      await restockItem();
      break;
    case "4":
      await consumeItem();
      break;
    case "5":
      rl.close();
      break;
    default:
      console.log("Invalid choice.");
      await start();
  }
};

start();
