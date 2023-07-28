import React, { useState } from "react";
import {
  CloseButton,
  Container,
  ModalOverlay,
  Section,
  UserGameContainer,
  VersionRegionContainer,
  UserFeedBackContainer,
  ProposeContainer,
  MainContainer,
  DispositionSpan,
  Header,
} from "./styles";

import bookletImg from "../../../../assets/booklet.svg";
import discImg from "../../../../assets/disc.svg";
import coverImg from "../../../../assets/cover.svg";
import { Star } from "phosphor-react";
import {
  COVER_CONDITION,
  DISC_CONDITION,
  DISPOSITION,
  MANUAL_CONDITION,
} from "../../../../helper/constants";

export function ProposeModal({ game }: any) {
  console.log("proposeModal", game);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ModalOverlay />
      <Container>
        <Header>
          <p>Detalhe do Jogo</p>
        </Header>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <Section>
          <img
            src={`${import.meta.env.VITE_S3_URL}/games/${game.image}`}
            alt={game.title}
          />
          <UserGameContainer>
            <h1>{game.title}</h1>
            <VersionRegionContainer>
              <div>
                <b>Versão</b>
                <span>Normal</span>
              </div>
              <div>
                <b>Region</b>
                <span>America</span>
              </div>
            </VersionRegionContainer>
            <UserFeedBackContainer>
              <section>
                <img
                  src={`${import.meta.env.VITE_S3_URL}/avatar/${
                    game.user.avatar
                  }`}
                  alt="User Image"
                />
                <div>
                  <h1>
                    {`${game.user.first_name} ${game.user.last_name}`}{" "}
                    <span>1</span>
                  </h1>
                  <p>São Paulo / SP</p>
                </div>
              </section>
              <section>
                <b>
                  <h2>Minha Nota 10</h2>
                </b>
              </section>
            </UserFeedBackContainer>
          </UserGameContainer>
        </Section>
        <ProposeContainer>
          <p>Proposta direta</p>
          <select>
            <option value="">Escolha um jogo</option>
            <option value="">Escolha um jogo</option>
          </select>
          <button type="button">Enviar Proposta</button>
        </ProposeContainer>
        <MainContainer>
          <section>
            <div>
              <img src={discImg} alt="disc" />
              <h1>Disc</h1>
            </div>
            <div>{StarsMapping(game.user.inventory.disc_condition)}</div>
            <p>{DISC_CONDITION[game.user.inventory.disc_condition]}</p>
          </section>
          <section>
            <div>
              <img src={coverImg} alt="cover" />
              <h1>Cover</h1>
            </div>
            <div>
              <div>{StarsMapping(game.user.inventory.cover_condition)}</div>
            </div>
            <p>{MANUAL_CONDITION[game.user.inventory.cover_condition]}</p>
          </section>
          <section>
            <div>
              <img src={bookletImg} alt="manual" />
              <h1>Manual</h1>
            </div>
            <div>
              <div>{StarsMapping(game.user.inventory.manual_condition)}</div>
            </div>
            <p>{COVER_CONDITION[game.user.inventory.manual_condition]}</p>
          </section>
        </MainContainer>
        <DispositionSpan disposition={game.user.inventory.disposition}>
          {DISPOSITION[game.user.inventory.disposition]}
        </DispositionSpan>
      </Container>
    </>
  );
}

function StarsMapping(score: number) {
  return (
    <div>
      {Array.from({ length: 7 }, (_, i) => (
        <Star
          key={i}
          color={i < score ? "yellow" : "grey"} // replace 'grey' with your unfilled star color
          weight="fill"
          size={22}
        />
      ))}
    </div>
  );
}
