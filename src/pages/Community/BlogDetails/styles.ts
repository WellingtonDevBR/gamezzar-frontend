import styled from "styled-components";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchIcon from '@mui/icons-material/Search';
import LabelIcon from '@mui/icons-material/Label';


export const PageNav = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #343444;
color: #fff;
padding: 2.5rem;
box-sizing: border-box;
`
export const Title = styled.h1`
font-family: 'Urbanist', Sans-serif;
font-weight: 600;
font-size: 2rem;
  margin: 0;
  text-align: center;
`
export const SubTitle = styled.h3`
font-size: 1rem;
font-family: 'Urbanist', Sans-serif;
font-weight: 400;
  margin: 4px;
  text-align: center;
  white-space: pre-wrap;
  word-break: break-word;
`
export const BoxContainer = styled.div`
  display: flex;
  margin-top: 30px;
  background-color: #343444;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  width: 50%;
  margin-right: auto;
  border-radius: 10px;
  margin-left: 40px;
  margin-bottom: 30px;
  width:100vh

`;

export const BoxContainers = styled.div`
  display: flex;
  margin-top: 30px;
  background-color: #343444;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  width: 50%;
  margin-right: auto;
  border-radius: 10px;
  margin-bottom: 30px;
  width:100%
`;




export const Thumbnails = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin-right: 1rem;
`;

export const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 1rem;
  border-radius: 10px;
`;

export const ContentContainer = styled.div`
  flex-grow: 1;
`;

export const Name = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
`;
export const Names = styled.h3`
  font-size: 0.7rem;
  font-weight: bold;
  margin: 0;
`;

export const SubNames = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

export const SubNamess = styled.div`
  font-size: 0.6rem;
  color: #666;
`;

// export const TimePosted = styled.span`
// display: flex;
// align-items: center;
// font-size: 0.8rem;
// color: #999;
// margin-left: auto;
// `;

export const UserIcon = styled(PeopleAltIcon)`
margin-right: 4px;
`;
export const EnterWordArtSectionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const EnterWordArtIcon = styled(SearchIcon)`
  margin-right: 10px;
`;

export const FilterWithTagsSectionContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const FilterWithTagsIcon = styled(LabelIcon)`
  margin-right: 10px;
`;

export const Tag = styled.div`
  background: gray;
  padding: 5px;
  margin-right: 5px;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;