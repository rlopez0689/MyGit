import Nav from "../components/Nav";
import PRCreate from "../components/PRCreate";
import PRList from "../components/PRList";
import { useLocation } from "react-router-dom";
import { PRS_CREATE_ROUTE } from "./utils/routes";

export default function Commits() {
  let { pathname } = useLocation();
  return (
    <>
      <Nav active="PR'S" />
      {pathname === `/${PRS_CREATE_ROUTE}` ? <PRCreate /> : <PRList />}
    </>
  );
}
