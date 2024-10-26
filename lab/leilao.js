import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

class AuctionItem {
  constructor(name, startingPrice) {
    this.name = name;
    this.startingPrice = startingPrice;
    this.highestBid = startingPrice;
    this.highestBidder = null;
  }

  placeBid(bidder, amount) {
    if (amount > this.highestBid) {
      this.highestBid = amount;
      this.highestBidder = bidder;
      console.log(`New highest bid by ${bidder}: ${amount}`);
    } else {
      console.log("Bid too low.");
    }
  }

  finalizeAuction() {
    if (this.highestBidder) {
      console.log(
        `Auction won by ${this.highestBidder} with a bid of ${this.highestBid}`
      );
    } else {
      console.log("No bids placed.");
    }
  }
}

const items = [];

const addAuctionItem = async () => {
  const name = await rl.question("Enter item name: ");
  const price = parseFloat(await rl.question("Enter starting price: "));
  const item = new AuctionItem(name, price);
  items.push(item);
  console.log("Item added to auction.");
  await start();
};

const placeBid = async () => {
  if (items.length === 0) {
    console.log("No items available for auction.");
    await start();
    return;
  }

  items.forEach((item, index) => {
    console.log(
      `${index + 1}. ${item.name}, Starting at: ${item.startingPrice}`
    );
  });

  const num = parseInt(await rl.question("Choose item to bid on: "));
  const item = items[num - 1];

  if (!item) {
    console.log("Invalid item number.");
    await start();
    return;
  }

  const name = await rl.question("Enter your name: ");
  const bid = parseFloat(await rl.question("Enter your bid: "));
  item.placeBid(name, bid);
  await start();
};

const finalizeAuction = async () => {
  if (items.length === 0) {
    console.log("No items available for auction.");
  } else {
    items.forEach((item) => item.finalizeAuction());
  }
  await start();
};

const menu = () => {
  console.log(`\n1. Add Auction Item
    2. Place Bid
    3. Finalize Auction
    4. Exit`);
};

const start = async () => {
  menu();
  const choice = await rl.question("Enter your choice: ");
  switch (choice) {
    case "1":
      await addAuctionItem();
      break;
    case "2":
      await placeBid();
      break;
    case "3":
      await finalizeAuction();
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
