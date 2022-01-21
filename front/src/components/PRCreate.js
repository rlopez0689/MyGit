import React, { useState } from "react";

import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Alert,
  AlertIcon,
  HStack,
  Select,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { STATUS_OPENED, STATUS_MERGED } from "../utils/utils";

const PRSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  author: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  org_branch: Yup.string().required("Required"),
  dest_branch: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
});

const PRCreate = () => {
  const [generalError, setGeneralError] = useState(null);
  let navigate = useNavigate();
  const mutation = useMutation((pr) => {
    fetch("http://localhost:8000/api/prs/", {
      method: "POST",
      body: JSON.stringify(pr),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          navigate("/prs");
        } else {
          return res.json().then((response) => {
            throw new Error(JSON.stringify(response));
          });
        }
      })
      .catch((error) => setGeneralError(error.message));
  });

  let branchOptions = [];
  const { data } = useQuery("getBranches", async () => {
    const data = await fetch(`http://localhost:8000/api/branches`).then((res) =>
      res.json()
    );
    return data;
  });
  if (data) {
    branchOptions = data.map((branch) => {
      return {
        label: branch.name,
        value: branch.name,
      };
    });
  }
  return (
    <VStack alignItems="center" justifyContent={"center"} p={2}>
      {generalError && (
        <Alert status="error">
          <AlertIcon />
          {generalError}
        </Alert>
      )}
      <Heading color={"orange.400"} as="h3" size="lg" mb={2}>
        Create PR
      </Heading>
      <HStack
        justifyContent="center"
        my={5}
        mx="auto"
        p={6}
        w="80%"
        maxWidth={"container.lg"}
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
      >
        <Formik
          initialValues={{
            title: "",
            description: "",
            author: "",
            status: STATUS_OPENED,
            org_branch: "",
            dest_branch: "",
          }}
          validationSchema={PRSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await mutation.mutate(values, setSubmitting);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            touched,
          }) => (
            <form style={{ width: "100%" }}>
              <FormControl isInvalid={touched.title && errors.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={touched.description && errors.description}
              >
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  id="description"
                  type="text"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={touched.author && errors.author}>
                <FormLabel htmlFor="author">Author</FormLabel>
                <Input
                  id="author"
                  type="text"
                  value={values.author}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.author}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={touched.org_branch && errors.org_branch}>
                <FormLabel htmlFor="org_branch">Origin Branch</FormLabel>
                <Select
                  id="org_branch"
                  placeholder="Select origin branch"
                  value={values.org_branch}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {branchOptions.map((el) => (
                    <option key={el.label} value={el.value}>
                      {el.label}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.org_branch}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={touched.dest_branch && errors.dest_branch}
              >
                <FormLabel htmlFor="dest_branch">Dest Branch</FormLabel>
                <Select
                  id="dest_branch"
                  placeholder="Select destination branch"
                  value={values.dest_branch}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {branchOptions.map((el) => (
                    <option key={el.label} value={el.value}>
                      {el.label}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.dest_branch}</FormErrorMessage>
              </FormControl>
              <Flex justifyContent={"flex-end"}>
                <Button
                  my={5}
                  mx={3}
                  type="button"
                  colorScheme="blue"
                  disabled={isSubmitting}
                  onClick={() => {
                    setFieldValue("status", STATUS_OPENED);
                    handleSubmit();
                  }}
                >
                  Create
                </Button>
                <Button
                  my={5}
                  mx={3}
                  mr={0}
                  type="button"
                  colorScheme="green"
                  disabled={isSubmitting}
                  onClick={() => {
                    setFieldValue("status", STATUS_MERGED);
                    handleSubmit();
                  }}
                >
                  Create and Merge
                </Button>
              </Flex>
            </form>
          )}
        </Formik>
      </HStack>
    </VStack>
  );
};

export default PRCreate;
