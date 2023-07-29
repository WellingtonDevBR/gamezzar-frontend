import { FooterSection } from "../styles";

interface FooterLinksProps {
  title: string;
  links: string[];
}

export function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <FooterSection>
      <h3>{title}</h3>
      <>
        {links.map((link, index) => (
          <a key={index} href="#">
            {link}
          </a>
        ))}
      </>
    </FooterSection>
  );
}
