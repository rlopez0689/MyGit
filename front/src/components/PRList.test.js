import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "react-query";
import PRList from "./PRList";
import { BrowserRouter } from "react-router-dom";
const queryClient = new QueryClient();

const server = setupServer(
  rest.get("http://localhost:8000/api/prs/", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 3,
          title: "My Pr",
          description: "This a a description",
          author: "rodrigo",
          org_branch: "master",
          dest_branch: "master",
          status: 3,
        },
        {
          id: 2,
          title: "This is it",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel ornare mi, sed rutrum eros.",
          author: "Rodrigo",
          org_branch: "another-test",
          dest_branch: "master",
          status: 3,
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays prs list", async () => {
  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <PRList />
      </QueryClientProvider>
    </BrowserRouter>
  );

  await waitFor(() => expect(screen.getByText("My Pr")));
  await waitFor(() => expect(screen.getByText("This is it")));
});
