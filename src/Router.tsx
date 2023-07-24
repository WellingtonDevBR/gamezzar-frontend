import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { Profile } from "./pages/Profile";
import { Dashboard } from "./pages/Dashboard";
import { PageNotFound } from "./components/PageNotFound";
import { Game } from "./pages/Game";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/product/:id" element={<Game />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}
