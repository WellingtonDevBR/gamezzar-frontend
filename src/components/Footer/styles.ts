import styled from "styled-components";

export const Container = styled.footer`
  width: 100%;
  flex-shrink: 0;
  background-color: #0d0d11;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 1000px;
  margin: 0 auto;
  padding: 60px 0 60px 0 ;
`;

export const FooterCompanyLogo = styled.section`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  img {
    width: 10rem;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      padding: 12px;
      border-radius: 8px;
      background: var(--background-second, #343444);

      & + span {
        margin-left: 10px;
      }
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const SocialLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SocialLink = styled.a`
  padding: 12px;
  border-radius: 8px;
  background: var(--background-second, #343444);
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export const FooterSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-self: flex-start; /* Align at the top */

  a {
    color: var(--text-color, #fff);
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.2s;

    &:hover {
      color: var(--primary-color, #ff9000);
    }
  }
`;

export const SubscribeInput = styled.input`
  /* Your input styles here */
  padding: 14.65px;
  border: none;
  font-size: 1rem;
  border-radius: 8px 0 0 8px;
`;

export const SendButton = styled.button`
  /* Your button styles here */
  padding: 15px;
  border: none;
  border-radius: 0 8px 8px 0;
  background-color: var(--primary-color, #5142fc);
  color: var(--text-color, #fff);
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-hover-color, #5142fc);
  }
`;
