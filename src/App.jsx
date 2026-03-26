import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Chatbot } from "./components/Chatbot";
import { HomePage } from "./pages/HomePage";
import { ModelDetail } from "./pages/ModelDetail";

import { Configurator } from "./pages/Configurator";
import { Confirmation } from "./pages/Confirmation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/model/:id" element={<ModelDetail />} />
        <Route path="/configurator/:id" element={<Configurator />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
