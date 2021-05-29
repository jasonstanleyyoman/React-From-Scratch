const element = createElement(
    "div",
    {
        id: "container",
    },
    createElement(
        "h1",
        {},
        createElement(TEXT_ELEMENT, { nodeValue: "Hello world" })
    )
);

const root = document.getElementById("root");

render(element, root);
