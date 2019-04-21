const el = document.querySelector("div");

function addLabel(element, text) {
    const coordinates = el.getBoundingClientRect();
    console.log(coordinates);
    const message = document.createElement("p");
    el.onmouseover = () => {
        message.style.cssText = `
            position: absolute; 
            top: ${coordinates.top - 20}px;
            left: ${coordinates.left}px;
            color: orangered;
            font-weight: bold;
            margin:0;
        `;
        message.textContent = text;
        document.body.appendChild(message);
    };
    el.onmouseleave = () => document.body.removeChild(message);
}

addLabel(el, "That is True)!");
