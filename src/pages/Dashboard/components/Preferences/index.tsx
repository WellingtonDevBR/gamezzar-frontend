import { useForm } from "react-hook-form";
import { Container, MainContainer, InputForm, SelectForm, FormSubmitButton } from "./styles";

const submitForm = (data: any) => {
  console.log(data);
};

const platforms = [
  "Playstation 5",
  "Playstation 4",
  "Playstation 3",
  "Xbox One",
  "Xbox 360",
  "Wii U",
  "Wii",
  "Ps Vita",
  "Nintendo 3DS",
];

const regions = ["Don't have", "America", "Europe", "Asia", "Oceania"];

const PlatformSelect = ({ name, register }: any) => (
  <>
    <label>{name}</label>
    <SelectForm {...register(name.toLowerCase().replace(" ", ""))} id={name}>
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </SelectForm>
  </>
);

export function Preferences() {
  const { register, handleSubmit } = useForm();

  return (
    <Container>
      <h1>Preferences</h1>
      <MainContainer>
        <form onSubmit={handleSubmit(submitForm)}>
          <h2>Status Message</h2>
          <textarea
            {...register("status")}
            id="status"
            cols={80}
            rows={10}
          ></textarea>

          <h2>Accept Trade</h2>
          <div>
            <input
              type="checkbox"
              {...register("shippingType.person")}
              id="person"
              value="true"
            />
            <label htmlFor="person">In-person</label>
          </div>
          <div>
            <input
              type="checkbox"
              {...register("shippingType.postal")}
              id="postal"
              value="true"
            />
            <label htmlFor="postal">Postal Service</label>
          </div>
          <div>
            <input
              type="checkbox"
              {...register("shippingType.courier")}
              id="courier"
              value="true"
            />
            <label htmlFor="courier">Courier</label>
          </div>

          <h2>I want to receive notifications</h2>
          <div>
            <input
              type="checkbox"
              {...register("notifications.siteEmails")}
              id="site-emails"
              value="true"
            />
            <label htmlFor="site-emails">
              Receive other site notifications by email
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              {...register("notifications.partnerEmails")}
              id="partner-emails"
              value="true"
            />
            <label htmlFor="partner-emails">Receive partner emails</label>
          </div>

          <h2>Identification</h2>
          <label>PSN</label>
          <InputForm type="text" {...register("psnUser")} id="psn-user" />
          <label>Xbox</label>
          <InputForm type="text" {...register("liveUser")} id="live-user" />

          <h2>My Platforms</h2>
          {platforms.map((platform) => (
            <PlatformSelect
              key={platform}
              name={platform}
              register={register}
            />
          ))}

          <FormSubmitButton type="submit">Update</FormSubmitButton>
        </form>
      </MainContainer>
    </Container>
  );
}
