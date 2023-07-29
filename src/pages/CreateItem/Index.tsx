import { ArrowsClockwise, Heart, Tote } from "phosphor-react";
import { useState } from "react"; // Import useState hook
import {
  PageNav,
  Title,
  SubTitle,
  Container,
  ItemDetails,
  HeaderContainer,
  HeaderSpanContent,
  SpanOptionsContainer,
  ImageContainer,
  MainContainer,
  BoxContainer,
  Button,
} from "./styles";

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

  return (
    <>
      <PageNav>
        <Title>Create Item</Title>
        <SubTitle>Home / Pages / Create Item </SubTitle>
      </PageNav>
      <Container>
        {/* ... Your existing components ... */}
        <ItemDetails>
          <p> PNG, JPG, GIF , WEBP or MP4 Max 200mb </p>
          <button>Upload file</button>
        </ItemDetails>
        <div>
          <h1> Select Method</h1>
          <button>Fixed price</button>
          <button>Time auctions</button>
          <button> Open for Bids</button>
        </div>
        <span>Price</span>
        <input
          type="text"
          name="Price"
          value={formValues.Price}
          onChange={handleInputChange}
          placeholder="Enter Price for one item"
        />
        {/* Add other input components for other fields here */}
      </Container>
    </>
  );
}
