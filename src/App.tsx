import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import UploadPage from "./pages/AdminUpload";
import Index from "./pages/Index";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";
import { AuthButtons } from "./components/AuthButtons";
import Login from './pages/Login';
import { useEffect } from "react";

const queryClient = new QueryClient();

// 🔐 Hidden Login Shortcut Component
function HiddenLoginShortcut() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "l") {
        navigate("/login");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  return null;
}


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gradient-subtle">
            <AppSidebar />
            <main className="flex-1 flex flex-col overflow-hidden">
              {/* Header with sidebar trigger */}
              <header className="flex items-center gap-2 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/80 px-4 py-3">
                <SidebarTrigger className="lg:hidden" />
                <Link to="/" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center">
                    <span className="text-xs font-bold text-white">AI</span>
                  </div>
                  <h1 className="font-semibold text-sm lg:hidden">AI Prompts</h1>
                </div>
                </Link>
              </header>
              
              <div className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/category/:category" element={<Category />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="/admin/upload" element={<UploadPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
          <AuthButtons/>
          <HiddenLoginShortcut />
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
