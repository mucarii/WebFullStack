// src/components/Results.jsx
import { Card, Col, Row, Spinner, Alert, Badge } from "react-bootstrap";
import { useEffect } from "react";
import { useApp } from "../contexts/useApp";
import { searchTeamsByName, searchPlayersByName } from "../api/sportsdb";

export default function Results() {
  const { state, dispatch } = useApp();
  const { query, entity, loading, error, results } = state;

  useEffect(() => {
    const run = async () => {
      if (!query) return;
      try {
        dispatch({ type: "FETCH_START" });
        const data =
          entity === "teams"
            ? await searchTeamsByName(query)
            : await searchPlayersByName(query);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    };
    run();
  }, [query, entity, dispatch]);

  if (loading) {
    return (
      <div className="d-flex gap-2 align-items-center">
        <Spinner animation="border" size="sm" />
        <span>Carregando…</span>
      </div>
    );
  }

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (!query) return <Alert variant="secondary">Faça uma busca para começar.</Alert>;

  if (results.length === 0)
    return <Alert variant="warning">Nenhum resultado encontrado.</Alert>;

  return (
    <Row xs={1} md={3} className="g-3">
      {results.map((item) =>
        state.entity === "teams" ? (
          <Col key={item.idTeam}>
            <Card className="h-100">
              {item.strTeamBadge && (
                <Card.Img variant="top" src={item.strTeamBadge} alt={item.strTeam} />
              )}
              <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                  <span>{item.strTeam}</span>
                  {item.strLeague && <Badge bg="info">{item.strLeague}</Badge>}
                </Card.Title>
                <Card.Text>
                  País: {item.strCountry || "—"}
                  <br />
                  Estádio: {item.strStadium || "—"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          <Col key={item.idPlayer}>
            <Card className="h-100">
              {item.strThumb && (
                <Card.Img variant="top" src={item.strThumb} alt={item.strPlayer} />
              )}
              <Card.Body>
                <Card.Title>{item.strPlayer}</Card.Title>
                <Card.Text>
                  Time: {item.strTeam || "—"}
                  <br />
                  Nacionalidade: {item.strNationality || "—"}
                  <br />
                  Posição: {item.strPosition || "—"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )
      )}
    </Row>
  );
}
