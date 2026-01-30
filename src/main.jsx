import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ✅ Import service worker registration helper
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// ✅ Register the service worker for offline + installability
serviceWorkerRegistration.register();