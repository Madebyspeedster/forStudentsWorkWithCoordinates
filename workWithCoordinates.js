const el = document.querySelector("div");

function addLabel(element, text) {
    const coordinates = el.getBoundingClientRect();
    console.log(coordinates);
    const message = document.createElement("p");
    message.style.cssText = `
            position: fixed; 
            top: ${coordinates.top - 10}px;
            left: ${(coordinates.left) }px;
            color: orangered;
            font-weight: bold;
        `;
    message.textContent = text;
    el.onmouseover = () => document.body.appendChild(message);
    el.onmouseleave = () => document.body.removeChild(message);
}

addLabel(el, "That is True!)!");
