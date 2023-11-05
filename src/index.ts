import { Elysia, t } from 'elysia';
import { BooksDatabase } from './db';
import { cors } from '@elysiajs/cors'

const app = new Elysia().use(cors()).decorate('db', new BooksDatabase());

app.get('/books', ({ db }) => db.getBooks());
app.post('/books', ({ db, body }) => db.addBook(body), {
  body: t.Object({
    name: t.String(),
    author: t.String(),
  }),
});
app.put(
  '/books',
  ({ db, body }) =>
    db.updateBook(body.id, { name: body.name, author: body.author }),
  {
    body: t.Object({
      id: t.Number(),
      name: t.String(),
      author: t.String(),
    }),
  }
);

app.get('/books/:id', ({ db, params }) => db.getBook(parseInt(params.id)));
app.delete('/books/:id', ({ db, params }) =>
  db.deleteBook(parseInt(params.id))
);

//app.listen(8081)
app.listen(3000)

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
