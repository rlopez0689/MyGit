import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import CommitDetail from "./CommitDetail";
const queryClient = new QueryClient();

const server = setupServer(
  rest.get(
    "http://localhost:8000/api/commits/390b552cf2644e2de2ba6c6fd19d0a80debc6ca2",
    (req, res, ctx) => {
      return res(
        ctx.json({
          message: "Added test instructions",
          author_name: "John",
          author_email: "John@gmail.com",
          date: "09 Jun 2020 02:45",
          no_files_changed: 1,
          hexsha: "390b552cf2644e2de2ba6c6fd19d0a80debc6ca2",
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and display commit detail", async () => {
  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CommitDetail commitId={"390b552cf2644e2de2ba6c6fd19d0a80debc6ca2"} />
      </QueryClientProvider>
    </BrowserRouter>
  );

  await waitFor(() =>
    expect(screen.getByText("390b552cf2644e2de2ba6c6fd19d0a80debc6ca2"))
  );
  await waitFor(() => expect(screen.getByText("Added test instructions")));
});
