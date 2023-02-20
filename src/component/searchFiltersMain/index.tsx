import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRecipeContext } from "../../data/recipeProvider";

interface SearchFiltersMainProps {
  filters: string[];
  addFilter: (type: string) => void;
}

export function SearchFiltersMain({
  filters,
  addFilter,
}: SearchFiltersMainProps) {
  const { allMainIngredients, filterByMain } = useRecipeContext();

  useEffect(() => {
    filterByMain(filters);
  }, [filters]);

  const stateIncludesType = (type: string) => {
    return filters.includes(type);
  };

  allMainIngredients.sort((t1, t2) => {
    if (t1 > t2) {
      return 1;
    }

    if (t1 < t2) {
      return -1;
    }

    return 0;
  });

  const createIngredientsFilters = () => {
    return allMainIngredients.map((type) => (
      <Col lg={4}>
        <Form.Check
          type="checkbox"
          key={`type${type}`}
          id={type}
          checked={stateIncludesType(type)}
          label={type}
          className="mb-2"
          onChange={() => addFilter(type)}
        />
      </Col>
    ));
  };

  return (
    <Container className="mt-2">
      <Row>
        <Form>
          <Form.Label className="h6" style={{ fontWeight: 600 }}>
            Main ingredient
          </Form.Label>
          <Container>
            <Row>{createIngredientsFilters()}</Row>
          </Container>
        </Form>
      </Row>
    </Container>
  );
}
