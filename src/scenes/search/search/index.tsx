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
import { useRecipeContext } from "../../../data/recipeProvider";
import { SearchFiltersAccordionCustomToggle } from "../searchFiltersAccordionCustomToggle";
import { SearchFiltersMain } from "../searchFiltersMain";
import { SearchFiltersMainChips } from "../searchFiltersMainChips";
import { SearchFiltersType } from "../searchFiltersType";
import { SearchFiltersTypeChips } from "../searchFiltersTypeChips";
import { ReactComponent as BiSearch } from "../../../assets/bi-search.svg";
import { ReactComponent as BiFunnel } from "../../../assets/bi-funnel.svg";
import { ReactComponent as BiFunnelFill } from "../../../assets/bi-funnel-fill.svg";

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

const handleClickShowFilters = () => setFiltersShown(true);
const handleClickHideFilters = () => setFiltersShown(false);

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
              <BiSearch />
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
            onClick={handleClickShowFilters}
          >
            <BiFunnel />
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
            onClick={handleClickHideFilters}
          >
            <BiFunnelFill />
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
                  forKey="accordion"
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
            forKey="extended"
          />
        </Col>
        <Col></Col>
      </Row>
    </div>
  </Container>
);
}
