import React, { useState } from "react";
import ReactDOM from "react-dom";

function css(strings) {
  let style = document.getElementById("css-in-js-style-thing");
  if (!style) {
    style = document.createElement("style");
    style.id = "css-in-js-style-thing";
    document.head.appendChild(style);
  }

  const randomClassId = Math.random().toString(36).slice(2);
  style.textContent += `
.${randomClassId} {
${strings[0]}
}`;
  return randomClassId;
}

async function runPHP(code) {
  const res = await fetch("/rpc/rce", {
    method: "POST",
    body: JSON.stringify({ code: code }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}

const appStyles = css`
  margin: 3rem auto;
  max-width: 600px;
  padding: 0 1rem;
`;

const App = () => (
  <div className={appStyles}>
    <h1>React use PHP demo</h1>
    <Demo />
  </div>
);

const Demo = () => {
  const [output, setOutput] = useState(null);
  const helloWorld = async () => {
    "use php";

    echo "Hello world from PHP " . time();
    echo "\n";
    phpinfo();
  };
  const onClick = async () => {
    const out = await helloWorld();
    setOutput(out.stdout);
  };

  return (
    <div>
      <button onClick={onClick}>Run PHP code!</button>
      <p>Output from PHP:</p>
      <pre>{ output }</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
