import React from "react";
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import logo from "../git.png";

const Hero = () => (
  <Container maxW={"5xl"}>
    <Stack textAlign={"center"} align={"center"} mt={10}>
      <Heading
        fontWeight={600}
        fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
        lineHeight={"110%"}
      >
        Git with{" "}
        <Text as={"span"} color={"orange.400"}>
          MyGit
        </Text>
        <Flex w={"full"} justifyContent="center">
          <Image boxSize="250px" objectFit="cover" src={logo} alt="Git Logo" />
        </Flex>
      </Heading>
      <Text color={"gray.500"} maxW={"3xl"}>
        Git is a free and open source distributed version control system
        designed to handle everything from small to very large projects with
        speed and efficiency.
      </Text>
      <Text color={"gray.500"} maxW={"3xl"}>
        Git is easy to learn and has a tiny footprint with lightning fast
        performance. It outclasses SCM tools like Subversion, CVS, Perforce, and
        ClearCase with features like cheap local branching, convenient staging
        areas, and multiple workflows.
      </Text>
      <Stack spacing={6} direction={"row"}>
        <Link to="/branches">
          <Button rounded={"full"} px={6}>
            Go to Branches
          </Button>
        </Link>
        <Link to="/prs/create">
          <Button rounded={"full"} px={6}>
            Create a PR
          </Button>
        </Link>
      </Stack>
    </Stack>
  </Container>
);

export default Hero;
