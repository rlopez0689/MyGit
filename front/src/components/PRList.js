import React, { useState } from "react";

import { useQuery, useQueryClient, useMutation } from "react-query";
import {
  Alert,
  AlertIcon,
  Heading,
  VStack,
  Stack,
  Spinner,
  Grid,
  Image,
  Button,
  Text,
  Flex,
  HStack,
} from "@chakra-ui/react";

import TextValue from "./utils/TextValue";

import logo from "../prlogo.png";
import { STATUS_MERGED, STATUS_OPENED, STATUS_CLOSED } from "../utils/utils";

const PRList = () => {
  const [generalError, setGeneralError] = useState(null);
  const queryClient = useQueryClient();
  const mergeMutation = useMutation((prId) => {
    fetch(`http://localhost:8000/api/prs/${prId}/merge/`, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (res.ok) queryClient.invalidateQueries("getPrs");
        else {
          return res.json().then((response) => {
            throw new Error(JSON.stringify(response));
          });
        }
      })
      .catch((error) => setGeneralError(error.message));
  });
  const closeMutation = useMutation((prId) => {
    fetch(`http://localhost:8000/api/prs/${prId}/close/`, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (res.ok) queryClient.invalidateQueries("getPrs");
        else {
          return res.json().then((response) => {
            throw new Error(JSON.stringify(response));
          });
        }
      })
      .catch((error) => setGeneralError(error.message));
  });
  const { isLoading, data, isFetching } = useQuery("getPrs", async () => {
    const data = await fetch("http://localhost:8000/api/prs/").then((res) =>
      res.json()
    );
    return data;
  });

  if (isLoading || isFetching) return <Spinner size="xl" />;

  const getStatusDisplay = (status) => {
    if (status === parseInt(STATUS_OPENED)) return "OPENED";
    else if (status === parseInt(STATUS_MERGED)) return "MERGED";
    else if (status === parseInt(STATUS_CLOSED)) return "CLOSED";
  };
  return (
    <VStack justifyContent="center" mt={5}>
      {generalError && (
        <Alert status="error">
          <AlertIcon />
          {generalError}
        </Alert>
      )}
      <Heading color={"orange.400"} as="h3" size="lg" mb={2}>
        PR'S
      </Heading>

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        px={{ base: "2rem", md: "0" }}
        gap={2}
        py={2}
        maxWidth={"800px"}
      >
        {data.map((pr) => (
          <Stack
            key={pr.id}
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
            <Flex height="20px" w="100%" justifyContent={"center"}>
              <Text>{getStatusDisplay(pr.status)}</Text>
            </Flex>
            <Image
              boxSize="80px"
              objectFit="contain"
              src={logo}
              alt="Git Logo"
            />
            <VStack alignItems="center" justifyContent="center">
              <TextValue label="Title" value={pr.title} />
              <TextValue label="Description" value={pr.description} />
              <TextValue label="Author" value={pr.author} />
              <TextValue label="Org Branch" value={pr.org_branch} />
              <TextValue label="Dest Branch" value={pr.dest_branch} />
            </VStack>
            <HStack>
              {pr.status === parseInt(STATUS_OPENED) && (
                <Button onClick={() => closeMutation.mutate(pr.id)}>
                  Close
                </Button>
              )}
              {pr.status === parseInt(STATUS_OPENED) && (
                <Button onClick={() => mergeMutation.mutate(pr.id)}>
                  Merge
                </Button>
              )}
            </HStack>
          </Stack>
        ))}
      </Grid>
    </VStack>
  );
};

export default PRList;
