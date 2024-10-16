import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Ian's Idle Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const buttonEmoji = "⚡";

let counter: number = 0;

interface Event {
  handleEvent(): void;
}

const buttonClick: Event = {
  handleEvent() {
    counter += 1;
    counterDisplay.innerHTML = `${counter} energy`;
  },
};

const button = document.createElement("button");
button.innerHTML = buttonEmoji;
button.addEventListener("click", buttonClick);
app.append(button);

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter} energy`;
app.append(counterDisplay);
