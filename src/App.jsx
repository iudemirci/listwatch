import { MoviesProvider } from "./contexts/MoviesContext.jsx";
import Router from "./routes/Router.jsx";

function App() {
  return (
    <MoviesProvider>
      <Router />
    </MoviesProvider>
  );
}

export default App;
