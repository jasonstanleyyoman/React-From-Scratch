const TEXT_ELEMENT = "TEXT ELEMENT";

function render(element, parentDom) {
    const { type, props = {} } = element;
    const isTextElement = type === TEXT_ELEMENT;

    const dom = isTextElement
        ? document.createTextNode("")
        : document.createElement(type);

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

function createElement(type, configs, ...args) {
    const props = Object.assign({}, configs);
    const hasChildren = args.length > 0;
    const rawChildren = hasChildren ? [].concat(...args) : [];
    props.children = rawChildren
        .filter((c) => c != null && c !== false)
        .map((c) => (c instanceof Object ? c : createTextElement(c)));
    return { type, props };
}

function createTextElement(value) {
    return createElement(TEXT_ELEMENT, { nodeValue: value });
}
