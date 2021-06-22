import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { TinaCMS, TinaProvider, useCMS } from "tinacms";

function App() {
  const [cms] = React.useState(() => {
    return new TinaCMS({
      sidebar: true,
      toolbar: true,
    });
  });

  return (
    <TinaProvider cms={cms} position="displace">
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{PageData.title}</p>
          <ToggleButton />
          <p className="App-link">{PageData.body}</p>
        </header>
      </div>
    </TinaProvider>
  );
}

export default App;

const ToggleButton: React.FC = () => {
  const toggle = useCMS();
  return (
    <button type="button" onClick={() => toggle.toggle()}>
      {toggle.enabled ? "Exit Edit Mode" : "Edit This Site"}
    </button>
  );
};

const PageData = {
  title: "Hello Vite + React!",
  body: "Learn React",
};
