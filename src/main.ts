import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Ian's Idle Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;

interface Event {
  handleEvent(): void;
}

function incrementCounter(delta: number) {
  counter += delta;
  counterDisplay.innerHTML = `${counter.toFixed(2)} energy`;
  if (counter >= 10) {
    upgradeButton.disabled = false;
  } else {
    upgradeButton.disabled = true;
  }
}

const buttonClick: Event = {
  handleEvent() {
    incrementCounter(1);
  },
};

const upgradeClick: Event = {
  handleEvent() {
    incrementCounter(-10);
    growthRate += 1;
  },
};

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

const upgradeEmoji = "🏭";
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = upgradeEmoji;
upgradeButton.addEventListener("click", upgradeClick);
upgradeButton.disabled = true;
app.append(upgradeButton);

//setInterval(incrementCounter, 1000, 1);
requestAnimationFrame(animationHandler);

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter.toFixed(2)} energy`;
app.append(counterDisplay);
