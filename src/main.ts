import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Ian's Idle Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;

const upgradeDict: { [name: string]: upgradeData } = {};

interface Event {
  handleEvent(): void;
}

function checkUpgradesDisabled() {
  for (const key in upgradeDict) {
    const upgrade = upgradeDict[key];
    if (upgrade.disabled && counter >= upgrade.currentCost) {
      upgrade.disabled = false;
      upgrade.button.disabled = false;
    } else if (!upgrade.disabled && counter < upgrade.currentCost) {
      upgrade.disabled = true;
      upgrade.button.disabled = true;
    }
  }
}

function incrementCounter(delta: number) {
  counter += delta;
  counterDisplay.innerHTML = `${counter.toFixed(2)} watts`;
  checkUpgradesDisabled();
}

const buttonClick: Event = {
  handleEvent() {
    incrementCounter(1);
  },
};

// const upgradeClick: Event = {
//   handleEvent() {
//     incrementCounter(-10);
//     growthRate += 1;
//   },
// };

interface upgradeData {
  amount: number;
  button: HTMLButtonElement;
  event: Event;
  disabled: boolean;
  currentCost: number;
}

let elapsed = 0;
let growthRate = 0;

function animationHandler(timeStamp: number) {
  incrementCounter(((timeStamp - elapsed) * growthRate) / 1000);
  elapsed = timeStamp;
  requestAnimationFrame(animationHandler);
}

const buttonEmoji = "⚡";
const button = document.createElement("button");
button.innerHTML = buttonEmoji;
button.className = "zap"
button.addEventListener("click", buttonClick);
app.append(button);

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter.toFixed(2)} watts`;
counterDisplay.className = "counter";
app.append(counterDisplay);

const divider = document.createElement("hr");
divider.className = "redsolid";
app.append(divider);

function addUpgradeButton(
  name: string,
  symbol: string,
  cost: number,
  growthIncrease: number,
  description: string,
) {
  const myButton = document.createElement("button");
  myButton.innerHTML = symbol;
  myButton.title = description;
  const myEvent: Event = {
    handleEvent() {
      incrementCounter(-1 * upgradeDict[name].currentCost);
      growthRate += growthIncrease;
      upgradeDict[name].amount += 1;
      upgradeDict[name].currentCost *= 1.15;
      updateGrowthDisplays();
    },
  };
  myButton.addEventListener("click", myEvent);
  myButton.disabled = true;
  const thisUpgrade: upgradeData = {
    amount: 0,
    button: myButton,
    event: myEvent,
    disabled: true,
    currentCost: cost,
  };
  upgradeDict[name] = thisUpgrade;
  app.append(myButton);
}

// const upgradeEmoji = "🏭";
// const upgradeButton = document.createElement("button");
// upgradeButton.innerHTML = upgradeEmoji;
// upgradeButton.addEventListener("click", upgradeClick, 1, 10);
// upgradeButton.disabled = true;
// app.append(upgradeButton);

interface Item {
  name: string;
  icon: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Boulder Pusher",
    icon: "🧱",
    cost: 10,
    rate: 0.1,
    description: `Hire someone to push a boulder up a hill to let it roll back down, generating a miniscule amount of energy. 'One must imagine Sisyphus happy.'`,
  },
  {
    name: "Simple Generator",
    icon: "🧲",
    cost: 100,
    rate: 2,
    description: `Purchase a hand-cranked generator, capable of generating a modest amount of energy, but still not very much`,
  },
  {
    name: "Windmill",
    icon: "🪁",
    cost: 1000,
    rate: 50,
    description:
      "Your forays into energy have netted you a minor plot of land, which allows you to build windmills, capable of producing more energy. A decent improvement, but you can dream higher still.",
  },
  {
    name: "Hydroelectric Dam",
    icon: "🌊",
    cost: 10000,
    rate: 1500,
    description:
      "With a veritable army of windmills behind you, you have been granted access to a major river in your country, allowing you to build dams along its length, tapping into its vast power to generate a respectable amount of energy.",
  },
  {
    name: "Power Station",
    icon: "🏭",
    cost: 100000,
    rate: 60000,
    description:
      "A centralized engine for mixed-production energy creation. Most conventional means from natural gas to geothermal to coal power are all done here, allowing you to generate significant amounts of energy. Being placed in charge of one - much less many - is a high honor.",
  },
  {
    name: "Nuclear Plant",
    icon: "☢️",
    cost: 1000000,
    rate: 2700000,
    description:
      "The zenith of what's capable under current technology. Nuclear Plants split atoms in order to generate massive amounts of energy over long periods of time. Your breakthroughs in fuel recycling have placed you as overseer of all new Nuclear Plants, a high honor which marks you as a trusted official. But can you do better?",
  },
  {
    name: "Fusion Reactor",
    icon: "⚛️",
    cost: 10000000,
    rate: 108000000,
    description:
      "As a trusted official in energy, your breakthroughs into fusion energy are immediately accepted and adopted. A cutting-edge technology capable of creating amounts of energy equivalent to a miniature sun.",
  },
  {
    name: "Dyson Web",
    icon: "🌳",
    cost: 100000000,
    rate: 4860000000,
    description:
      "The ultimate flex of your authority over energy. Send a Tree-like apparatus into orbit around the sun, partially blotting it out with its roots in order to produce a ludicrous amount of energy. Additional Webs increase your coverage. Thankfully, you have no solar plants in your arsenal that will be affected by this incoming ice age.",
  },
];

for (const item of availableItems) {
  addUpgradeButton(
    item.name,
    item.icon,
    item.cost,
    item.rate,
    item.description,
  );
}

// addUpgradeButton("Simple Generator", "🧲", 10, 0.1);
// addUpgradeButton("Power Station", "🏭", 100, 2.0);
// addUpgradeButton("Nuclear Plant", "☢️", 1000, 50.0);

//setInterval(incrementCounter, 1000, 1);
requestAnimationFrame(animationHandler);

function formatItemTypes() {
  let myString: string = ``;
  for (const key in upgradeDict) {
    myString = myString.concat(`${key}s : ${upgradeDict[key].amount}<br/>`);
  }
  return myString;
}

function updateGrowthDisplays() {
  growthRateDisplay.innerHTML = `${growthRate.toFixed(2)} watts/sec`;
  itemTypes.innerHTML = formatItemTypes();
}

const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `${growthRate.toFixed(2)} watts/sec`;
growthRateDisplay.className = "stats";
const itemTypes = document.createElement("div");
itemTypes.innerHTML = formatItemTypes();
itemTypes.className = "stats";
app.append(growthRateDisplay);
app.append(itemTypes);
