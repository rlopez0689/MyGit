import Nav from "../components/Nav";
import CommitDetail from "../components/CommitDetail";
import { useParams } from "react-router-dom";

export default function Commits() {
  let { commitId } = useParams();
  console.log(useParams());
  return (
    <>
      <Nav active="Branches" />
      {commitId && <CommitDetail commitId={commitId} />}
    </>
  );
}
