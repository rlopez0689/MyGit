import React from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  useDisclosure,
  IconButton,
  HStack,
  Link,
  Stack,
  Button,
  Image,
} from "@chakra-ui/react";
import logo from "../git.png";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { Link as LinkRouter } from "react-router-dom";
import {
  PRS_CREATE_ROUTE,
  BRANCHES_ROUTE,
  PRS_ROUTE,
} from "../routes/utils/routes";
const Links = [
  { name: "Home", link: "/" },
  { name: "Branches", link: `/${BRANCHES_ROUTE}` },
  { name: "PR'S", link: `/${PRS_ROUTE}` },
];

const NavLink = ({ children, active, url }) => {
  return (
    <Link
      as={LinkRouter}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
      fontWeight={active ? "500" : "300"}
      to={url}
    >
      {children}
    </Link>
  );
};

const Nav = ({ active }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Image
                boxSize="50px"
                objectFit="cover"
                src={logo}
                alt="Git Logo"
              />{" "}
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink
                  key={link.name}
                  active={link.name === active}
                  url={link.link}
                >
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Link
              _hover={{
                textDecoration: "none",
              }}
              as={LinkRouter}
              to={`/${PRS_CREATE_ROUTE}`}
            >
              <Button
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                leftIcon={<AddIcon />}
              >
                Create PR
              </Button>
            </Link>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link} url={link.url}>
                  {link}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Nav;
