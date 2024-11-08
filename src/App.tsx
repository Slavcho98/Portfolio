import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Men from "./pages/Men";
import AppLayout from "./pages/AppLayout";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Sports from "./pages/Sports";
// import Brands from "./pages/Brands";
import New from "./pages/New";
import Sale from "./pages/Sale";
import Product from "./pages/Product";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="men" element={<Men />} />
            <Route path="women" element={<Women />} />
            <Route path="kids" element={<Kids />} />
            <Route path="sport" element={<Sports />} />
            <Route path="brands" element={<Product />} />
            <Route path="new" element={<New />} />
            <Route path="sale" element={<Sale />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
