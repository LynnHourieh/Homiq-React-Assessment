# Homiq Frontend Technical Assignment

## Objective
The goal of this assignment is to evaluate your ability to design and implement a React-based web application that connects to an API and presents data in a clean, user-friendly interface.

## Assignment Overview
You will build a simple product catalog application using React. The app should fetch data from a REST API and display it in a table or list with the following features:

- Create a signup/Login page with validation.
- Display a list of products with fields: name, category, price, rating, and description.
- Search products by name and filter by category.
- Implement pagination (page size of 5 or 10 items) with controls.
- Click on a product to view its details in a modal or on a separate page.
- Include basic error handling and loading indicators when fetching data.
- Ensure the UI is responsive and accessible across devices.

## API and Data
A sample data file named `products.json` is provided in this archive. You can set up a local API using [json-server](https://github.com/typicode/json-server) as follows:

```bash
npm install -g json-server
json-server --watch products.json --port 4000
```

This will create an API endpoint at `http://localhost:4000/products`. Feel free to use your own preferred method for serving JSON data; just ensure your React app can fetch from it.

## Technical Guidelines

- Use a modern React setup (e.g., Create React App) with functional components and hooks (`useState`, `useEffect`).
- Manage state effectively; consider context or a lightweight state management library if necessary.
- Use Fetch API, Axios, or another library to handle network requests.
- Implement clear error and loading state handling.
- Organize code into reusable, modular components with readable names.
- Apply basic styling (CSS, SASS, styled-components, or Tailwind) to create a user-friendly interface.
- Optional: Use TypeScript for type safety.
- Create a Github Repo and push your code there.
- Everytime a feature is added push your code with comments.

## Deliverables

- A link to the public repo you created.
- A README file with clear instructions on how to install dependencies and run your application.
- Your completed assignment should be submitted within the timeframe discussed with your interviewer.

## Evaluation Criteria

1. **Correctness**: Proper handling of API requests and data presentation.
2. **UI/UX**: Responsive design, accessibility, and user-friendly interface.
3. **Code Quality**: Clean and maintainable code, appropriate component structure.
4. **State Management**: Efficient implementation of search, filter, and pagination logic.
5. **Error Handling**: Graceful handling of network or other errors.

## Getting Started

1. Create a new React project using your preferred boilerplate.
2. Copy the provided `products.json` file into your project root or a suitable folder.
3. Start the JSON server or set up your own API to serve the sample data.
4. Build your React app following the requirements listed above.
5. Test your application thoroughly.
6. Push your code regularly.


##Bonus Task
- Convert the template here `https://www.figma.com/community/file/1227086905385628859/product-listing-detail` to React Code and create a products listing page.
- For the product photos, use an image placeholder API like `https://unsplash.com/developers`.

Good luck! We look forward to seeing your solution.
