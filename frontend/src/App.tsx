import { AppRouter } from "./AppRouter";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import "./css/index.scss";

export const App = () => {
  return (
    <>
      <Navbar />
      <AppRouter />
      <Footer />
    </>
  );
};
