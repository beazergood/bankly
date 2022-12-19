import "./app.css";
import { Home } from "./views/home";
import { Header } from "./components/header";

const App = () => (
  <div className="app">
    <Header />
    <Home />
  </div>
);

export default App;
