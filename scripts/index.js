const element = {
  type: "div",
  props: {
      id: "container",
      children: [
          {
            type: "h1",
            props: {
              children: [
                {
                  type: "TEXT ELEMENT",
                  props: {
                    nodeValue: "Hello world"
                  }
                }
              ]
            }
          }
      ],
  },
};

const root = document.getElementById("root");

render(element, root);