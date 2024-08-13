import React, { Component, ChangeEvent, MouseEvent } from "react";
import { Square, Path, getSubtreeRoot, replaceSubtree, solid, split, toColor, Color, dropLast} from './square';
import { SquareElem } from "./square_draw";

type FileEditorProps = {
  /** Initial state of the file. */
  initialState: Square;

  /** Called to ask parent to save file contents in server. */
  onSave: (name: string, root: Square) => void;
  onBack: () => void;
  fileName: string;
};

type FileEditorState = {
  /** The root square of all squares in the design */
  root: Square;

  /** Path to the square that is currently clicked on, if any */
  selected?: Path;
};

/** UI for editing square design page. */
export class FileEditor extends Component<FileEditorProps, FileEditorState> {
  constructor(props: FileEditorProps) {
    super(props);
    this.state = { root: props.initialState };
  }

  render = (): JSX.Element => {
    return (
      <div>
        <SquareElem
          width={600n}
          height={600n}
          square={this.state.root}
          selected={this.state.selected}
          onClick={this.doSquareClick}
        />
        <div>
          {this.renderColorDropbox()}
          <button onClick={this.doSplitClick}>Split</button>
        <button onClick={this.doMergeClick}>Merge</button>
        <button onClick={this.doSaveClick}>Save</button>
          <button onClick={this.doBackClick}>Back</button>
        </div>
      </div>
    );
  };

  renderSplit = (): JSX.Element => {
    const selectedRoot = this.state.root;
    const selectedPath = this.state.selected;

    if (selectedPath !== undefined) {
      const selectedSquare = getSubtreeRoot(selectedRoot, selectedPath);

      if (selectedSquare.kind === "solid") {
        return <button onClick={this.doSplitClick}>Split</button>;
      }
    }

    return <span></span>;
  };

  renderMerge = (): JSX.Element => {
    const selectedRoot = this.state.root;
    const selectedPath = this.state.selected;

    if (selectedPath !== undefined) {
      const selectedSquare = getSubtreeRoot(selectedRoot, selectedPath);

      if (selectedSquare.kind === "split") {
        return <button onClick={this.doMergeClick}>Merge</button>;
      }
    }

    return <span></span>;
  };
  

  renderColorDropbox = (): JSX.Element => {
    const selectedRoot = this.state.root;
    const selectedPath = this.state.selected;

    if (selectedPath !== undefined) {
      const selectedSquare = getSubtreeRoot(selectedRoot, selectedPath);

      if (selectedSquare.kind === "solid") {
        return (
          <select value={selectedSquare.color} onChange={this.doColorChange}>
            <option value="white">white</option>
            <option value="red">red</option>
            <option value="orange">orange</option>
            <option value="yellow">yellow</option>
            <option value="green">green</option>
            <option value="blue">blue</option>
            <option value="purple">purple</option>
          </select>
        );
      }
    }

    return <span></span>;
  };

  doSquareClick = (path: Path): void => {
    this.setState({ selected: path });
  };

  doSplitClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    const selectedPath = this.state.selected;
    const selectedRoot = this.state.root;

    if (selectedPath !== undefined) {
      const selectedSquare = getSubtreeRoot(selectedRoot, selectedPath);

      if (selectedSquare.kind === "solid") {
        const newSquare = split(
          solid(selectedSquare.color),
          solid(selectedSquare.color),
          solid(selectedSquare.color),
          solid(selectedSquare.color)
        );
        const newRoot = replaceSubtree(selectedRoot, selectedPath, newSquare);

        this.setState({ root: newRoot });
      }
    }
  };

  doMergeClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    const selectedPath = this.state.selected;
    const selectedRoot = this.state.root;
  
    if (selectedPath !== undefined && selectedPath.kind !== "nil") {
      const selectedSquare = getSubtreeRoot(selectedRoot, selectedPath);
  
      
      if (selectedSquare.kind === "solid") {
          const newSquare = solid(selectedSquare.color);
          const newPath: Path = dropLast(selectedPath);
          const newRoot = replaceSubtree(selectedRoot, newPath, newSquare);
  
          this.setState({ root: newRoot, selected: undefined });
        }
      } else {
        alert("Merge operation is not applicable for the selected square.");
      }
    }

  doColorChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    const newColor: Color = toColor(evt.target.value);
    const newSquare = solid(newColor);

    const selectedPath = this.state.selected;
    const selectedRoot = this.state.root;

    if (selectedPath !== undefined) {
      const selectedSquare = getSubtreeRoot(selectedRoot, selectedPath);

      if (selectedSquare.kind === "solid") {
        const newRoot = replaceSubtree(selectedRoot, selectedPath, newSquare);
        this.setState({ root: newRoot });
      }
    }
  };
  doSaveClick = (): void => {
    this.props.onSave(this.props.fileName, this.state.root);
  };

  doBackClick = (): void => {
    this.props.onBack();
  };
}

