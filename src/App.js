import React, { useState, useRef } from "react";
import axios from 'axios';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFile: "",
      responseArray: [],
      file1: null,
      file2: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      selectedFile: event.target.files,
      responseArray:[],
      file1: URL.createObjectURL(event.target.files[0]),
      file2: URL.createObjectURL(event.target.files[1])
    });
  }

  onSubmit() {
    if (this.state.selectedFile.length != 2) {
      alert("Required 2 files")
      return false;
    }
    if (!this.state.selectedFile) {
      alert("Please select a file!");
      return false;
    }
    const data = new FormData();

    data.append("image_1", this.state.selectedFile[0]);
    data.append("image_2", this.state.selectedFile[1]);


    let url = "http://127.0.0.1:5000/check-comparison";

    let headers = {
      'Content-Type': 'multipart/form-data; boundary=----somefixedboundary'
     }

    axios
      .post(url, data, headers)
      .then((res) => {
        this.setState({ responseArray: res.data });
        this.resetFile();
      },error=>{
        alert(error);
      });

  }

  resetFile() {
    // Reset file input control
    document.getElementsByName("file")[0].value = null;
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h3 className="title">Faces Compare 1.0</h3>

          <div className="form-row">
            <div className="form-group col-md-12">
              <input
                type="file"
                className="form-control"
                multiple
                name="file"
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <br />
          <div className="form-row">
            <div className="col-md-12">
              <button
                type="submit"
                className="btn btn-success form-control form-control-sm"
                onClick={() => this.onSubmit()}>
                Verify Faces
              </button>
            </div>
          </div>
          <br/>
          <div className="container row">
            <div className="card col-md-6">
              <img className="card-img-top" src={this.state.file1}/>
              <div className="card-body">
                <p className="card-text text-secondary">Face 1.</p>
              </div>
            </div>
            <div className="card col-md-6">
              <img className="card-img-top" src={this.state.file2}/>
              <div className="card-body">
                <p className="card-text text-secondary">Face 1.</p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className={"alert alert-"+this.state.responseArray.icon}>
              <h1 className={"title text-"+this.state.responseArray.icon}>{this.state.responseArray.message}</h1>
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default App;
