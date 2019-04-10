import React from "react";
import { useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import DropBoxApi from "./DropboxApi";

const App = () => {
  const [code, setCode] = useState("");
  const [db, setDb] = useState(new DropBoxApi());
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          href="https://www.dropbox.com/oauth2/authorize?client_id=2630tnlja6iugdp&redirect_uri=https://www.dropbox.com/1/oauth2/display_token&response_type=token"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Dropbox Token
        </a>
        <input
          value={code}
          onChange={e => {
            setCode(e.target.value);
            db.setAuthToken(e.target.value);
            setDb(db);
          }}
        />
        <button
          onClick={async () => {
            await db.deleteFile("/config.txt").catch(e => {});
            await db.uploadFile({ test: "This is a test" }, "/config.txt");
            const preview = await db.previewURL("/config.txt");
            const content = await axios.get(preview.data.link);
            const config = content.data;
            console.log(config.test);
          }}
        >
          Test Connection
        </button>
      </header>
    </div>
  );
};

export default App;
