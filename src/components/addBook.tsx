// import { useState } from "react";
// import { gql, useMutation, useQuery } from "@apollo/client";

// const GET_AUTHORS = gql`
//   query GetAuthor {
//     books {
//       author
//     }
//   }
// `;

// const POST_AUTHORS = gql`
//   mutation PostAuthor($title: String!, $authorId: ID!, $name: String!) {
//     addBook(title: $title, authorId: $authorId) {
//       id
//       title
//     }
//     addAuthor(name: $name) {
//       id
//       name
//     }
//   }
// `;

// interface Author {
//   id: string | number;
//   name: string;
// }

// interface Book {
//   id: string;
//   title: string;
// }

// interface MutationResult {
//   addBook: Book;
//   addAuthor: Author;
// }

// const AddBook = () => {
//   const [title, setTitle] = useState("");
//   const [authorId, setAuthorId] = useState("");
//   const [name, setName] = useState("");

//   const { data, loading, error } = useQuery(GET_AUTHORS);
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;
    
//   const [postAuthors, { mutationData, mutationLoading, mutationError }] = useMutation<MutationResult>(
//     POST_AUTHORS
//   );

//   const formElements = [
//     { name: "title", type: "text", label: "Book Title", value: title, change: setTitle },
//     { name: "authorId", type: "text", label: "Author ID", value: authorId, change: setAuthorId },
//     { name: "name", type: "text", label: "Author Name", value: name, change: setName },
//   ];

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     postAuthors({ variables: { title, authorId, name } });
//   };

//   if (mutationLoading) return <p>Loading...</p>;
//   if (mutationError) return <p>Error: {mutationError.message}</p>;

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         {formElements.map(({ name, type, label, value, change }) => (
//           <div key={name}>
//             <label>
//               {label}:{" "}
//               <input
//                 type={type}
//                 name={name}
//                 value={value}
//                 onChange={(e) => change(e.target.value)}
//                 required
//               />
//             </label>
//           </div>
//         ))}
//         <button type="submit">Add Book &amp; Author</button>
//       </form>
//       {mutationData && (
//         <ul>
//           <li>
//             <strong>Book:</strong> {mutationData.addBook.title}
//           </li>
//           <li>
//             <strong>Author:</strong> {mutationData.addAuthor.name}
//           </li>
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AddBook;


import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_AUTHORS = gql`
  query GetAuthor {
    books {
      author
    }
  }
`;

const POST_AUTHORS = gql`
  mutation PostAuthor($title: String!, $authorId: ID!, $name: String!) {
    addBook(title: $title, authorId: $authorId) {
      id
      title
    }
    addAuthor(name: $name) {
      id
      name
    }
  }
`;

interface Author {
  id: string | number;
  name: string;
}

interface Book {
  id: string;
  title: string;
}

interface MutationResult {
  addBook: Book;
  addAuthor: Author;
}

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [name, setName] = useState("");

  const { data, loading: queryLoading, error: queryError } = useQuery(GET_AUTHORS);

  const [ postAuthors, { data: mutationData, loading: mutationLoading, error: mutationError }, ]
   = useMutation<MutationResult>(POST_AUTHORS, { refetchQueries: [{ query: GET_AUTHORS }], awaitRefetchQueries: true });

  const formElements = [
    { name: "title", type: "text", label: "Book Title", value: title, change: setTitle },
    { name: "authorId", type: "text", label: "Author ID", value: authorId, change: setAuthorId },
    { name: "name", type: "text", label: "Author Name", value: name, change: setName },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postAuthors({ variables: { title, authorId, name } });
  };

  return (
    <div>
        <h3>Authors List</h3>
        {queryLoading && <p>Loading authors...</p>}
        {queryError && <p>Error loading authors: {queryError.message}</p>}
        {data &&
         data.books &&
          data.books.map((book: { author: Author }, index: number) => (
            <div key={index}>{book.author.name} ID: {book.author.id}</div>
          ))}
      <form onSubmit={handleSubmit}>
        {formElements.map(({ name, type, label, value, change }) => (
          <div key={name}>
            <label>
              {label}:{" "}
              <input
                type={type}
                name={name}
                value={value}
                onChange={(e) => change(e.target.value)}
                required
              />
            </label>
          </div>
        ))}
        <button type="submit">Add Book &amp; Author</button>
      </form>

      {mutationLoading && <p>Adding book...</p>}
      {mutationError && <p>Error: {mutationError.message}</p>}


      {mutationData && (
        <ul>
          <li>
            <strong>Book:</strong> {mutationData.addBook.title}
          </li>
          <li>
            <strong>Author:</strong> {mutationData.addAuthor.name}
          </li>
        </ul>
      )}
    </div>
  );
};

export default AddBook;