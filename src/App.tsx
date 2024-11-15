import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import Blogspage from "./pages/BlogsPage";
import User from "./pages/UserPage";
import SignupPage from "./pages/SignupPage";
import Conference from "./pages/ConferencePage";
import Events from "./pages/EventsPage";
import Event from "./pages/EventPage";
import About from "./pages/AboutPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PageNotFound from "./pages/PageNotFound";
import BlogPage from "./pages/BlogPage";
import ProtectedRoute from "./authentication/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext";
import ScrollToTop from "./ui/ScrollToTop";
import ScrollToTopButton from "./ui/ScrollToTopButton";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import { SearchProvider } from "./context/SearchContext";
import { CommentsProvider } from "./context/CommentsContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SearchProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <BrowserRouter>
            <ScrollToTop />
            <ScrollToTopButton />
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<About />} />
                <Route path="blogs" element={<Blogspage />} />

                <Route
                  path="blog"
                  element={
                    <CommentsProvider>
                      <BlogPage />
                    </CommentsProvider>
                  }
                />
                <Route path="conference" element={<Conference />} />
                <Route path="events" element={<Events />} />
                <Route path="event" element={<Event />} />
                <Route path="signup" element={<SignupPage />} />
                <Route
                  path="user"
                  element={
                    <ProtectedRoute>
                      <User />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Toaster position="top-center" />
          </BrowserRouter>
        </SearchProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
