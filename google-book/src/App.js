import React, { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [printType, setPrintType] = useState("");
  const [bookType, setBookType] = useState("");
  const [result, setResult] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const apiKey = "AIzaSyDQcxibfCCW-MwQBuoG2hSxk-pSmgc89ZE";
    // const base = "https://www.googleapis.com/books/v1/volumes?q=";
    const base = "https://www.googleapis.com/";
    const url = `${base}${printType}/v1/volumes?q=${search}&filter=${bookType}&apiKey=${apiKey}`;
    console.log(url)
    fetch(url)
      .then((res) => res.json())
      .then((data) => setResult(data.items));
    
  };
  console.log(result)
  const resultList = result.map((item) => {
    return(
      <>
        <h3>Title: {item.volumeInfo.title} </h3>
        <p>Author: {item.volumeInfo.author} </p>
        <p>Description: {item.volumeInfo.description}</p>
        {item.volumeInfo.imageLinks &&
          <img src={item.volumeInfo.imageLinks.thumbnail} />
        }
        
      </>
    )
  });

  return (
    <div className="App">
      <h1>Google Book Search</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
        <br />
        <label htmlFor="printType">Print Type</label>
        <select onChange={(e) => setPrintType(e.target.value)}>
          <option value="all">all</option>
          <option value="books">books</option>
          <option value="magazines">magazines</option>
        </select>{" "}
        <label htmlFor="bookType">Book Type</label>
        <select onChange={(e) => setBookType(e.target.value)}>
          <option value="">No Filter</option>
          <option value="free-ebooks">fee-ebooks</option>
          <option value="paid-ebooks">paid-ebooks</option>
          <option value="full">full</option>
          <option value="ebooks">ebooks</option>
        </select>
      </form>
      <div> {resultList}</div>
    </div>
  );
}

export default App;
