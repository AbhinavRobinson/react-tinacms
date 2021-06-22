import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { TinaCMS, TinaProvider, useCMS, useForm, usePlugin } from "tinacms";

function App() {
  const [cms] = React.useState(() => {
    return new TinaCMS({
      sidebar: true,
      toolbar: true,
    });
  });

  return (
    <TinaProvider cms={cms} position="displace">
      <PageContent />
    </TinaProvider>
  );
}

export default App;

const PageContent: React.FC = () => {
  const toggle = useCMS();
  const formConfig = {
    id: "tina-tutorial-index",
    label: "Edit Page",
    fields: [
      {
        name: "title",
        label: "Title",
        component: "text",
      },
      {
        name: "body",
        label: "Body",
        component: "textarea",
      },
    ],
    initialValues: PageData,
    onSubmit: async () => {
      window.alert("Saved!");
    },
  };
  const [editableData, form] = useForm(formConfig);
  usePlugin(form);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{editableData.title}</p>
        <button type="button" onClick={() => toggle.toggle()}>
          {toggle.enabled ? "Exit Edit Mode" : "Edit This Site"}
        </button>
        <p className="App-link">{editableData.body}</p>
      </header>
    </div>
  );
};

const PageData = {
  title: "Hello Vite + React!",
  body: "Learn React",
};
