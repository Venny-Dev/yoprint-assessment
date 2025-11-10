import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Search from "./pages/Search";
import AnimeDetail from "./pages/AnimeDetail";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";
import Favorites from "./pages/Favorites";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/anime/:id" element={<AnimeDetail />} />
            <Route path="/favorites" element={<Favorites />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
