import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { Search } from "../search";

export function SharedLayout() {
  return (
    <div>
      <Header />
      <Search />
      <Outlet />
    </div>
  );
}
