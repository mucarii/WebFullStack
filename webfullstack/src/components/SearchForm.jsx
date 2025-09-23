// src/components/SearchForm.jsx
import { useState } from "react";
import { Form, Button, InputGroup, Row, Col, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { useApp } from "../contexts/useApp";


export default function SearchForm() {
  const { state, dispatch } = useApp();
  const [localQuery, setLocalQuery] = useState(state.query);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!localQuery.trim()) {
      dispatch({ type: "FETCH_ERROR", payload: "Preencha o termo de busca." });
      return;
    }
    dispatch({ type: "SET_QUERY", payload: localQuery.trim() });
  };

  return (
    <Form onSubmit={onSubmit} className="mb-3">
      <Row className="g-2 align-items-end">
        <Col md={8}>
          <Form.Label>Buscar</Form.Label>
          <InputGroup>
            <Form.Control
              placeholder={state.entity === "teams" ? "Ex.: Arsenal" : "Ex.: Lionel Messi"}
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
            />
            <Button type="submit">Buscar</Button>
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Label>Entidade</Form.Label>
          <div>
            <ToggleButtonGroup
              type="radio"
              name="entity"
              value={state.entity}
              onChange={(val) => dispatch({ type: "SET_ENTITY", payload: val })}
            >
              <ToggleButton id="entity-teams" value="teams" variant="outline-primary">
                Times
              </ToggleButton>
              <ToggleButton id="entity-players" value="players" variant="outline-secondary">
                Jogadores
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Col>
      </Row>
    </Form>
  );
}
