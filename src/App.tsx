import { useState } from "react";
import Books from "./components/books";
import Author from "./components/author";
import AddBook from "./components/addBook";
import AddAuthor from "./components/addAuthor";

const App = () => {
  const [filter, setFilter] = useState<string>("books");
  const [showAddBook, setShowAddBook] = useState<boolean>(false);
  const [showAddAuthor, setShowAddAuthor] = useState<boolean>(false);

  const checkBoxElements = [
    { name: "books", label: "Books" },
    { name: "authors", label: "Authors" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div>
        {checkBoxElements.map((element) => (
          <div key={element.name}>
            <input
              type="checkbox"
              name="filter"
              id={element.name}
              value={element.name}
              onChange={(e) => setFilter(e.target.value)}
              checked={filter === element.name}
            />
            <label htmlFor={element.name}>{element.label}</label>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        {filter === "books" && (
          <button onClick={() => setShowAddBook(!showAddBook)}>
            {showAddBook ? "Close Add Book" : "Add Book"}
          </button>
        )}
        {filter === "authors" && (
          <button onClick={() => setShowAddAuthor(!showAddAuthor)}>
            {showAddAuthor ? "Close Add Author" : "Add Author"}
          </button>
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        {filter === "books" && showAddBook && <AddBook />}
        {filter === "authors" && showAddAuthor && <AddAuthor />}
      </div>
      <h1 style={{ marginTop: "20px" }}>
        {filter === "books" ? "📚 Book Collection" : "👩‍💼 Author Collection"}
      </h1>
      {filter === "books" ? <Books /> : <Author />}
    </div>
  );
};

export default App;