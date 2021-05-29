function render(element, parentDom) {
    const { type, props = {} } = element;
    const isTextElement = type === "TEXT ELEMENT";

    const dom = isTextElement ?
      document.createTextNode(""):
      document.createElement(type);


    const isListener = function (prop) {
        return prop.startsWith("on");
    };

    const listeners = Object.keys(props).filter((prop) => isListener(prop));
    listeners.forEach((listener) => {
        const eventType = listener.toLowerCase().substring(2);
        dom.addEventListener(eventType, props[listener]);
    });

    const isAttribute = function (prop) {
        return !isListener(prop) && prop !== "children";
    };

    const attributes = Object.keys(props).filter((prop) => isAttribute(prop));
    attributes.forEach((attr) => {
        dom[attr] = props[attr];
    });

    const children = props.children || [];
    children.forEach((child) => {
        render(child, dom);
    });

    parentDom.appendChild(dom);
}
