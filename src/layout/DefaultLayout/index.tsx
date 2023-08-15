import { Flex } from "@chakra-ui/react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { TabProvider } from "../../context/DashboardContext";
import { LayoutContainer } from "./styles";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Flex direction="column" minHeight="100vh">
        <TabProvider>
          <Box flex="1">
            <Header />
            <Outlet />
          </Box>
          <Footer />
        </TabProvider>
      </Flex>
    </LayoutContainer>
  );
}
