import React from "react";
import { CardBox } from "./CardBox";
import { useState } from "react";
import { PageNav, Title, SubTitle, Container, ItemDetails, MethodBoxes, BtnBox,BtnBox2  } from "./styles";
import { Clock, Tag, UsersThree } from "phosphor-react";

interface FormValues {
  Price: string;
  Title: string;
  Description: string;
  lorem: string;
  Size: string;
  collection: string;
}

export function CreateItem() {
  const [formValues, setFormValues] = useState<FormValues>({
    Price: "",
    Title: "",
    Description: "",
    lorem: "",
    Size: "",
    collection: "",
  });

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

 const handleCollectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      collection: value,
    }));
  };
  return (
    <>
      <PageNav>
        <Title>Create Item</Title>
        <SubTitle>Home / Pages / Create Item </SubTitle>
      </PageNav>
      
      <Container>
        <CardBox
          image="https://gamezzar-images.s3.us-east-2.amazonaws.com/games/ac-valhalla.jpg"
          title="Cyber Doberman #766"
          description="Description goes here"
          price="100"
          id="1"
        />
        <ItemDetails>
          <MethodBoxes>
            <p> PNG, JPG, GIF , WEBP or MP4 Max 200mb </p>
            <button>Upload file</button>
          </MethodBoxes>
          <h3> Select Method</h3>
          <BtnBox>
            <button> <Tag size={15} weight="bold" />  Fixed price</button>
            <button> <Clock size={15} weight="bold" /> Time auctions</button>
            <button> <UsersThree size={15} weight="bold" />Open for Bids</button>
          </BtnBox>
          <h3>Price</h3>
          <input
            type="text"
            name="Price"
            value={formValues.Price}
            onChange={handleInputChange}
            placeholder="Enter Price for one item"
          />
          <h3>Title</h3>
          <input
            type="text"
            name="Title"
            value={formValues.Title}
            onChange={handleInputChange}
            placeholder="Item Name"
          />

          <h3>Description</h3>
          <input
            type="text"
            name="Description"
            value={formValues.Description}
            onChange={handleInputChange}
            placeholder="e.g. 'This is a very limited item'"
          />
        <BtnBox2 >
          <h3>Lorem</h3>
          
          <input
            type="text"
            name="Lorem"
            value={formValues.lorem}
            onChange={handleInputChange}
            placeholder="5%"
          />
          <h3>Size</h3>
          <input
            type="size"
            name="Size"
            value={formValues.Size}
            onChange={handleInputChange}
            placeholder="e.g. 'size'"
          />

<h3>Collection</h3>
     
      <select
        name="collection"
        value={formValues.collection}
        onChange={handleCollectionChange}
      >
        <option value="">Abstraction</option>
        <option value="collection1">Art </option>
        <option value="collection2">Music </option>
        <option value="collection3">others </option>
      </select>
      </BtnBox2 >
        </ItemDetails>
      </Container>
    </>
  );
}
