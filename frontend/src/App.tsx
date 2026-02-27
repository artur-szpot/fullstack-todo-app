import { BrowserRouter, Route, Routes } from "react-router";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>To do!</h1>} />
        <Route path="/auth" element={<h1>Login or sign up</h1>} />
        <Route path="/dashboard" element={<h1>To do app dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
