import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AmbientBackground } from "@/components/AmbientBackground";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const routerBasename =
  import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "");

const App = () => (
  <BrowserRouter basename={routerBasename}>
    <AmbientBackground />
    <Routes>
      <Route path="/" element={<Index />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
