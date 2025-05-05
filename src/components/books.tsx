import { gql, useQuery } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;

interface Author {
    id: string | number;
    name: string;
}

interface Books {
    id: string | number;
    title: string;
    author: Author;
}

const Books= () => {
  const { data, loading, error } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.books.map((book: Books) => (
        <li key={book.id}>
          <strong>{book.title}</strong> by {book.author.name} - Author ID: {book.author.id}
        </li>
      ))}
    </ul>
  );
}

export default Books;