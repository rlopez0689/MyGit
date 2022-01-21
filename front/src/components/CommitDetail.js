import { Heading, VStack, Stack, Image, Spinner, Link } from "@chakra-ui/react";
import { useQuery } from "react-query";
import logo from "../commit.jpeg";
import { Link as LinkRouter } from "react-router-dom";
import TextValue from "./utils/TextValue";

import { ArrowBackIcon } from "@chakra-ui/icons";

const BranchDetail = ({ commitId }) => {
  const { isLoading, data, isFetching } = useQuery("getCommit", async () => {
    const data = await fetch(
      `http://localhost:8000/api/commits/${commitId}`
    ).then((res) => res.json());
    return data;
  });

  if (isLoading || isFetching) return <Spinner size="xl" />;
  return (
    <VStack justifyContent="center" mt={5} p={2}>
      <Link
        as={LinkRouter}
        to="/branches"
        px={5}
        alignSelf={"self-start"}
        fontSize={"sm"}
      >
        <ArrowBackIcon /> Go to Branches list
      </Link>
      <Heading
        color={"orange.400"}
        as="h3"
        size="lg"
        mb={2}
        maxWidth={"500px"}
        textAlign={"center"}
      >
        {commitId}
      </Heading>
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
        <Image boxSize="80px" objectFit="contain" src={logo} alt="Git Logo" />
        <VStack alignItems="center" justifyContent="center">
          <TextValue label="Message" value={data.message} />
          <TextValue label="Author Name" value={data.author_name} />
          <TextValue label="Author Email" value={data.author_email} />
          <TextValue label="Date" value={data.date} />
          <TextValue label="No Files Changed" value={data.no_files_changed} />
        </VStack>
      </Stack>
      )}
    </VStack>
  );
};

export default BranchDetail;
