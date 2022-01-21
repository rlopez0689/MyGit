import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  BRANCHES_ROUTE,
  COMMITS_ROUTE,
  PRS_ROUTE,
} from "./routes/utils/routes";

import Home from "./routes/Home";
import Branches from "./routes/Branches";
import Commits from "./routes/Commits";
import PRS from "./routes/PRS";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={BRANCHES_ROUTE} element={<Branches />}>
              <Route path=":branchId" element={<Branches />} />
            </Route>
            <Route path={COMMITS_ROUTE} element={<Commits />}>
              <Route path=":commitId" element={<Commits />} />
            </Route>
            <Route path={PRS_ROUTE} element={<PRS />}>
              <Route path="create" element={<PRS />} />
            </Route>
          </Routes>
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
