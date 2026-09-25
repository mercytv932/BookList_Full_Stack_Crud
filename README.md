# Booklist App

This project is a small Express and MongoDB application for managing a personal book list. It lets users view all books, create new entries, edit existing books, and delete books from a browser-based interface.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Move into the project folder:

   ```bash
   cd booklist
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Environment Variables

This project uses environment variables. Create a `.env` file in the project root before starting the app.

```env
PORT=7000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
```

### Required variables

- `PORT`: The port used by the Express server. The project reads this value from the environment.
- `MONGO_URI`: The MongoDB connection string used to connect the app to the database.

> Do not commit your `.env` file to GitHub. Store your local database credentials and port values only on your machine.

## Running the Application

Use the start script defined in `package.json`:

```bash
npm start
```

The server starts on the port defined in the environment, and the app is available at:

```text
http://localhost:7000
```

## Testing / Usage

This app is a browser-based CRUD application for books. You can use it by opening the local URL in a browser.

### Main routes

- `GET /books/` - View all books
- `GET /books/new` - Show the form to create a new book
- `POST /books` - Create a new book
- `GET /books/:id/edit` - Show the form to edit a book
- `PUT /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book

### How to use it

1. Start the app with `npm start`.
2. Open `http://localhost:7000/books/` in your browser.
3. Add new books using the create form.
4. Edit or delete existing books from the list.

### Notes about the app behavior

- The project uses EJS templates in the `views` folder.
- The app serves static files from the `public` folder.
- The app uses `method-override` so `PUT` and `DELETE` requests work from HTML forms.

## Important Notes

- This project requires MongoDB to be running or accessible through a MongoDB Atlas connection string.
- The app reads the database URL from the `MONGO_URI` environment variable.
- The app reads the server port from the `PORT` environment variable.
- The project does not include a frontend framework. It uses server-rendered EJS pages.
- Make sure the `.env` file is configured correctly before running the application.
