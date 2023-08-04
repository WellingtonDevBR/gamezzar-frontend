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
  Input,
  useDisclosure,
  Slide,
  Collapse,
  Text,
  Portal,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import HeaderLogo from "../../assets/logo.svg";
import { Link as RouterLink } from "react-router-dom";
import Cookies from "js-cookie";
import { getAxiosInstance } from "../../services/axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HStack } from "@chakra-ui/react";
import { useTabContext } from "../../context/DashboardContext";

const NAV_ITEMS = [
  { title: "Home", path: "/" },
  { title: "Explorer", path: "/explorer" },
  // { title: "Activity", path: "/activity" },
  { title: "Community", path: "#" },
  // { title: "Contact", path: "/contact" },
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
  const [searchInput, setSearchInput] = useState("");
  const [inputWidth, setInputWidth] = useState("0px");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { setActiveTab } = useTabContext();
  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);

  const fetchProducts = async (search: string) => {
    const response = await axios.get(`/api/game/search?query=${search}`);
    setProducts(response.data);
  };

  const { isOpen, onToggle, onClose } = useDisclosure();

  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLDivElement>(null);

  const handleSearchInputChange = (event) => {
    if (event.target.value === "") {
      setProducts([]);
    }
    const inputValue = event.target.value;
    setSearchInput(inputValue); // Update the state with the current input value
    fetchProducts(inputValue); // Fetch the search results based on the input value
  };

  const handleProductSelect = (productId) => {
    navigate(`/game/${productId}`);
    navigate(0);
    setSearchInput(""); // clear the input field
    setInputWidth("0px");
    setProducts([]);
    onClose();
  };

  const handleSearchClick = () => {
    setInputWidth(isOpen ? "0px" : "200px");
    onToggle();
  };

  // Function to close search when clicked outside
  const handleClickOutside = (event) => {
    if (
      searchButtonRef.current?.contains(event.target) === false &&
      searchInputRef.current?.contains(event.target) === false
    ) {
      setSearchInput(""); // clear the input field
      setProducts([]);
      setInputWidth("0px");
      onClose();
    }
  };

  useEffect(() => {
    // Listen for mousedown events on the document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      borderBottom="1px solid #242323"
    >
      {/* Logo */}
      <Box>
        <Link as={RouterLink} to="/">
          <Image objectFit="fill" src={HeaderLogo} alt="logo" h="70px" />
        </Link>
      </Box>

      {/* Middle Links */}
      <Box>
        <Flex
          align="center"
          justify="space-around"
          spacing="50px"
          w="100%"
          h="50px"
        >
          {NAV_ITEMS.map((navItem) => (
            <Link
              as={RouterLink}
              to={navItem.path}
              key={navItem.title}
              mx={2}
              fontSize="lg" // Use a larger font size
              fontWeight="semibold" // Make the font weight semi-bold
              _hover={{
                // Hover effects
                textDecoration: "none", // Add underline on hover
                color: "#5142FC", // Change color on hover
              }}
              p={2} // Add padding to give more clickable area
            >
              {navItem.title}
            </Link>
          ))}
        </Flex>
      </Box>

      {/* Search, Login, and Signup Buttons */}
      <Flex align="center" position="relative">
        <Button
          ref={searchButtonRef}
          leftIcon={<SearchIcon />}
          variant="outline"
          colorScheme="teal"
          mr={2}
          onClick={handleSearchClick}
        >
          Search
        </Button>

        <Box
          // Search Box
          ref={searchInputRef}
          width={inputWidth}
          transition="width 0.5s"
          overflow="hidden"
          mr={2}
          position="relative" // Make sure this is here as well
        >
          <Input
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search for products"
            variant="outline"
            colorScheme="teal"
            width="200px"
          />
          {isOpen && products.length > 0 && (
            <Box
              bg="blackAlpha.800"
              mt={0}
              p={3}
              boxShadow="md"
              position="fixed"
              width="20%"
              maxH="300px"
              overflowY="auto"
              zIndex={2000} // Increased
              sx={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              }}
            >
              {products.map((product) => (
                <HStack
                  key={product.game_id}
                  onClick={() => handleProductSelect(product.game_id)}
                  justify={"start"}
                  _hover={{ backgroundColor: "gray.600", cursor: "pointer" }} // Add hover effect
                  mb={2}
                >
                  <Image
                    src={`${import.meta.env.VITE_S3_URL}/games/${
                      product.image
                    }`}
                    alt={product.title}
                    h="70px"
                  />
                  <Text>{product.title}</Text>
                </HStack>
              ))}
            </Box>
          )}
        </Box>
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
                onClick={() => setActiveTab("Opportunities")}
                as={RouterLink}
                to="/dashboard"
                bg="#5142FC"
                _hover={{ bg: "#3f32ca" }}
                _active={{ bg: "#31279e" }}
              >
                Dashboard
              </MenuItem>

              <MenuItem
                onClick={() => setActiveTab("Profile")}
                as={RouterLink}
                to={"/dashboard"}
                state={{ tab: "Profile" }}
                bg="#5142FC"
                _hover={{ bg: "#3f32ca" }}
                _active={{ bg: "#31279e" }}
              >
                Go to Profile
              </MenuItem>
              <MenuItem
                onClick={() => setActiveTab("Preferences")}
                as={RouterLink}
                to={"/dashboard"}
                state={{ tab: "Preferences" }}
                replace
                bg="#5142FC"
                _hover={{ bg: "#3f32ca" }}
                _active={{ bg: "#31279e" }}
              >
                Settings
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
              bg="#5142FC"
              _hover={{
                bg: "#3f32ca",
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
                bg: "teal",
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
