import { gql, useQuery } from "@apollo/client";

const GET_AUTHORS = gql`
  query GetAuthor {
    books {
      author {
        id
        name
      }
    }
  }
`;

interface Author {
    id: string | number;
    name: string;
}

interface Books {
    author: Author;
}

const Author = () => {
  const { data, loading, error } = useQuery(GET_AUTHORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.books.map((book: Books) => (
        <li key={book.author.id}>
          <strong>{book.author.name}</strong>
        </li>
      ))}
    </ul>
  );
}

export default Author;