import React, { useEffect, useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRecipeContext } from "../../data/recipeProvider";

export function SearchFiltersType() {
  const [filters, setFilters] = useState<string[]>([]);
  const { allPastaTypes, filterByType } = useRecipeContext();
  const navigate = useNavigate();

  useEffect(() => {
    filterByType(filters);
    // navigate("/search");
  }, [filters]);

  const addFilter = (type: string) => {
    let temporaryFilters = [...filters];
    if (temporaryFilters.includes(type)) {
      temporaryFilters = [...temporaryFilters].filter((item) => item !== type);
    } else {
      temporaryFilters.push(type);
    }
    setFilters(temporaryFilters);
  };

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

  const createChips = () => {
    return filters.map((filter) => (
      <div
        key={`chip${filter}`}
        className="border border-color rounded rounded-2 ps-2 py-1 me-2 mt-2 text-primary d-inline-block"
      >
        {filter}
        <a href="#" className="text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-x ms-1"
            viewBox="0 2 20 16"
            onClick={() => addFilter(filter)}
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </a>
      </div>
    ));
  };

  const createTypeFilters = () => {
    return allPastaTypes.map((type) => (
      <Form.Check
        type="checkbox"
        key={`type${type}`}
        id={type}
        checked={stateIncludesType(type)}
        label={type}
        onChange={() => addFilter(type)}
      />
    ));
  };

  return (
    <Container className="mt-2">
      {filters.length > 0 && (
        <Row>
          <Container className="my-3" fluid>
            <p className="d-inline-block me-2 mb-1">
              <b>Applied pasta type filters({filters.length}):</b>{" "}
            </p>
            {createChips()}
          </Container>
        </Row>
      )}

      <Row>
        <Form>{createTypeFilters()}</Form>
      </Row>
    </Container>
  );
}
