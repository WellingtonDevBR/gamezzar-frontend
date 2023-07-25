import {
  Container,
  GameSection,
  Button,
  ButtonContainer,
  DescriptionContainer,
  Card,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  MainContainer,
  Table,
  TableHead,
  TableBody,
  Select,
  Form,
  Label,
} from "./styles";
import { useState } from "react";

export function Game() {
  const [selectedTab, setSelectedTab] = useState("owners");

  return (
    <Container>
      <GameSection>
        <div>
          <img src="http://placehold.it/200x200" alt="Product" />
        </div>
        <div>
          <span>Playstation 4</span>
          <h1>God of War</h1>
          <DescriptionContainer>
            <div>
              <b>God of War: Ragnarok: </b>
              <span>
                é um próximo jogo de ação e aventura desenvolvido pela Santa
                Monica Studio e publicado pela Sony Interactive Entertainment. É
                a oitava edição da série God of War e uma sequência do jogo God
                of War de 2018.
              </span>
            </div>
            <div>
              <b>God of War: Ragnarok: </b>
              <span>
                se passa na mitologia nórdica e segue o personagem Kratos e seu
                filho Atreus em sua jornada pelo mundo nórdico. Os jogadores
                controlarão Kratos enquanto ele luta contra várias criaturas
                mitológicas e deuses usando uma variedade de armas e
                habilidades. O jogo contará com uma combinação de exploração,
                resolução de quebra-cabeças e combate.
              </span>
            </div>
            <div>
              <b>God of War: Ragnarok: </b>
              <span>
                está programado para ser lançado em 2022 para o console
                PlayStation 5. Espera-se que seja um jogo épico e cheio de ação
                que atrairá os fãs da série God of War e dos jogos de ação e
                aventura em geral.
              </span>
            </div>
          </DescriptionContainer>
          <ButtonContainer>
            <Button>Eu quero</Button>
            <Button>Eu tenho</Button>
          </ButtonContainer>
        </div>
        <div>
          <img src="http://placehold.it/200x200" alt="Product" />
          <img src="http://placehold.it/200x200" alt="Product" />
        </div>
      </GameSection>
      <MainContainer>
        <Card>
          <Tabs>
            <TabList>
              <Tab
                active={selectedTab === "owners" ? true : false}
                onClick={() => setSelectedTab("owners")}
              >
                Owners
              </Tab>
              <Tab
                active={selectedTab === "interested" ? true : false}
                onClick={() => setSelectedTab("interested")}
              >
                Interested
              </Tab>
              <Tab
                active={selectedTab === "datasheet" ? true : false}
                onClick={() => setSelectedTab("datasheet")}
              >
                Datasheet
              </Tab>
            </TabList>

            {selectedTab === "owners" && (
              <TabPanel>
                <Form>
                  <Label>
                    Version
                    <Select>
                      <option value="normal">Normal</option>
                      <option value="greatestHits">Greatest Hits</option>
                      <option value="platinum">Platinum</option>
                      <option value="gameOfYear">Game of the Year</option>
                      <option value="ultimate">Ultimate</option>
                      <option value="collector">Collector</option>
                      <option value="other">Other</option>
                    </Select>
                  </Label>
                  <Label>
                    Region
                    <Select>
                      <option value="america">America</option>
                      <option value="europe">Europe</option>
                      <option value="asia">Asia</option>
                      <option value="oceania">Oceania</option>
                    </Select>
                  </Label>
                  <Label>
                    State
                    <Select>
                      <option value="NSW">New South Wales</option>
                      <option value="VIC">Victoria</option>
                      <option value="QLD">Queensland</option>
                      <option value="SA">South Australia</option>
                      <option value="WA">Western Australia</option>
                      <option value="TAS">Tasmania</option>
                      <option value="NT">Northern Territory</option>
                      <option value="ACT">Australian Capital Territory</option>
                    </Select>
                  </Label>
                  <label>
                    <input type="checkbox" /> Only those I follow
                  </label>
                </Form>
                <Table>
                  <TableHead>
                    <tr>
                      <th>User</th>
                      <th>Interest</th>
                      <th>Media</th>
                      <th>Box</th>
                      <th>Pullout</th>
                      <th>Distance</th>
                    </tr>
                  </TableHead>
                  <TableBody>
                    {
                      <tr>
                        <th>
                          <img src="http://placehold.it/200x200" alt="test" />
                          <div>
                            <p>Username</p>
                            <span>São Paulo / SP</span>
                          </div>
                        </th>
                        <th>
                          <span>10</span>
                        </th>
                        <th>
                          <span>10</span>
                        </th>
                        <th>
                          <span>10</span>
                        </th>
                        <th>
                          <span>10</span>
                        </th>
                        <th>
                          <span>10</span>
                        </th>
                      </tr>
                    }
                  </TableBody>
                </Table>
              </TabPanel>
            )}
            {selectedTab === "interested" && (
              <TabPanel>
                <Form>
                  <Label>
                    State
                    <Select>
                      <option value="NSW">New South Wales</option>
                      <option value="VIC">Victoria</option>
                      <option value="QLD">Queensland</option>
                      <option value="SA">South Australia</option>
                      <option value="WA">Western Australia</option>
                      <option value="TAS">Tasmania</option>
                      <option value="NT">Northern Territory</option>
                      <option value="ACT">Australian Capital Territory</option>
                    </Select>
                  </Label>
                  <label>
                    <input type="checkbox" /> Only those I follow
                  </label>
                </Form>
                <Table>
                  <TableHead>
                    <tr>
                      <th>User</th>
                      <th>Interest</th>
                      <th>Distance</th>
                    </tr>
                  </TableHead>
                  <TableBody>
                    {
                      <tr>
                        <th>
                          <img src="http://placehold.it/200x200" alt="test" />
                          <div>
                            <p>Username</p>
                            <span>São Paulo / SP</span>
                          </div>
                        </th>
                        <th>
                          <span>10</span>
                        </th>
                        <th>
                          <span>10</span>
                        </th>
                      </tr>
                    }
                  </TableBody>
                </Table>
              </TabPanel>
            )}
            {selectedTab === "datasheet" && (
              <TabPanel>
                <div>
                  <label>Lançamento</label>
                  <span>9 de nov. de 2022</span>
                </div>
                <div>
                  <label>Produtora</label>
                  <span>SCE Santa Monica</span>
                </div>
                <div>
                  <label>Distribuidora</label>
                  <span>Sony Interactive EntertainmentPlayStation Studios</span>
                </div>
                <div>
                  <label>Gênero</label>
                  <span>Aventura</span>
                </div>
                <div>
                  <label>Site Oficial</label>
                  <span>Visitar</span>
                </div>
              </TabPanel>
            )}
          </Tabs>
        </Card>
      </MainContainer>
    </Container>
  );
}
