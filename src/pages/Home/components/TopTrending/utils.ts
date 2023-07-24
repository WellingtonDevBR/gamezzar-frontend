import avatarTwoImage from "../../../../assets/avatar2.svg";
import zeldaImg from "../../../../assets/zelda.svg";
import tlofImage from "../../../../assets/tlof.svg";
import gowImage from "../../../../assets/gow.svg";
import callistImage from "../../../../assets/callist.svg";

export interface ICardData {
  imageUrl: string;
  title: string;
  subtitle: string;
  footerImg: string;
  creatorLabel: string;
  creatorName: string;
}

export const importImages = (): ICardData[] => [
  {
    imageUrl: zeldaImg,
    title: "Hamlet Contemplates",
    subtitle: "BSC",
    footerImg: avatarTwoImage,
    creatorLabel: "Creator",
    creatorName: "Salvador Dali",
  },
  {
    imageUrl: tlofImage,
    title: "Hamlet Contemplates",
    subtitle: "BSC",
    footerImg: avatarTwoImage,
    creatorLabel: "Creator",
    creatorName: "Salvador Dali",
  },
  {
    imageUrl: gowImage,
    title: "Hamlet Contemplates",
    subtitle: "BSC",
    footerImg: avatarTwoImage,
    creatorLabel: "Creator",
    creatorName: "Salvador Dali",
  },
  {
    imageUrl: callistImage,
    title: "Hamlet Contemplates",
    subtitle: "BSC",
    footerImg: avatarTwoImage,
    creatorLabel: "Creator",
    creatorName: "Salvador Dali",
  },
  {
    imageUrl: gowImage,
    title: "Hamlet Contemplates",
    subtitle: "BSC",
    footerImg: avatarTwoImage,
    creatorLabel: "Creator",
    creatorName: "Salvador Dali",
  },
  {
    imageUrl: callistImage,
    title: "Hamlet Contemplates",
    subtitle: "BSC",
    footerImg: avatarTwoImage,
    creatorLabel: "Creator",
    creatorName: "Salvador Dali",
  },
  {
    imageUrl: zeldaImg,
    title: "Hamlet Contemplates",
    subtitle: "BSC",
    footerImg: avatarTwoImage,
    creatorLabel: "Creator",
    creatorName: "Salvador Dali",
  },
];
