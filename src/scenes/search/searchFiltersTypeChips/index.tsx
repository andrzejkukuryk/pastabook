import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { ReactComponent as BiX } from "../../../assets/bi-x.svg";
import { ReactComponent as BiTrash3 } from "../../../assets/bi-trash3.svg";

interface SearchFiltersTypeChipsProps {
  filters: string[];
  addFilter: (type: string) => void;
  clearFilters: () => void;
}

export function SearchFiltersTypeChips({
  filters,
  addFilter,
  clearFilters,
}: SearchFiltersTypeChipsProps) {
  const createChips = () => {
    return filters.map((filter) => (
      <div
        key={`chip${filter}`}
        className="border border-color rounded rounded-sm ps-2 py-1 mb-3 me-2 text-primary d-inline-block"
      >
        {filter}
        <a href="#" className="text-primary" onClick={() => addFilter(filter)}>
          <BiX />
        </a>
      </div>
    ));
  };

  return (
    <Container className="mt-2">
      {filters.length > 0 && (
        <Row>
          <Container className="my-1" fluid>
            <p className="d-inline-block me-2 mb-1">
              <b>Applied pasta type filters({filters.length}):</b>{" "}
            </p>
            {createChips()}
            <Button
              variant="outline-primary"
              size="sm"
              className="ms-2"
              style={{ height: 33, marginTop: -2 }}
              onClick={clearFilters}
            >
              <BiTrash3 />
              <span className="h6">Clear filters</span>
            </Button>
          </Container>
        </Row>
      )}
    </Container>
  );
}
