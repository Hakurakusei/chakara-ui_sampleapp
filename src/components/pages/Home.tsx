import { VFC, memo } from "react";
import { Outlet } from "react-router-dom";

export const Home: VFC = memo(() => {
  return (
    <>
      <p>Homeだにょん</p>
    </>
  );
});
