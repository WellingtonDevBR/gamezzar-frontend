import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { Profile } from "./pages/Profile";
import { Dashboard } from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PageNotFound } from "./components/PageNotFound";
import { Login } from "./pages/Login";
import SignUp from "./pages/Home/SignUp/SignUp";


export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/Signup" element={<SignUp />} />
        
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Route>
      
    </Routes>
  );
}
