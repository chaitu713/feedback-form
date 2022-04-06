import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import TextFeedback from "./components/TextFeedback";
import MultimediaFeedback from "./components/MultimediaFeedback";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/text" element={<TextFeedback />} />
          <Route exact path="/multi" element={<MultimediaFeedback />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
