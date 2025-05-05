# React + TypeScript + Vite

This project provides a minimal setup for a React client using TypeScript and Vite, configured to work with a GraphQL API backend.  
**Note:** I am currently learning GraphQL and using this project to deepen my understanding of its concepts and implementation.

## Available Scripts

- **dev**: Starts the Vite development server with hot module replacement.
  ```bash
  npm run dev
  ```
- **build**: Builds the project for production.
  ```bash
  npm run build
  ```
- **preview**: Serves the production build locally.
  ```bash
  npm run preview
  ```

## Project Structure

```
book-library-graphql
└── client
    ├── .env
    ├── package.json
    ├── index.html
    ├── vite.config.ts
    ├── tsconfig.json
    ├── public/
    └── src/
        ├── App.tsx
        ├── index.css
        ├── main.tsx
        └── components/
            ├── addAuthor.tsx
            ├── addBook.tsx
            ├── author.tsx
            └── books.tsx
```

## Environment Variables

Create a `.env` file in the client folder with the following content:

```properties
VITE_SERVER_URL="http://localhost:4000"
```

This variable is used by the Apollo Provider to connect the client to your GraphQL server.

## License

This project is licensed under the ISC License.