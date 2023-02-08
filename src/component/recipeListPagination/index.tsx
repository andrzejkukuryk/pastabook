import Pagination from "react-bootstrap/Pagination";
interface RecipeListPaginationProps {
  numberOfPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export function RecipeListPagination({
  numberOfPages,
  currentPage,
  setCurrentPage,
}: RecipeListPaginationProps) {
  let active = currentPage;
  let items = [];
  for (let number = 1; number <= numberOfPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const nextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        <Pagination.Prev onClick={prevPage}>Previous</Pagination.Prev>
        {items}
        <Pagination.Next onClick={nextPage}>Next</Pagination.Next>
      </Pagination>
    </div>
  );
}
