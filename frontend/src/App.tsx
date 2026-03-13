import { BrowserRouter, Route, Routes } from "react-router";

import { Signin } from "./routes/Signin";
import { Dashboard } from "./routes/Dashboard";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>To do :)</h1>} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
