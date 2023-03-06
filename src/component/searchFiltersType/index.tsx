import React, { useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRecipeContext } from "../../data/recipeProvider";

interface SearchFiltersTypeProps {
  filters: string[];
  addFilter: (type: string) => void;
  forKey: string;
}

export function SearchFiltersType({
  filters,
  addFilter,
  forKey,
}: SearchFiltersTypeProps) {
  const { allPastaTypes, filterByType } = useRecipeContext();

  useEffect(() => {
    filterByType(filters);
  }, [filters]);

  const stateIncludesType = (type: string) => {
    return filters.includes(type);
  };

  allPastaTypes.sort((t1, t2) => {
    if (t1 > t2) {
      return 1;
    }

    if (t1 < t2) {
      return -1;
    }

    return 0;
  });

  const createTypeFilters = () => {
    return allPastaTypes.map((type, index) => (
      <Col xs={6} sm={12} key={`type${index}${forKey}`}>
        <Form.Check
          type="checkbox"
          id={`${type}${forKey}`}
          checked={stateIncludesType(type)}
          label={type}
          className="mb-2"
          onChange={() => addFilter(type)}
        />
      </Col>
    ));
  };

  return (
    <Container className="mt-2 mb-3 mb-sm-0">
      <Row>
        <Form>
          <Form.Label
            className="h6 d-none d-sm-block"
            style={{ fontWeight: 600 }}
          >
            Pasta type
          </Form.Label>
          <Container className="mx-0">
            <Row>{createTypeFilters()}</Row>
          </Container>
        </Form>
      </Row>
    </Container>
  );
}
