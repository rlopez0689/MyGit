import {
  Heading,
  VStack,
  Stack,
  Image,
  Spinner,
  Grid,
  Link,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import logo from "../branch.png";
import { Link as LinkRouter } from "react-router-dom";
import TextValue from "./utils/TextValue";

import { ArrowBackIcon } from "@chakra-ui/icons";

const BranchDetail = ({ branchId }) => {
  const { isLoading, data, isFetching } = useQuery("getBranch", async () => {
    const data = await fetch(
      `http://localhost:8000/api/branches/${branchId}`
    ).then((res) => res.json());
    return data;
  });

  if (isLoading || isFetching) return <Spinner size="xl" />;
  return (
    <VStack justifyContent="center" mt={5}>
      <Link
        as={LinkRouter}
        to="/branches"
        px={5}
        alignSelf={"self-start"}
        fontSize={"sm"}
      >
        <ArrowBackIcon /> Go to Branches list
      </Link>
      <Heading color={"orange.400"} as="h3" size="lg" mb={2}>
        {branchId}
      </Heading>

      <Heading color={"orange.400"} as="h3" size="sm" mb={2}>
        Commits
      </Heading>

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        px={{ base: "2rem", md: "0" }}
        gap={2}
        py={2}
        maxWidth={"800px"}
      >
        {data.commits.map((commit) => (
          <LinkRouter key={commit.hexsha} to={`/commits/${commit.hexsha}`}>
            <Stack
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              boxShadow="sm"
              p={5}
              alignItems="center"
              justifyContent="center"
              minWidth={"250px"}
              height={"100%"}
            >
              <Image
                boxSize="80px"
                objectFit="contain"
                src={logo}
                alt="Git Logo"
              />
              <VStack alignItems="center" justifyContent="center">
                <TextValue label="Message" value={commit.message} />
                <TextValue label="Author" value={commit.author_name} />
                <TextValue label="Date" value={commit.date} />
              </VStack>
            </Stack>
          </LinkRouter>
        ))}
      </Grid>
    </VStack>
  );
};

export default BranchDetail;
