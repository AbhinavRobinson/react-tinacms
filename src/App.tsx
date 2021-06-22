import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { TinaCMS, TinaProvider, useCMS, useForm, usePlugin } from "tinacms";
import axios from "axios";

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
    async loadInitialValues() {
      return axios.get("http://localhost:3001").then((res) => res.data);
    },
    async onSubmit(formData: { title: any; body: any }) {
      toggle.alerts.info("Saving Content...");
      const data = {
        title: formData.title,
        body: formData.body,
      };
      return axios
        .post("http://localhost:3001", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => console.log(response.data))
        .then(() => toggle.alerts.success("Saved Content!"))
        .catch(() => toggle.alerts.error("Error Saving Content"));
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
