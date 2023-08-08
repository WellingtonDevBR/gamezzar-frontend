import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Image,
  useToast,
  Radio,
  RadioGroup,
  VStack,
  HStack,
  Text,
  Grid,
  Spinner,
} from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";
import Cookies from "js-cookie";

import { useAddressSearch } from "../../../../hooks/useAddressSearch";
import { getAxiosInstance } from "../../../../services/axios";

// Define type for Form Data
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  dob: string;
  gender: "male" | "female" | "other";
  phone: string;
  address: string;
  country: string;
  password: string;
  confirmPassword: string;
};

// Helper function for formatting date
const formatDate = (date?: string) => {
  if (!date) {
    return "";
  }
  if (date.length < 3) {
    return date;
  } else if (date.length < 6) {
    return date.slice(0, 2) + "/" + date.slice(2);
  } else {
    return date.slice(0, 2) + "/" + date.slice(2, 4) + "/" + date.slice(4);
  }
};

export function Profile({ user }: any) {
  const { register, handleSubmit, setValue, watch, control } =
    useForm<FormData>();
  const { addressOptions, fetchAddressOptions, setAddressOptions } =
    useAddressSearch();

  // Define local states
  const [dob, setDob] = useState(formatDate(user?.dob) || "");
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(
    user?.avatar && `${import.meta.env.VITE_S3_URL}/avatar/${user.avatar}`
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const toast = useToast();
  const token = Cookies.get("token");
  const watchAddress = watch("address");

  // Function to handle address change
  const handleAddressChange = (e) => {
    e.preventDefault();
    setValue("address", e.target.value);
    setAddressOptions([]);
  };

  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // Function to handle file change
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setIsLoading(true);

      const reader = new FileReader();

      setProfileImage(event.target.files[0]);

      reader.onload = (e: any) => {
        setImageSrc(e.target.result);
        setIsLoading(false);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    async function updateUserAvatar() {
      const formData = new FormData();
      formData.append("file", profileImage);

      try {
        const response = await axios.post(
          "/api/user/profile-image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLoading(false);
      } catch (error) {
        // Handle your errors here
        console.log(error);
        setIsLoading(false);
      }
    }
    updateUserAvatar();
  }, [profileImage]);

  // Hook for fetching address options
  useEffect(() => {
    if (watchAddress && watchAddress.length > 2) {
      fetchAddressOptions(watchAddress);
    }
  }, [watchAddress, fetchAddressOptions]);

  // Function to convert date format
  const convertDate = (date: string) => {
    const [day, month, year] = date.split("/");
    return `${day}${month}${year}`;
  };

  // Function to handle form submission
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    data.dob = convertDate(data.dob);
    try {
      const response = await axios.put("/api/user/details/update", data);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      // Handle your errors here
      console.log(error);
      setIsLoading(false);
    }
  };

  // Register 'dob' as controlled component
  useEffect(() => {
    register("dob");
  }, [register]);

  // Hook to set 'dob' value
  useEffect(() => {
    setValue("dob", dob);
  }, [dob, setValue]);

  // Hook to display success message and reload page
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success.",
        description: "User Profile Updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  }, [isSuccess, toast]);

  return (
    <Box w="100%" h="100%" p={5}>
      <Grid templateColumns={["1fr", null, "2fr 1fr"]} gap={5}>
        <Stack as="form" spacing={5} onSubmit={handleSubmit(onSubmit)}>
          <HStack justify={"space-between"}>
            <Text fontSize="2xl">Edit Profile</Text>
            <Button colorScheme="red">Delete Account</Button>
          </HStack>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              {...register("username")}
              defaultValue={user?.user_name}
              isDisabled={!!user?.user_name}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input {...register("email")} defaultValue={user?.email} />
          </FormControl>
          <Stack direction={["column", "row"]} spacing={5}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                {...register("firstName")}
                defaultValue={user?.first_name}
                isDisabled={!!user?.first_name}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                {...register("lastName")}
                defaultValue={user?.last_name}
                isDisabled={!!user?.last_name}
              />
            </FormControl>
          </Stack>
          <Stack direction={["column", "row"]} spacing={5}>
            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Controller
                control={control}
                name="dob"
                render={({ field: { onChange, value } }) => (
                  <Input
                    defaultValue={user?.dob}
                    isDisabled={!!user?.dob}
                    value={value}
                    onChange={(event) =>
                      onChange(
                        formatDate(event.target.value.replace(/\D/g, ""))
                      )
                    }
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Controller
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <HStack>
                      <Radio value="male">Male</Radio>
                      <Radio value="female">Female</Radio>
                      <Radio value="other">Other</Radio>
                    </HStack>
                  </RadioGroup>
                )}
                name="gender"
                control={control}
                defaultValue={user?.gender}
              />
            </FormControl>
          </Stack>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input {...register("phone")} defaultValue={user?.phone} />
          </FormControl>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Select {...register("country")} defaultValue={user?.country}>
              {/* replace this with your countries */}
              <option value="Australia">Australia</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              {...register("address")}
              defaultValue={user?.address?.address}
              onChange={(e) => {
                if (e.target.value.length > 2) {
                  fetchAddressOptions(e.target.value);
                }
              }}
            />
            {addressOptions.length > 0 && (
              <Select
                placeholder="Select address"
                colorScheme="teal"
                color="white"
                onChange={handleAddressChange}
              >
                {addressOptions.map((option, index) => (
                  <option
                    key={index}
                    value={option.sla}
                    style={{ backgroundColor: "white", color: "teal" }}
                  >
                    {option.sla}
                  </option>
                ))}
              </Select>
            )}
          </FormControl>
          <VStack align="left" spacing="1" border="1px solid #DF4949" p="20px">
            <Text color="#DF4949" fontSize="2x1">
              Change Password
            </Text>
            <Text color="#DF4949" as="em" fontSize="sm">
              Only fill the fields below in case you want to change your actual
              password.
            </Text>
            <HStack>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register("password")} />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" {...register("confirmPassword")} />
              </FormControl>
            </HStack>
          </VStack>

          <Button
            type="submit"
            bg="#5142FC"
            color="white"
            _hover={{ bg: "#5242fcd1" }}
            isLoading={isLoading}
            spinner={<ClipLoader />}
          >
            Submit
          </Button>
        </Stack>
        <VStack align="center" spacing={6}>
          <FormControl>
            {isLoading ? (
              <Spinner />
            ) : imageSrc ? (
              <Box ml="20px" boxSize="100px">
                <Image
                  src={imageSrc}
                  borderRadius="full"
                  boxSize="100%"
                  objectFit="cover"
                />
              </Box>
            ) : null}
          </FormControl>
          <FormControl>
            <Input
              type="file"
              id="file-input"
              onChange={handleFileChange}
              hidden
            />
            <label htmlFor="file-input">
              <Button
                as="span"
                bg="#5142FC"
                mt={4}
                color="white"
                _hover={{ bg: "#5242fcd1" }}
              >
                Choose Image
              </Button>
            </label>
          </FormControl>
        </VStack>
      </Grid>
    </Box>
  );
}
