import { BrowserRouter, Route, Routes } from "react-router";

import { AdminPanel } from "./routes/AdminPanel";
import { Dashboard } from "./routes/Dashboard";
import { Signin } from "./routes/Signin";
import { Signup } from "./routes/Signup";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
};
