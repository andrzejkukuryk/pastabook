import React, { useEffect } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRecipeContext } from "../../data/recipeProvider";

interface SearchFiltersTypeProps {
  filters: string[];
  addFilter: (type: string) => void;
}

export function SearchFiltersType({
  filters,
  addFilter,
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
    return allPastaTypes.map((type) => (
      <Form.Check
        type="checkbox"
        key={`type${type}`}
        id={type}
        checked={stateIncludesType(type)}
        label={type}
        className="mb-2"
        onChange={() => addFilter(type)}
      />
    ));
  };

  return (
    <Container className="mt-2">
      <Row>
        <Form>
          <Form.Label className="h6" style={{ fontWeight: 600 }}>
            Pasta type
          </Form.Label>
          {createTypeFilters()}
        </Form>
      </Row>
    </Container>
  );
}
