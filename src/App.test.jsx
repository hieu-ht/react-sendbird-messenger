import React from "react";
import {
  cleanup,
  render,
  wait,
  screen,
  waitForElement,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

import App from "./App";
import { FirebaseProvider, AuthProvider } from "./context";
import { PRIMARY_COLOR } from "./constants";

afterEach(cleanup);

test("renders learn react link", async () => {
  TopBarProgress.config({
    barColors: {
      0: PRIMARY_COLOR,
      0.5: PRIMARY_COLOR,
      "1.0": PRIMARY_COLOR,
    },
    shadowBlur: 5,
  });
  const history = createMemoryHistory();
  const { getByText } = render(
    <FirebaseProvider>
      <AuthProvider>
        <Router history={history}>
          <App />
        </Router>
      </AuthProvider>
    </FirebaseProvider>
  );
  const lazyElement = await waitForElement(() =>
    getByText(/SendBird Messenger/i)
  );
  expect(lazyElement).toBeInTheDocument();
});
