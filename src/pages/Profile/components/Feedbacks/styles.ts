import styled from "styled-components";

export const Container = styled.footer`
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  padding: 0 0 20px 0;
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  width: 40%;
  margin-top: 20px;

  img {
    width: 100px;
    height: 150px;
    border-radius: 5px;
  }
`;

export const FooterSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
`;

export const FooterArticleContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 10px;
  background-color: #3a31c8;
  padding: 10px;
  border-radius: 5px;

  p {
    display: -webkit-box;
    -webkit-line-clamp: 5; /* number of lines to show */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
  }

  span {
    width: 100%;
    font-size: 12px;
    font-weight: bold;
    text-align: right;
  }
`;

export const FooterUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
`;

export const FooterUserImage = styled.div`
  width: 50px;
  height: 50px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const FooterUserContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  h1 {
    font-size: 16px;
  }

  span {
    font-size: 12px;
    color: #c6c6c6;
  }
`;
