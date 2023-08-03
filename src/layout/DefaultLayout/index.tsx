import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { TabProvider } from "../../context/DashboardContext";
import { LayoutContainer } from "./styles";
import { Outlet } from "react-router-dom";

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <TabProvider>
        <Header />
        <Outlet />
        <Footer />
      </TabProvider>
    </LayoutContainer>
  );
}
