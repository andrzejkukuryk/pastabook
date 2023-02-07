import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRecipeContext } from "../../data/recipeProvider";
import { SearchFiltersMain } from "../searchFiltersMain";
import { SearchFiltersType } from "../searchFiltersType";

export function Search() {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const { filterByName } = useRecipeContext();

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    filterByName(searchPhrase);
    navigate("/search");
  };

  return (
    <Container className="my-4">
      <Row>
        <Col xs={false} lg={2} />
        <Col xs={8} lg={6}>
          <Form>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Type in pasta name"
                value={searchPhrase}
                onChange={(e) => setSearchPhrase(e.target.value)}
              ></Form.Control>
              <Button
                type="submit"
                variant="outline-secondary"
                onClick={handleSubmit}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-search me-1"
                  viewBox="0 2 20 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
                Search
              </Button>
            </InputGroup>
          </Form>
        </Col>
        <Col xs={4} lg={2}>
          <Button
            variant="outline-secondary"
            className="border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFilters"
            aria-expanded="false"
            aria-controls="collapseFilters"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-funnel me-1"
              viewBox="0 2 20 16"
            >
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
            </svg>
            Show filters
          </Button>
        </Col>
        <Col xs={false} lg={2} />
      </Row>
      <div className="collapse" id="collapseFilters">
        <Row>
          <Col xs={false} lg={2} />
          <Col xs={12} lg={10}>
            <SearchFiltersType />
          </Col>
        </Row>
        <Row>
          <Col xs={false} lg={2} />
          <Col xs={12} lg={10}>
            <SearchFiltersMain />
          </Col>
        </Row>
      </div>
    </Container>
  );
}
