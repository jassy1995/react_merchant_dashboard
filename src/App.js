import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import SkillPage from "./pages/SkillPage";
import UnSkillPage from "./pages/UnSkillPage";
import ArtisanPage from "./pages/Artisanpage";
import CustomerRequestPage from "./pages/CustomerRequestPage";
import ListPage from "./pages/ListPage";
import AuthGuard from "./guard/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" limit={1} />
        <Routes>
          <Route path="/" element={<Index />}>
            <Route index element={<DashboardPage />} />
            <Route path="skill" element={<SkillPage />} />
            <Route path="unSkill" element={<UnSkillPage />} />
            <Route path="artisan" element={<ArtisanPage />} />
            <Route path="customer" element={<CustomerRequestPage />} />
            <Route
              path="/list/:id"
              element={
                <AuthGuard>
                  <ListPage />
                </AuthGuard>
              }
            ></Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
