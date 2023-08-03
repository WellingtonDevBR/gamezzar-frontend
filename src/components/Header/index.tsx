import {
  Flex,
  Box,
  Link,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import HeaderLogo from "../../assets/logo.svg";
import { Link as RouterLink } from "react-router-dom";
import Cookies from "js-cookie";
import { getAxiosInstance } from "../../services/axios";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { title: "Home", path: "/" },
  { title: "Explore", path: "/explorer" },
  { title: "Activity", path: "/activity" },
  { title: "Community", path: "#" },
  { title: "Contact", path: "/contact" },
];

interface UserResponseProps {
  user_id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  avatar: string;
  email: string;
  created_at: string;
}

export function Header() {
  let token = Cookies.get("token");
  const [user, setUser] = useState<UserResponseProps | null>(null);
  useEffect(() => {
    async function fetchData() {
      if (token) {
        const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get("/api/user/details");
        setUser(response.data);
      }
    }
    fetchData();
  }, []);

  return (
    <Flex
      as="header"
      width="full"
      align="center"
      justifyContent="space-between"
      p={4}
      bg="blackAlpha.400"
      color="white"
    >
      {/* Logo */}
      <Box>
        <Link as={RouterLink} to="/">
          <Image src={HeaderLogo} alt="logo" h="40px" />
        </Link>
      </Box>

      {/* Middle Links */}
      <Box>
        <Flex>
          {NAV_ITEMS.map((navItem) => (
            <Link as={RouterLink} to={navItem.path} key={navItem.title} mx={2}>
              {navItem.title}
            </Link>
          ))}
        </Flex>
      </Box>

      {/* Search, Login, and Signup Buttons */}
      <Flex align="center">
        <Button
          leftIcon={<SearchIcon />}
          variant="outline"
          colorScheme="teal"
          mr={2}
        >
          Search
        </Button>

        {user !== null ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg="#5142FC"
              color="white"
              _hover={{
                bg: "#3f32ca",
              }}
              _active={{
                bg: "#31279e",
              }}
            >
              Hello, {user.user_name}
            </MenuButton>
            <MenuList
              bg="#5142FC"
              color="white"
              borderColor="gray.600"
              borderWidth="1px"
              borderRadius="md"
              py={1}
              dir="rtl"
            >
              <MenuItem
                as={RouterLink}
                to="/dashboard"
                bg="#5142FC"
                _hover={{ bg: "#3f32ca" }}
                _active={{ bg: "#31279e" }}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                as={RouterLink}
                to="/chat"
                bg="#5142FC"
                _hover={{ bg: "#3f32ca" }}
                _active={{ bg: "#31279e" }}
              >
                Go to Chat
              </MenuItem>
              <MenuItem
                as={RouterLink}
                to={'/dashboard'}
                state={{ tab: 'Profile'}}
                bg="#5142FC"
                _hover={{ bg: "#3f32ca" }}
                _active={{ bg: "#31279e" }}
              >
                Go to Profile
              </MenuItem>
              <MenuItem
                as={RouterLink}
                to={'/dashboard'}
                state={{ tab: 'Preferences'}}
                bg="#5142FC"
                _hover={{ bg: "#3f32ca" }}
                _active={{ bg: "#31279e" }}
              >
                Settings
              </MenuItem>
              <MenuItem
                as={RouterLink}
                to="/logout"
                bg="#5142FC"
                _hover={{ bg: "#3f32ca" }}
                _active={{ bg: "#31279e" }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Box>
            <Button
              as={RouterLink}
              to="/login"
              mr={2}
              color="white"
              bg="purple.500"
              _hover={{
                bg: "purple.600",
              }}
              _active={{
                bg: "purple.700",
              }}
            >
              Login
            </Button>
            <Button
              as={RouterLink}
              to="/signup"
              colorScheme="teal"
              variant="outline"
              color="white"
              _hover={{
                bg: "teal.500",
                color: "white",
              }}
              _active={{
                bg: "teal.600",
                color: "white",
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Flex>
    </Flex>
  );
}
