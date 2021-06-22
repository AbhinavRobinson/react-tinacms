import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { TinaCMS, TinaCMSProvider, useCMS } from "tinacms";

function App() {
  const cms = new TinaCMS({
    sidebar: true,
  });

  return (
    <TinaCMSProvider cms={cms}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hello Vite + React!</p>
          <ToggleButton />
          <p>
            Edit <code>App.tsx</code> and save to test HMR updates.
          </p>
          <p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            {" | "}
            <a
              className="App-link"
              href="https://vitejs.dev/guide/features.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vite Docs
            </a>
          </p>
        </header>
      </div>
    </TinaCMSProvider>
  );
}

export default App;

const ToggleButton: React.FC = () => {
  const cms = useCMS();
  return (
    <button type="button" onClick={() => cms.toggle()}>
      {cms.enabled ? "Exit Edit Mode" : "Edit This Site"}
    </button>
  );
};
