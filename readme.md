## Available Scripts

In the project directory, you can run:
### `npm i`
To install dependency
### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `Optimisation used `
 1. Infinite Scrolling with Intersection Observer: Using the Intersection Observer API for infinite scrolling instead of listening to the scroll event is a more efficient approach. This method only triggers when a specific element (e.g., a loading element) intersects with the viewport, making it more performant than continuous onScroll event listeners, which can lead to excessive re-renders and CPU usage.
 2. UseCallback and React.memo Hooks:
    useCallback: This hook helps memoize functions to avoid recreating them on every render. This optimization can help reduce unnecessary re-renders in child components that depend on these functions.
    React.memo: This higher-order component helps prevent unnecessary re-renders of components by only re-rendering them when their props change. This is useful in optimizing components that receive the same props frequently.
 3. Key Prop in Map: Adding a key prop to elements within a map function helps React identify which items have changed, allowing it to efficiently update the DOM without re-rendering the entire list. This can significantly improve rendering performance, especially with large lists.
 4. Lazy Loading on Images: Lazy loading defers the loading of images until they are about to enter the viewport. This reduces the initial load time and memory usage by only loading images as needed. This is especially useful for pages with many images or images that aren't immediately visible on page load.

### `Addon`
 1. Added Responsiveness to the app




