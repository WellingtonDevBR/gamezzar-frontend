import { ContactPage,
    PageNav,
    Title,
    SubTitle, 
    MapBox ,
    ContactForm,
    Paragraph,
    FormField,
    Label,
    Input, 
    Select,
    TextArea,
    Button,
} from "./styles"

export function Contact () {
    return (
        <>
      <PageNav>
        <Title>Contact</Title>
        <SubTitle>Home/Contact/Contact1</SubTitle>
      </PageNav>
      <ContactPage>
        <MapBox></MapBox>
        <ContactForm>
          <h1>Drop us a Message</h1>
          <br />
          <Paragraph>
            Lorem Ipsum dolor sit amet, consectur adipisicing elit. Laborum
            obcaecati dignissimos quae quo ad iste ipsum officits deleniti
            asperiores sit.
          </Paragraph>
          <FormField>
            <label htmlFor="full-name">Full Name</label>
            <Input type="text" id="full-name" />
            

            <label htmlFor="email">Email Address</label>
            <Input type="email" id="email" />

            <label htmlFor="subject">Select subject</label>
            <Select id="subject">
              <option value="">Choose a Subject</option>
              <option value="support">Support</option>
              <option value="sales">Sales</option>
              <option value="general">General inquiry</option>
            </Select>
          </FormField>
          <FormField>
            <Label htmlFor="message">Message</Label>
            <TextArea id="message" rows={4} />
          </FormField>
          <Button type="submit">Send Message</Button>
        </ContactForm>
      </ContactPage>
    </>
  );
}