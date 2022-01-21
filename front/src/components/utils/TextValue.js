import { VStack, Text } from "@chakra-ui/react";

const TextValue = ({ label, value }) => (
  <VStack alignItems="center" justifyContent="center">
    <Text fontSize="sm" color="gray.400">
      {label}
    </Text>{" "}
    <Text mt={0}> {value}</Text>
  </VStack>
);

export default TextValue;
