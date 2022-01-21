import Nav from "../components/Nav";
import BranchList from "../components/BranchList";
import BranchDetail from "../components/BranchDetail";
import { useParams } from "react-router-dom";

export default function Branches() {
  let { branchId } = useParams();
  return (
    <>
      <Nav active="Branches" />
      {branchId ? <BranchDetail branchId={branchId} /> : <BranchList />}
    </>
  );
}
