import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Form,
  FormLabel,
  FormContainer,
  Input,
  InputDisabled,
  AvatarContainer,
  SplitInputContainer,
  Select,
  SearchOutcomeList,
  PasswordBox,
  MainPasswordBox,
  FormImageLabel,
} from "./styles";
import { useAddressSearch } from "../../../../hooks/useAddressSearch";
import { getAxiosInstance } from "../../../../services/axios";
import Cookies from "js-cookie";

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
  const { addressOptions, fetchAddressOptions } = useAddressSearch();
  const [dob, setDob] = useState(formatDate(user?.dob) || "");

  const token = Cookies.get("token");

  const watchAddress = watch("address");

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  useEffect(() => {
    if (watchAddress && watchAddress.length > 2) {
      fetchAddressOptions(watchAddress);
    }
  }, [watchAddress, fetchAddressOptions]);

  const convertDate = (date: string) => {
    const [day, month, year] = date.split("/");
    return `${day}${month}${year}`;
  };

  const onSubmit = async (data: FormData) => {
    const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // If you're using date, convert it to the appropriate format
    // because JavaScript's Date will include the time by default
    data.dob = convertDate(data.dob);

    console.log(profileImage);

    if (profileImage) {
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
        // Handle your response here
        console.log(response.data);
      } catch (error) {
        // Handle your errors here
        console.log(error);
      }
    }

    try {
      const response = await axios.put("/api/user/details/update", data);
      // Handle your response here
      console.log(response.data);
    } catch (error) {
      // Handle your errors here
      console.log(error);
    }
  };

  useEffect(() => {
    register("dob");
  }, [register]);

  useEffect(() => {
    setValue("dob", dob);
  }, [dob, setValue]);

  return (
    <Container>
      <section>
        <h1>Edit Profile</h1>
        <FormImageLabel backgroundColor={"#ff0021"}>
          Delete Account
        </FormImageLabel>
      </section>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FormLabel>
              <p>Username</p>
              {user?.user_name ? (
                <InputDisabled
                  {...register("username")}
                  defaultValue={user?.user_name}
                  disabled
                />
              ) : (
                <Input {...register("username")} />
              )}
            </FormLabel>
            <FormLabel>
              <p>Email</p>
              <Input {...register("email")} value={user?.email} />
            </FormLabel>
            <SplitInputContainer>
              <FormLabel>
                <p>FirstName</p>
                {user?.first_name ? (
                  <InputDisabled
                    {...register("firstName")}
                    defaultValue={user?.first_name}
                    disabled
                  />
                ) : (
                  <Input {...register("firstName")} />
                )}
              </FormLabel>
              <FormLabel>
                <p>Lastname</p>
                {user?.last_name ? (
                  <InputDisabled
                    {...register("lastName")}
                    defaultValue={user?.last_name}
                    disabled
                  />
                ) : (
                  <Input {...register("lastName")} />
                )}
              </FormLabel>
            </SplitInputContainer>
            <SplitInputContainer>
              <FormLabel>
                <p>Date Of Birth</p>
                <Controller
                  name="dob"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      style={{ width: "180px" }}
                      onChange={(event) => {
                        const value = event.target.value;
                        const formattedValue = formatDate(
                          value.replace(/[^0-9]/g, "").substring(0, 8)
                        );
                        field.onChange(formattedValue);
                      }}
                    />
                  )}
                />
              </FormLabel>
              <div>
                <FormLabel>
                  <p>Mobile Number</p>
                  <Input
                    {...register("phone")}
                    defaultValue={user?.mobile_number}
                  />
                </FormLabel>
              </div>
            </SplitInputContainer>

            <SplitInputContainer>
              <FormLabel>
                <p>Gender</p>
                <Input
                  style={{ width: "50px", height: "20px", marginTop: "10px" }}
                  type="radio"
                  {...register("gender")}
                  value="male"
                  defaultChecked={user?.gender === "male"}
                />
                Male
                <Input
                  style={{ width: "50px", height: "20px" }}
                  type="radio"
                  {...register("gender")}
                  value="female"
                  defaultChecked={user?.gender === "female"}
                />
                Female
                <Input
                  style={{ width: "50px", height: "20px" }}
                  type="radio"
                  {...register("gender")}
                  value="other"
                  defaultChecked={user?.gender === "other"}
                />
                Other
              </FormLabel>
            </SplitInputContainer>
            <FormLabel>
              <p>Country</p>
              <Select
                style={{ width: "100%", marginBottom: "10px" }}
                {...register("country")}
              >
                <option value="australia">Australia</option>
              </Select>
            </FormLabel>
            <FormLabel>
              <p>Address</p>
              <Input
                style={{ width: "100%", marginBottom: "-5px" }}
                {...register("address")}
                defaultValue={user?.address?.address}
              />
              {addressOptions.map((option, index) => {
                if (option.sla !== watchAddress) {
                  return (
                    <SearchOutcomeList
                      key={index}
                      onClick={() => setValue("address", option.sla)}
                    >
                      {option.sla}
                    </SearchOutcomeList>
                  );
                }
              })}
            </FormLabel>
            <PasswordBox>
              <MainPasswordBox>
                <h2>Change your password</h2>
                <span>
                  Só preencha os campos abaixo caso queira alterar sua senha
                  atual.
                </span>
                <SplitInputContainer>
                  <FormLabel>
                    <p>Password</p>
                    <Input type="password" {...register("password")} />
                  </FormLabel>
                  <FormLabel>
                    <p>Confirm Password</p>
                    <Input type="password" {...register("confirmPassword")} />
                  </FormLabel>
                </SplitInputContainer>
              </MainPasswordBox>
            </PasswordBox>
            <button type="submit">Update Cadastrado</button>
          </div>
          <AvatarContainer>
            <img
              src={
                user?.avatar
                  ? `${import.meta.env.VITE_S3_URL}/avatar/${user.avatar}`
                  : "https://gamezzar-images.s3.us-east-2.amazonaws.com/avatar/avatar1.svg"
              }
              alt="avatar"
            />
            <input
              type="file"
              name="uploadfile"
              id="img"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <FormImageLabel htmlFor="img">upload image</FormImageLabel>
          </AvatarContainer>
        </Form>
      </FormContainer>
    </Container>
  );
}
