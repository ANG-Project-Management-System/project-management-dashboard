"use client";

import { useState, useRef } from "react";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  CheckboxGroup,
  Checkbox,
  Button,
  Select,
  VStack,
  HStack,
  Text,
  Grid,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chakra from "@/app/components/Chakra";
import Providers from "@/app/components/Providers";
import Navbar from "@/app/components/Navbar";

const RequestForQuotation = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFiles = Array.from(fileList);
      setFiles([...files, ...selectedFiles]);
    }
  };

  const handleRemoveFile = (index: any) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const renderUploadedFiles = () => {
    if (files.length === 0) {
      return null;
    }

    return (
      <VStack align="start" mt={2}>
        <Text>Uploaded Files:</Text>
        {files.map((file, index) => (
          <Flex key={index} align="flex">
            <Text>{file.name}</Text>
            <Button
              size="sm"
              colorScheme="white"
              onClick={() => handleRemoveFile(index)}
              textColor="black"
              _hover={{ backgroundColor: "gray.200" }}
            >
              X
            </Button>
          </Flex>
        ))}
      </VStack>
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);

    // Log input field values
    const clientName = formData.get("clientName");
    console.log("Client Name:", clientName);

    const clientEmail = formData.get("clientEmail");
    console.log("Client Email:", clientEmail);

    const clientPhone = formData.get("clientPhone");
    console.log("Client Phone Number:", clientPhone);

    const clientCompany = formData.get("clientCompany");
    console.log("Client Company:", clientCompany);

    const clientAddress = formData.get("clientAddress");
    console.log("Client Address:", clientAddress);

    const projectName = formData.get("projectName");
    console.log("Project Name:", projectName);

    const projectDescription = formData.get("projectDescription");
    console.log("Project Description:", projectDescription);

    const startDate = formData.get("startDate");
    console.log("Start Date:", startDate);

    const endDate = formData.get("endDate");
    console.log("End Date:", endDate);

    const projectType = formData.get("projectType");
    console.log("Project Type:", projectType);

    // Rest of the form fields

    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }

    console.log("Project Disciplines: ", selectedDisciplines);

    console.log("Project Files:", files);

    // Perform form submission or other actions
    // ...
  };

  return (
    <Chakra>
      <Providers>
        <Navbar />
        <Flex direction="column" align="center" justify="center" minH="80vh">
          <Heading mt={40} mb={8}>
            Engineering Project RFQ
          </Heading>

          <Box
            shadow="md"
            borderWidth="1px"
            p={8}
            w="full"
            maxW="1000px"
            mb={10}
          >
            <form ref={formRef} onSubmit={handleSubmit}>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={8}
              >
                <Box>
                  <FormControl id="clientName" isRequired>
                    <FormLabel>Client Name</FormLabel>
                    <Input name="clientName" placeholder="Client Name" />
                  </FormControl>

                  <FormControl id="clientEmail" mt={4} isRequired>
                    <FormLabel>Client Email</FormLabel>
                    <Input
                      name="clientEmail"
                      placeholder="example@gmail.com"
                      type="email"
                    />
                  </FormControl>

                  <FormControl id="clientPhone" mt={4} isRequired>
                    <FormLabel>Client Phone Number</FormLabel>
                    <NumberInput>
                      <NumberInputField
                        name="clientPhone"
                        placeholder="+1 403 999 9999"
                      />
                    </NumberInput>
                  </FormControl>

                  <FormControl id="clientCompany" mt={4} isRequired>
                    <FormLabel>Client Company</FormLabel>
                    <Input name="clientCompany" placeholder="Example Inc." />
                  </FormControl>

                  <FormControl id="clientAddress" mt={4} isRequired>
                    <FormLabel>Client Address</FormLabel>
                    <Input
                      name="clientAddress"
                      placeholder="20 Example Way NW, Calgary, AB, Canada"
                    />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl id="projectName" isRequired>
                    <FormLabel>Project Name</FormLabel>
                    <Input name="projectName" placeholder="Project Name" />
                  </FormControl>

                  <FormControl id="projectDescription" mt={4} isRequired>
                    <FormLabel>Project Description</FormLabel>
                    <Textarea
                      name="projectDescription"
                      placeholder="Max 1000 characters"
                      maxLength={1000}
                    />
                  </FormControl>

                  <FormControl id="startDate" mt={4}>
                    <FormLabel>Proposed Start Date</FormLabel>
                    <DatePicker
                      name="startDate"
                      selected={startDate}
                      onChange={(date: Date) => setStartDate(date)}
                      customInput={<Input />}
                      placeholderText="Select Date"
                    />
                  </FormControl>

                  <FormControl id="endDate" mt={4}>
                    <FormLabel>Proposed End Date</FormLabel>
                    <DatePicker
                      name="endDate"
                      selected={endDate}
                      onChange={(date: Date) => setEndDate(date)}
                      customInput={<Input />}
                      placeholderText="Select Date"
                    />
                  </FormControl>

                  <FormControl id="projectAttachments" mt={4}>
                    <FormLabel>Project Attachments</FormLabel>
                    <Button
                      as="label"
                      htmlFor="fileUpload"
                      leftIcon={<SettingsIcon />}
                      cursor="pointer"
                    >
                      Click to Upload
                    </Button>
                    <Input
                      id="fileUpload"
                      type="file"
                      accept="*"
                      multiple
                      onChange={handleFileChange}
                      opacity={0}
                      position="absolute"
                      zIndex="-1"
                    />
                    {renderUploadedFiles()}
                  </FormControl>

                  <FormControl id="projectDisciplines" mt={4}>
                    <FormLabel>Project Disciplines</FormLabel>
                    <CheckboxGroup
                      colorScheme="green"
                      defaultValue={[]}
                      onChange={(values: string[]) =>
                        setSelectedDisciplines(values)
                      }
                    >
                      <HStack spacing={5}>
                        <VStack align="start" spacing={1}>
                          <Checkbox value="Mechanical">Mechanical</Checkbox>
                          <Checkbox value="Structural">Structural</Checkbox>
                          <Checkbox value="Instrumentation">
                            Instrumentation
                          </Checkbox>
                        </VStack>
                        <VStack align="start" spacing={1}>
                          <Checkbox value="Civil">Civil</Checkbox>
                          <Checkbox value="Electrical">Electrical</Checkbox>
                          <Checkbox value="Pipeline">Pipeline</Checkbox>
                        </VStack>
                        <VStack align="start" spacing={1}>
                          <Checkbox value="Process">Process</Checkbox>
                          <Checkbox value="Stress">Stress</Checkbox>
                          <Checkbox value="Facilities">Facilities</Checkbox>
                        </VStack>
                      </HStack>
                    </CheckboxGroup>
                  </FormControl>

                  <FormControl id="projectType" mt={4}>
                    <FormLabel>Project Type (Optional)</FormLabel>
                    <Select name="projectType" placeholder="Select Type">
                      <option value="type1">Type 1</option>
                      <option value="type2">Type 2</option>
                      <option value="type3">Type 3</option>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Button colorScheme="blue" type="submit" mt={8} marginLeft={850}>
                Submit
              </Button>
            </form>
          </Box>
        </Flex>
      </Providers>
    </Chakra>
  );
};

export default RequestForQuotation;
