import { useQuery } from "react-query";
import { Heading, VStack, Stack, Spinner, Grid, Image } from "@chakra-ui/react";
import { Link as LinkRouter } from "react-router-dom";

import TextValue from "./utils/TextValue";

import logo from "../branch.png";

const BranchList = () => {
  const { isLoading, data, isFetching } = useQuery("getBranches", async () => {
    const data = await fetch("http://localhost:8000/api/branches/").then(
      (res) => res.json()
    );
    return data;
  });
  if (isLoading || isFetching) return <Spinner size="xl" />;
  return (
    <VStack justifyContent="center" mt={5}>
      <Heading color={"orange.400"} as="h3" size="lg" mb={2}>
        Branches
      </Heading>

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        px={{ base: "2rem", md: "0" }}
        gap={2}
        py={2}
        maxWidth={"800px"}
      >
        {data.map((branch) => (
          <LinkRouter key={branch.name} to={`/branches/${branch.name}`}>
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
                <TextValue label="Name" value={branch.name} />
                <TextValue label="No. Commits" value={branch.commits.length} />
              </VStack>
            </Stack>
          </LinkRouter>
        ))}
      </Grid>
    </VStack>
  );
};

export default BranchList;
