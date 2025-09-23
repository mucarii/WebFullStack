// src/App.jsx
import { Container, Navbar } from "react-bootstrap";
import AppProvider from "./contexts/AppProvider";
import SearchForm from "./components/SearchForm";
import Results from "./components/Results";

export default function App() {
  return (
    <AppProvider>
      <Navbar bg="dark" data-bs-theme="dark" className="mb-4">
        <Container>
          <Navbar.Brand className="fw-semibold">
            Sports Explorer · <span className="text-info">TheSportsDB</span>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="pb-5">
        <div className="section">
          <SearchForm />
        </div>

        <div className="section">
          <Results />
        </div>

        <footer className="app-footer">
          Feito por Murilo Luiz Calore Ritto
        </footer>
      </Container>
    </AppProvider>
  );
}
