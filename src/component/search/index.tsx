import React, { useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRecipeContext } from "../../data/recipeProvider";
import { SearchFiltersAccordionCustomToggle } from "../searchFiltersAccordionCustomToggle";
import { SearchFiltersMain } from "../searchFiltersMain";
import { SearchFiltersMainChips } from "../searchFiltersMainChips";
import { SearchFiltersType } from "../searchFiltersType";
import { SearchFiltersTypeChips } from "../searchFiltersTypeChips";

export function Search() {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [filtersType, setFiltersType] = useState<string[]>([]);
  const [filtersMain, setFiltersMain] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState<boolean[]>([false, true]);
  const [filtersShown, setFiltersShown] = useState<boolean>(false);
  const { filterByName } = useRecipeContext();

  const navigate = useNavigate();

  const addFilterType = (type: string) => {
    let temporaryFilters = [...filtersType];
    if (temporaryFilters.includes(type)) {
      temporaryFilters = [...temporaryFilters].filter((item) => item !== type);
    } else {
      temporaryFilters.push(type);
    }
    setFiltersType(temporaryFilters);
  };

  const addFilterMain = (type: string) => {
    let temporaryFilters = [...filtersMain];
    if (temporaryFilters.includes(type)) {
      temporaryFilters = [...temporaryFilters].filter((item) => item !== type);
    } else {
      temporaryFilters.push(type);
    }
    setFiltersMain(temporaryFilters);
  };

  const clearFiltersType = () => {
    setFiltersType([]);
  };

  const clearFiltersMain = () => {
    setFiltersMain([]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    filterByName(searchPhrase);
    navigate("/search");
  };

  return (
    <Container className="my-4">
      <Row className="mb-3">
        <Col xs={false} lg={2} />
        <Col xs={12} md={8} lg={6}>
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
                variant="outline-primary"
                className="border"
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
        <Col xs={12} md={4} lg={2} className="d-flex d-md-block mt-2 mt-md-0">
          {!filtersShown && (
            <Button
              variant="outline-primary"
              className="border-0 mx-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFilters"
              aria-expanded="false"
              aria-controls="collapseFilters"
              onClick={() => setFiltersShown(true)}
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
          )}
          {filtersShown && (
            <Button
              variant="outline-primary"
              className="border-0 mx-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFilters"
              aria-expanded="false"
              aria-controls="collapseFilters"
              onClick={() => setFiltersShown(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-funnel-fill me-1"
                viewBox="0 2 20 16"
              >
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
              </svg>
              Hide filters
            </Button>
          )}
        </Col>
        <Col lg={2} />
      </Row>
      <div className="collapse" id="collapseFilters">
        <Row className="d-sm-none">
          <Accordion defaultActiveKey="0" flush>
            <Card>
              <Card.Header className="p-0">
                <SearchFiltersAccordionCustomToggle
                  eventKey="0"
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                >
                  Pasta types
                </SearchFiltersAccordionCustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <SearchFiltersType
                    filters={filtersType}
                    addFilter={addFilterType}
                    forKey="accordion"
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header className="p-0">
                <SearchFiltersAccordionCustomToggle
                  eventKey="1"
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                >
                  Main ingredients
                </SearchFiltersAccordionCustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <SearchFiltersMain
                    filters={filtersMain}
                    addFilter={addFilterMain}
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Row>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <SearchFiltersTypeChips
              filters={filtersType}
              addFilter={addFilterType}
              clearFilters={clearFiltersType}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <SearchFiltersMainChips
              filters={filtersMain}
              addFilter={addFilterMain}
              clearFilters={clearFiltersMain}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={2}></Col>
          <Col xs={12} sm={4} md={3} lg={2} className="d-none d-sm-block">
            <SearchFiltersType
              filters={filtersType}
              addFilter={addFilterType}
              forKey="extended"
            />
          </Col>
          <Col xs={12} sm={8} md={9} lg={6} className="d-none d-sm-block">
            <SearchFiltersMain
              filters={filtersMain}
              addFilter={addFilterMain}
            />
          </Col>
          <Col></Col>
        </Row>
      </div>
    </Container>
  );
}
