import "dayjs/locale/vi";
import "reflect-metadata";

import { CssBaseline } from "@mui/material";
import {
  LocalizationProvider,
  type PickersLocaleText,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { viVN } from "@mui/x-date-pickers/locales";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Dayjs } from "dayjs";
import * as ReactDOM from "react-dom/client";
import { ThemeRegistry } from "./config/theme/index.ts";
import ToastContainer from "./shared/components/toast-container/toast-container.tsx";
import { initLocaleForDayJs } from "./shared/utilities/dayjs-local.ts";
import { MountPoint } from "./shared/utilities/sync-ui.ts";

import "react-toastify/dist/ReactToastify.css";
import "./tailwind.css";
import App from "./app.tsx";

import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/authen/AuthContext.tsx";
import { CartProvider } from "./context/cart/CartContext.tsx";

initLocaleForDayJs();
const localeText: Partial<PickersLocaleText<Dayjs>> = {
  ...viVN.components.MuiLocalizationProvider.defaultProps.localeText,
  okButtonLabel: "Chọn",
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 6000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="vi"
      localeText={localeText}
    >
      <ThemeRegistry>
        <AuthContextProvider>
          <BrowserRouter>
           <CartProvider>
            <App />
           </CartProvider>
          </BrowserRouter>
        </AuthContextProvider>
        <CssBaseline />
        <ToastContainer autoClose={4000} hideProgressBar limit={5} />
        <MountPoint />
      </ThemeRegistry>
    </LocalizationProvider>
  </QueryClientProvider>
);
