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
  counterDisplay.innerHTML = `${counter.toFixed(2)} energy`;
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
button.addEventListener("click", buttonClick);
app.append(button);

function addUpgradeButton(
  name: string,
  symbol: string,
  cost: number,
  growthIncrease: number,
) {
  const myButton = document.createElement("button");
  myButton.innerHTML = symbol;
  const myEvent: Event = {
    handleEvent() {
      incrementCounter(-1 * cost);
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

addUpgradeButton("Simple Generator", "🧲", 10, 0.1);
addUpgradeButton("Power Station", "🏭", 100, 2.0);
addUpgradeButton("Nuclear Plant", "☢️", 1000, 50.0);

//setInterval(incrementCounter, 1000, 1);
requestAnimationFrame(animationHandler);

function formatItemTypes() {
  let myString: string = ``;
  for (const key in upgradeDict) {
    console.log("beep");
    myString = myString.concat(`${key}s : ${upgradeDict[key].amount}<br/>`);
  }
  return myString;
}

function updateGrowthDisplays() {
  growthRateDisplay.innerHTML = `${growthRate.toFixed(2)} energy/sec`;
  itemTypes.innerHTML = formatItemTypes();
}

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter.toFixed(2)} energy`;
const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `${growthRate.toFixed(2)} energy/sec`;
const itemTypes = document.createElement("div");
itemTypes.innerHTML = formatItemTypes();
app.append(counterDisplay);
app.append(growthRateDisplay);
app.append(itemTypes);
