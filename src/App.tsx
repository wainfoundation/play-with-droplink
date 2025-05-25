
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Templates from "./pages/Templates";
import CreatorDirectory from "./pages/CreatorDirectory";
import Blog from "./pages/Blog";
import Pricing from "./pages/Pricing";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./context/UserContext";
import { GoToTop } from "@/components/GoToTop";
import { FeedbackWidget } from "@/components/feedback/FeedbackWidget";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/creator-directory" element={<CreatorDirectory />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/community" element={<Community />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <GoToTop />
        <FeedbackWidget />
        <Toaster />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
