import React, { lazy, Suspense } from "react";
import Home from "./pages/Home";

/*
1. lazy() is used to enable lazy loading of React components.

2. import("./pages/About") is a Dynamic Import.
   It is JavaScript's import() function that returns a Promise.

3. Suspense is a React component used to show fallback UI
   while a lazy-loaded component is being downloaded.

4. lazy() and Suspense are exported from the React package.

5. This optimization technique is commonly called:
   - Lazy Loading
   - Code Splitting
   - Dynamic Import

6. During build, Vite/Webpack creates a separate chunk
   for the About component.

7. The About chunk is downloaded only when React needs it.

8. This is especially useful in medium and large applications
   where downloading everything upfront would slow initial load.
*/

const About = lazy(() => import("./pages/About"));

const App = () => {
  return (
    <div>
      <Home />

      <Suspense fallback={<h1>Loading...</h1>}>
        <About />
      </Suspense>

    </div>
  );
};

export default App;