import React, { Component } from "react";
import { ControlledEditor } from "@monaco-editor/react";
import parser from "solidity-parser-antlr";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solidityCode: "Please Enter Your Solidity Code Here.",
      michelsonCode: "Your Michelson Output Will Be Shown Here.",
      msg: "Please enter your solidity code in the editor below.",
    };
    this.solidityCompiler = this.solidityCompiler.bind(this);
    this.onChangeSolidity = this.onChangeSolidity.bind(this);
  }
  onChangeSolidity(event, solidityCode) {
    console.log(solidityCode);
    this.setState({ solidityCode });
  }
  solidityCompiler() {
    const solidityCode = this.state.solidityCode;
    try {
      parser.parse(solidityCode);
    } catch (e) {
      if (e instanceof parser.ParserError) {
        console.log(e.errors);
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="app-header-container">
          <header className="app-header">Toddler</header>
        </div>
        <div className="editor-header-container">
          <div className="text-container">
            <p className="text">{this.state.msg}</p>
          </div>
          <header className="editor-header">
            <button
              type="button"
              className="compile-button"
              style={{ marginRight: "10px" }}
              onClick={this.solidityCompiler}
            >
              Compile
            </button>
            <button type="button" className="compile-button">
              Convert
            </button>
          </header>
        </div>
        <div className="main-container">
          <div className="solidity-editor">
            <ControlledEditor
              height="70vh"
              width="100%"
              language="sol"
              onChange={this.onChangeSolidity}
              value={this.state.solidityCode}
              theme="vs-dark"
            />
          </div>
          <div className="michelson-editor">
            <ControlledEditor
              height="70vh"
              width="100%"
              language="text"
              value={this.state.michelsonCode}
              theme="vs-dark"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
