import React from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

class App extends React.Component {
  onSearchSubmit(term) {
    axios.get("https://api.unsplash.com/search/photos", {
      // It specifies the different query string parameters we want to add into the request
      // It is same as ?query=cars at the end of the address
      params: { query: term },
      headers: {
        Authorization:
          "Client-ID 88edb644808dce2dd69b18699b97d02efc2a6e881138304c45c9483cd8440bd2"
      }
    });
  }
  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
      </div>
    );
  }
}

export default App;
