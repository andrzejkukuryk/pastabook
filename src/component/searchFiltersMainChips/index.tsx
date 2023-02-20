import React from "react";
import { Button, Container, Row } from "react-bootstrap";

interface SearchFiltersMainChipsProps {
  filters: string[];
  addFilter: (type: string) => void;
  clearFilters: () => void;
}

export function SearchFiltersMainChips({
  filters,
  addFilter,
  clearFilters,
}: SearchFiltersMainChipsProps) {
  const createChips = () => {
    return filters.map((filter) => (
      <div
        key={`chip${filter}`}
        className="border border-color rounded rounded-sm ps-2 py-1 mt-2 me-2 text-primary d-inline-block"
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

  return (
    <Container className="mt-1">
      {filters.length > 0 && (
        <Row>
          <Container className="my-1" fluid>
            <p className="d-inline-block me-2 mb-1">
              <b>Applied ingredients filters({filters.length}):</b>{" "}
            </p>
            {createChips()}
            <Button
              variant="outline-primary"
              size="sm"
              className="ms-2"
              onClick={clearFilters}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3 me-1"
                viewBox="0 2 20 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
              Clear filters
            </Button>
          </Container>
        </Row>
      )}
    </Container>
  );
}
