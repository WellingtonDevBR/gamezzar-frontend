import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { Profile } from "./pages/Profile";
import { Dashboard } from "./pages/Dashboard";
import { PageNotFound } from "./components/PageNotFound";
import { Game } from "./pages/Game";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp/SignUp";
import { AddGame } from "./pages/AddGame";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/game/add/:id" element={<AddGame />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
