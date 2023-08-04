import {
  Box,
  SimpleGrid,
  Image,
  Heading,
  Text,
  Link,
  Container,
  AspectRatio,
} from "@chakra-ui/react";
import React from "react";

const blogs = [
  {
    id: 1,
    title: "The Upcoming Revolution in Gaming",
    img: "https://assets-eu-01.kc-usercontent.com/7bf8ef96-9447-0161-1923-3ac6929eb20f/ce160d9b-8f9e-4d73-b05c-337a6a438269/gaming-illustration.jpg?q=75&fm=jpg&w=960",
    excerpt:
      "A deep dive into the trends and technologies that are shaping the future of the gaming industry...",
    link: "#",
  },
  {
    id: 2,
    title: "Unveiling God of War 5: What to Expect",
    img: "https://i.redd.it/r90tvpqmjpb91.jpg",
    excerpt:
      "An early look at the highly anticipated sequel in the God of War franchise...",
    link: "#",
  },
  {
    id: 3,
    title: "Revisiting the Classics: Super Mario Bros",
    img: "https://www.jbhifi.com.au/cdn/shop/products/635757-Product-0-I-638199855008590954.jpg?v=1684388765",
    excerpt:
      "Join us as we delve into the history and enduring appeal of the Super Mario Bros series...",
    link: "#",
  },
  {
    id: 4,
    title: "Exploring the Mysteries of Elden Ring",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg?t=1683618443",
    excerpt:
      "Get ready for an epic journey through a seamless, vast universe filled with dungeons, bosses, and secrets...",
    link: "#",
  },
  {
    id: 5,
    title:
      "The Evolution of Fortnite: From a Simple Game to a Global Phenomenon",
    img: "https://pbs.twimg.com/media/FA4zNjRWUAI9NAu?format=jpg&name=large",
    excerpt:
      "An exploration of how Fortnite has evolved over time, defining a new genre of social gaming in the process...",
    link: "#",
  },
  {
    id: 6,
    title: "The Impact of Blockchain on the Gaming Industry",
    img: "https://www.devteam.space/wp-content/uploads/2018/07/How-Blockchain-Could-Redefine-The-Gaming-Industry.jpg",
    excerpt:
      "We take a look at how blockchain and cryptocurrency technologies are creating new opportunities and challenges in the gaming industry...",
    link: "#",
  },
  {
    id: 7,
    title: "The Intricate World of Red Dead Redemption 2",
    img: "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg?t=1671485009",
    excerpt:
      "Discover the depth and attention to detail that went into creating the immersive world of Red Dead Redemption 2...",
    link: "#",
  },
  {
    id: 8,
    title: "The Magic of Zelda: Breath of the Wild",
    img: "https://www.gameinformer.com/sites/default/files/styles/full/public/2021/04/05/3c688806/desktop-5.jpg",
    excerpt:
      "Explore the beautifully designed and fully interactive world of Zelda: Breath of the Wild...",
    link: "#",
  },
  {
    id: 9,
    title: "The Last of Us Part II: A Tale of Survival and Loss",
    img: "https://www.telegraph.co.uk/content/dam/gaming/2020/06/11/495115ec7aef4c8abd1-98469575-The-Last-of-Us-Part-II-Artwork_trans_NvBQzQNjv4BqtR1WRZ4lb6BOb1-FBRpn-nGTJFJS74MYhNY6w3GNbO8.png",
    excerpt:
      "Experience the intense, emotionally-charged story of survival and loss in The Last of Us Part II...",
    link: "#",
  },
  {
    id: 10,
    title: "The Resurgence of Retro Gaming",
    img: "https://www.comiccrusaders.com/wp-content/uploads/2022/08/carl-raw-m3hn2Kn5Bns-unsplash-1.jpg",
    excerpt:
      "Why are retro games making a comeback? We delve into the appeal of these classic games...",
    link: "#",
  },
  {
    id: 11,
    title: "The Impact of VR on the Gaming Industry",
    img: "https://img1.rapidleaks.com/2023/03/Impact-of-Virtual-Reality-on-the-Gaming-Industry.jpg",
    excerpt:
      "Explore how VR is revolutionizing the gaming industry, offering immersive, lifelike experiences like never before...",
    link: "#",
  },
];

export function Blog() {
  return (
    <Container maxW="container.lg" p="6" mt={10}>
      <Heading mb="6">Blog</Heading>
      <SimpleGrid columns={[1, null, 4]} spacing="6">
        {blogs.map((blog) => (
          <Box
            key={blog.id}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <AspectRatio ratio={12 / 9}>
              <Image src={blog.img} alt={blog.title} objectFit="cover" />
            </AspectRatio>
            <Box p="6" maxHeight="200px" overflow="hidden">
              <Heading size="md" mb="2">
                <Link href={blog.link}>{blog.title}</Link>
              </Heading>
              <Text isTruncated>{blog.excerpt}</Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
