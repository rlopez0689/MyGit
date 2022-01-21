import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "react-query";
import BranchList from "./BranchList";
import { BrowserRouter } from "react-router-dom";
const queryClient = new QueryClient();

const server = setupServer(
  rest.get("http://localhost:8000/api/branches/", (req, res, ctx) => {
    return res(ctx.json([{ name: "master", commits: [] }]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays branches", async () => {
  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <BranchList />
      </QueryClientProvider>
    </BrowserRouter>
  );

  await waitFor(() => expect(screen.getByText("master")));
});
