import React, { useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useRecipeContext } from "../../data/recipeProvider";

interface SearchFiltersMainProps {
  filters: string[];
  addFilter: (type: string) => void;
  forKey: string;
}

export function SearchFiltersMain({
  filters,
  addFilter,
  forKey,
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
    return allMainIngredients.map((type, index) => (
      <Col xs={6} md={4} key={`main${index}${forKey}`}>
        <Form.Check
          type="checkbox"
          id={`${type}${forKey}`}
          checked={stateIncludesType(type)}
          label={type}
          className="mb-2 text-break"
          onChange={() => addFilter(type)}
        />
      </Col>
    ));
  };

  return (
    <Container className="mt-2">
      <Row>
        <Form>
          <Form.Label
            className="h6 d-none d-sm-block"
            style={{ fontWeight: 600 }}
          >
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
