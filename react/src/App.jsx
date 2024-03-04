import "./App.css";

import Navbar from "./components/layouts/Navbar";
import Body from "./components/layouts/Body";
import Footer from "./components/layouts/Footer";
import "./App.css";

console.log(import.meta.env)

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Body />
      </div>
      <Footer />
    </div>
  );
}

export default App;
