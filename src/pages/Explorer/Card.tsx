import React from "react";
import {
  CardContainer,
  CardImage,
  ComingSoon,
  Favourite,
  TitleCard,
  TitleText,
  TitleLabel,
  ProfileHolder,
  ProfileImage,
  ProfileTextHolder,
  ProfileLabel,
  BtnHolder,
  TradeBtn,
  HistoryBtn,
} from "./styles";

interface CardProps {
  isComingSoon: boolean;
  like: number;
  title: string;
  owner: string;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <CardContainer className="card">
      <CardImage className="card-image">
        {props.isComingSoon && <ComingSoon className="coming-soon">Coming soon</ComingSoon>}
        <Favourite className="favourite">
          <span>&hearts;</span>
          <span>{props.like}</span>
        </Favourite>
      </CardImage>
      <TitleCard className="title-card">
        <TitleText>
          <strong>{props.title}</strong>
        </TitleText>
        <TitleLabel>BSC</TitleLabel>
      </TitleCard>
      <ProfileHolder className="profile-holder">
        <ProfileImage className="profile-image"></ProfileImage>
        <ProfileTextHolder className="profile-txt-holder">
          <ProfileLabel>Owned By</ProfileLabel>
          <strong>{props.owner}</strong>
        </ProfileTextHolder>
      </ProfileHolder>
      <BtnHolder className="btn-holder">
        <TradeBtn className="trade-btn">Trade</TradeBtn>
        <HistoryBtn className="history-btn">View History</HistoryBtn>
      </BtnHolder>
    </CardContainer>
  );
};

export default Card;
