import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_BOOKS_LIST = gql`
  query GetBooks {
    books {
      id
      title
    }
  }
`;

const ADD_AUTHOR_TO_BOOK = gql`
  mutation AddAuthorToBook($bookId: String!, $name: String!) {
    addAuthorToBook(bookId: $bookId, name: $name) {
      book {
        id
        title
        authorId
      }
      author {
        id
        name
      }
    }
  }
`;

const AddAuthor = () => {
  const [bookId, setBookId] = useState("");
  const [name, setName] = useState("");

  const { data, loading: queryLoading, error: queryError } = useQuery(GET_BOOKS_LIST);

  const [addAuthorToBook, { loading: mutationLoading, error: mutationError, data: mutationData }] =
    useMutation(ADD_AUTHOR_TO_BOOK, {
      refetchQueries: [{ query: GET_BOOKS_LIST }],
      awaitRefetchQueries: true,
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addAuthorToBook({ variables: { bookId, name } });
    setBookId("");
    setName("");
  };

  return (
    <div>
      <h3>Add Author to a Book</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Select Book:{" "}
          <select
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
          >
            <option value="">Select a book</option>
            {data &&
              data.books &&
              data.books.map((book: { id: string; title: string }) => (
                <option key={book.id} value={book.id}>
                  {book.title} (ID: {book.id})
                </option>
              ))}
          </select>
        </label>
        <br />
        <label>
          Author Name:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Add Author to Book</button>
      </form>

      {mutationLoading && <p>Adding author...</p>}
      {mutationError && <p>Error: {mutationError.message}</p>}
      {mutationData && (
        <div>
          <p>
            Book "{mutationData.addAuthorToBook.book.title}" updated with new author "
            {mutationData.addAuthorToBook.author.name}".
          </p>
        </div>
      )}

      <h3>Books List</h3>
      {queryLoading && <p>Loading books...</p>}
      {queryError && <p>Error loading books: {queryError.message}</p>}
      {data && data.books && (
        <ul>
          {data.books.map((book: { id: string; title: string }) => (
            <li key={book.id}>
              {book.title} (ID: {book.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddAuthor;