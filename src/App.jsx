import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Chatbot } from "./components/Chatbot";
import { HomePage } from "./pages/HomePage";
import { ModelDetail } from "./pages/ModelDetail";
import { Configurator } from "./pages/Configurator";
import { Confirmation } from "./pages/Confirmation";
import { Checkout } from "./pages/Checkout";
import { OrderSuccess } from "./pages/OrderSuccess";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/model/:id" element={<ModelDetail />} />
        <Route path="/configurator/:id" element={<Configurator />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
