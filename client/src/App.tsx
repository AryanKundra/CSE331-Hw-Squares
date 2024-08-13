import React, { Component, ChangeEvent, MouseEvent } from "react";
import { solid, Path, Square, toJson } from './square';
import { FileEditor } from "./FileEditor";
import { isRecord } from './record';

type AppState = {
  designName?: string;
  currentDesign?: Square;
  listFiles: string[];
};

export class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { listFiles: [] };
  }

  componentDidMount = (): void => {
    const url = "/api/listFiles";
    fetch(url)
      .then(this.doListResp)
      .catch(() => this.doListError("failed to connect to server"));
  };

  doListResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.doListJson)
        .catch(() => this.doListError("200 response is not valid JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doListError)
        .catch(() => this.doListError("400 response is not text"));
    } else {
      this.doListError(`bad status code ${res.status}`);
    }
  };

  doListJson = (val: unknown): void => {
    if (!isRecord(val)) {
      console.error("bad data from /list: not a record", val);
      return;
    }

    if (Array.isArray(val.listFiles)) {
      const items: string[] = [];
      val.listFiles.forEach(item => items.push(item));
      this.setState({ listFiles: items });
    } else {
      console.error('val.items is not an array');
    }
  };

  doListError = (msg: string): void => {
    console.error(`Error fetching /list: ${msg}`);
  };

  render = (): JSX.Element => {
    const designName = this.state?.designName;
    const currentDesign = this.state?.currentDesign;
    if (designName && currentDesign) {
      return (
        <FileEditor 
          initialState={currentDesign} 
          onSave={this.doSaveClick} 
          onBack={this.doBackClick} 
          fileName={designName} 
        />
      );
    }

    if (this.state.listFiles.length !== 0) {
      return (
        <div>
          <div>
            <h2>Existing Files</h2>
            {this.renderFileList()}
          </div>
          <div>
            <label>
              Enter a name for your square design:
              <input type="text" onChange={this.doNameChangeClick} />
            </label>
            <button onClick={this.doStartEditingClick}>Create</button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <label>
          Enter a name for your square design:
          <input type="text" onChange={this.doNameChangeClick} />
        </label>
        <button onClick={this.doStartEditingClick}>Create</button>
      </div>
    );
  };

  renderFileList = (): JSX.Element[] => {
    const fileListItems: JSX.Element[] = [];
    for (const fileName of this.state.listFiles) {
      fileListItems.push(
        <li key={fileName}>
          <a href="#" onClick={(e) => this.doOpenFileClick(e, fileName)}>
            {fileName}
          </a>
        </li>
      );
    }
    return fileListItems;
  };

  doSquareClick = (path: Path): void => {
    console.log(path);
    alert("Stop that!");
  };

  doSaveClick = (name: string, designData: Square): void => {
    console.log("Saving design data:", designData);
    console.log("Design name:", name);
  
    if (this.state.designName) {
      const body = toJson(designData);
  
      fetch("/api/save", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      })
        .then((res) => this.doSaveResp(res))
        .catch(() => this.doSaveError("failed to connect to server"));
  
      const url = "/api/listFiles";
      fetch(url)
        .then(this.doListResp)
        .catch(() => this.doListError("failed to connect to server"));
  
      console.log("Updated listFiles state:", this.state.listFiles);
    }
  };

  doSaveResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then((data) => this.doSaveJson(data))
        .catch(() => this.doSaveError("200 response is not valid JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doSaveError)
        .catch(() => this.doSaveError("400 response is not text"));
    } else {
      this.doSaveError(`bad status code ${res.status}`);
    }
  };

  doSaveJson = (data: unknown): void => {
    if (!isRecord(data)) {
      console.error("bad data from /complete: not a record", data);
      return;
    }
  };

  doSaveError = (msg: string): void => {
    console.error(`Error fetching /complete: ${msg}`);
  };

  doNameChangeClick = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ designName: event.target.value });
  };

  doStartEditingClick = (): void => {
    if (this.state.designName) {
      this.setState({ currentDesign: solid("blue") });
    }
  };

  doBackClick = (): void => {
    this.setState({ designName: undefined, currentDesign: undefined });

    const url = "/api/listFiles";
    fetch(url)
      .then(this.doListResp)
      .catch(() => this.doListError("failed to connect to server"));
  };

  doOpenFileClick = (event: MouseEvent<HTMLAnchorElement>, fileName: string): void => {
    event.preventDefault();

    fetch(`/api/loadFile?name=${encodeURIComponent(fileName)}`)
      .then(this.doLoadResp)
      .catch(() => this.doLoadError("failed to connect to server"));
  };

  doLoadResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then((data) => this.doLoadJson(data))
        .catch(() => this.doLoadError("200 response is not valid JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doLoadError)
        .catch(() => this.doLoadError("400 response is not text"));
    } else {
      this.doLoadError(`bad status code ${res.status}`);
    }
  };

  doLoadJson = (data: unknown): void => {
    if (!isRecord(data)) {
      console.error("bad data from /complete: not a record", data);
      return;
    }
  };

  doLoadError = (msg: string): void => {
    console.error(`Error fetching /complete: ${msg}`);
  };
}