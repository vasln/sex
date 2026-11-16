const counter = document.querySelector("#counter");
const button = document.querySelector("#helloButton");

let clickCount = 0;

const handle = () => {
    clickCount = clickCount + 1;
    counter.textContent = "Нажатий: " + clickCount;
    if (clickCount > 4) {
        counter.classList.add("text-danger");
    }
};

button.addEventListener("click", handle)