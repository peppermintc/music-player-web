import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "..";
import PlayListPage from "./PlayListPage";

test("PlayListPage test", () => {
  render(
    <Provider store={store}>
      <PlayListPage />
    </Provider>
  );

  const linkElement = screen.getByText("플레이리스트");
  expect(linkElement).toBeInTheDocument();
});
