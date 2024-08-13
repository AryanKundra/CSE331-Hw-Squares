import React, { Component, ChangeEvent, MouseEvent } from "react";

type FilePickerProps = {
  onCreate: (name: string) => void;
  onSelect: (name: string) => void;
  files: string[];
};

type FilePickerState = {
  name: string;
};

export class FilePicker extends Component<FilePickerProps, FilePickerState> {
  constructor(props: FilePickerProps) {
    super(props);
    this.state = { name: '' };
  }

  render = (): JSX.Element => {
    return (
      <div>
        <h3>Files</h3>
        <ul>
          {this.props.files.map(this.renderFile)}
        </ul>
        <input
          type="text"
          value={this.state.name}
          onChange={this.doNameChange}
          placeholder="Enter design name"
        />
        <button onClick={this.doCreateClick}>Create</button>
      </div>
    );
  };

  renderFile = (file: string, index: number): JSX.Element => {
    return (
      <li key={index}>
        <a href="#" onClick={(e) => this.doFileClick(e, file)}>
          {file}
        </a>
      </li>
    );
  };

  doFileClick = (evt: MouseEvent<HTMLAnchorElement>, file: string): void => {
    evt.preventDefault();
    this.props.onSelect(file);
  };

  doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ name: evt.target.value });
  };

  doCreateClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    if (this.state.name.trim()) {
      this.props.onCreate(this.state.name.trim());
      this.setState({ name: '' });
    }
  };
}