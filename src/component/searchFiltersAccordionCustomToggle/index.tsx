import classNames from "classnames";
import React from "react";
import { useAccordionButton } from "react-bootstrap";

export function SearchFiltersAccordionCustomToggle({
  children,
  eventKey,
  collapsed,
  setCollapsed,
}: any) {
  const buttonNumber = Number(eventKey);

  const decoratedOnClick = useAccordionButton(eventKey, () => {
    changeCollapsed();
  });
  const buttonClass = classNames({
    "collapsed rounded-3": collapsed[buttonNumber],
    "rounded-top-3": !collapsed[buttonNumber],
    "accordion-button bg-white text-dark  border-0": true,
  });

  const changeCollapsed = () => {
    let temporaryCollapsed = [true, true];
    temporaryCollapsed[buttonNumber] = !collapsed[buttonNumber];
    setCollapsed(temporaryCollapsed);
  };

  return (
    <button type="button" className={buttonClass} onClick={decoratedOnClick}>
      {children}
    </button>
  );
}
