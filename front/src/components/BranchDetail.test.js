import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "react-query";
import BranchList from "./BranchList";
import { BrowserRouter } from "react-router-dom";
import BranchDetail from "./BranchDetail";
const queryClient = new QueryClient();

const server = setupServer(
  rest.get("http://localhost:8000/api/branches/1", (req, res, ctx) => {
    return res(
      ctx.json({
        name: "master",
        commits: [
          {
            message: "test 1",
            description: "test desc 1",
            author: "test",
            date: "2020-10-10",
            hexsha: "klsd89sdkj",
          },
          {
            message: "test 2",
            description: "test desc 2",
            author: "test",
            date: "2020-10-10",
            hexsha: "dsksd89",
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays branch detail", async () => {
  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <BranchDetail branchId={1} />
      </QueryClientProvider>
    </BrowserRouter>
  );

  await waitFor(() => expect(screen.getByText("test 1")));
  await waitFor(() => expect(screen.getByText("test 2")));
});
