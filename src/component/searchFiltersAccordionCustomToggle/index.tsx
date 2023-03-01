import React, { useState } from "react";
import { useAccordionButton } from "react-bootstrap";

export function SearchFiltersAccordionCustomToggle({
  children,
  eventKey,
}: any) {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const decoratedOnClick = useAccordionButton(eventKey, () =>
    setCollapsed(!collapsed)
  );
  return (
    <button
      type="button"
      //   className="collapsed accordion-button bg-white text-dark"
      className={`${
        collapsed ? "collapsed rounded-3" : "rounded-top-3"
      } accordion-button bg-white text-dark  border-0`}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}
