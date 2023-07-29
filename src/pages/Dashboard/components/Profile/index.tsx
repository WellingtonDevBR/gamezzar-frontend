import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Form,
  FormLabel,
  FormContainer,
  Input,
  AvatarContainer,
  SplitInputContainer,
  Select,
  SearchOutcomeList,
  PasswordBox,
  MainPasswordBox,
  FormImageLabel,
} from "./styles";
import { useAddressSearch } from "../../../../hooks/useAddressSearch";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  dob: Date;
  gender: "male" | "female" | "other";
  phone: string;
  address: string;
  country: string;
  password: string;
  confirmPassword: string;
};

export function Profile() {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const { addressOptions, fetchAddressOptions } = useAddressSearch();

  const watchAddress = watch("address");

  useEffect(() => {
    if (watchAddress && watchAddress.length > 2) {
      fetchAddressOptions(watchAddress);
    }
  }, [watchAddress, fetchAddressOptions]);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

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
              <Input {...register("username")} />
            </FormLabel>
            <FormLabel>
              <p>Email</p>
              <Input {...register("email")} />
            </FormLabel>
            <SplitInputContainer>
              <FormLabel>
                <p>FirstName</p>
                <Input {...register("firstName")} />
              </FormLabel>
              <FormLabel>
                <p>Lastname</p>
                <Input {...register("lastName")} />
              </FormLabel>
            </SplitInputContainer>
            <FormLabel>
              <p>Date of Birth</p>
              <Input style={{ width: "180px" }} {...register("dob")} />
            </FormLabel>
            <SplitInputContainer>
              <FormLabel>
                <p>Gender</p>
                <Input
                  style={{ width: "50px", height: "20px", marginTop: "10px" }}
                  type="radio"
                  {...register("gender")}
                  value="male"
                />
                Male
                <Input
                  style={{ width: "50px", height: "20px" }}
                  type="radio"
                  {...register("gender")}
                  value="female"
                />
                Female
                <Input
                  style={{ width: "50px", height: "20px" }}
                  type="radio"
                  {...register("gender")}
                  value="other"
                />{" "}
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
              src="https://gamezzar-images.s3.us-east-2.amazonaws.com/avatar/avatar1.svg"
              alt="avatar"
            />
            <input
              type="file"
              name="uploadfile"
              id="img"
              style={{ display: "none" }}
            />
            <FormImageLabel htmlFor="img">upload image</FormImageLabel>
          </AvatarContainer>
        </Form>
      </FormContainer>
    </Container>
  );
}
