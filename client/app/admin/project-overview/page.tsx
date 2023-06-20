"use client";

import Chakra from "@/app/components/Chakra";
import Providers from "@/app/components/Providers";
import {
  Flex,
  Box,
  Button,
  Text,
  Divider,
  FormControl,
  FormLabel,
  CheckboxGroup,
  HStack,
  VStack,
  Checkbox,
  Select,
  Grid,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  EditIcon,
  ExternalLinkIcon,
  AttachmentIcon,
  CheckIcon,
} from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState } from "react";

const projectOverview = () => {
  const selectedProject = {
    projectName: "Project One",
    projectNumber: "001",
    lastUpdated: "2023-06-19 11:00",
    status: "Active",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDisciplinesEng, setSelectedDisciplinesEng] = useState<
    string[]
  >([]);
  const [
    selectedDisciplinesDesDraft,
    setSelectedDisciplinesDesDraft,
  ] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [isEditable, setIsEditable] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);
    console.log("Project Disciplines (Engineering): ", selectedDisciplinesEng);
    console.log("Project Disciplines (Design & Drafting): ", selectedDisciplinesDesDraft);
    const projectType = formData.get("projectType");
    console.log("Project Type:", projectType);
    const startDate = formData.get("startDate");
    console.log("Start Date:", startDate);
    const endDate = formData.get("endDate");
    console.log("End Date:", endDate);

    setIsEditable(false);
  };

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsEditable(true);
  };

  return (
    <Flex>
      <Providers>
        <Chakra>
          <Flex mt={20} direction="column" p={5}>
            <Flex justifyContent="space-between">
              <Box>
                <Text fontSize="xl" fontWeight="bold">
                  Project Information
                </Text>
                <Text>{/* Display your project information here */}</Text>
              </Box>
              <Box>
              {!isEditable ?
                  <Button
                    leftIcon={<EditIcon />}
                    colorScheme="teal"
                    variant="outline"
                    mr={3}
                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                  :
                  <Button
                    leftIcon={<CheckIcon />}
                    colorScheme="teal"
                    variant="solid"
                    mr={3}
                    type="submit"
                    form="projectForm"
                  >
                    Submit
                  </Button>
                }

                <Button rightIcon={<ExternalLinkIcon />} colorScheme="teal">
                  Share to Contractors
                </Button>
              </Box>
            </Flex>

            <Divider my={4} />

            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Box>
                <Text mb={2}>
                  <strong>Project Name:</strong> {selectedProject.projectName}
                </Text>
                <Text mb={2}>
                  <strong>Project Number:</strong>{" "}
                  {selectedProject.projectNumber}
                </Text>
                <Text>
                  <strong>Project Description:</strong>{" "}
                  {selectedProject.description}
                </Text>
              </Box>
              <Box>{/* Your dropdowns and checkboxes go here */}</Box>
            </Grid>

            <Divider my={4} />

            <Text fontSize="xl" fontWeight="bold">
              Project Form
            </Text>

            <form id="projectForm" ref={formRef} onSubmit={handleSubmit}>
              <SimpleGrid columns={2} spacing={1} my={1}>
                <FormControl id="projectDisciplinesEng" mt={4}>
                  <FormLabel>Project Disciplines (Engineering)</FormLabel>
                  <CheckboxGroup
                    colorScheme="green"
                    defaultValue={[]}
                    onChange={(values: string[]) =>
                      setSelectedDisciplinesEng(values)
                    }
                    isDisabled={!isEditable}
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

                <FormControl id="projectDisciplinesDesDraft" mt={4}>
                  <FormLabel>Project Disciplines (Design & Drafting)</FormLabel>
                  <CheckboxGroup
                    colorScheme="green"
                    defaultValue={[]}
                    onChange={(values: string[]) =>
                      setSelectedDisciplinesDesDraft(values)
                    }
                    isDisabled={!isEditable}
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
              </SimpleGrid>

              <FormControl id="projectType" mt={4}>
                <FormLabel>Project Type (Optional)</FormLabel>
                <Select
                  name="projectType"
                  placeholder="Select Type"
                  isDisabled={!isEditable}
                >
                  <option value="Pre-Feed">Pre-Feed</option>
                  <option value="Feed">Feed</option>
                  <option value="Detailed Design">Detailed Design</option>
                  <option value="Technical Review">Technical Review</option>
                  <option value="Etc.">Etc.</option>
                </Select>
              </FormControl>

              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <FormControl id="startDate" mt={4}>
                  <FormLabel>Proposed Start Date</FormLabel>
                  <DatePicker
                    name="startDate"
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    customInput={<Input isDisabled={!isEditable} />}
                    placeholderText="Select Date"
                    disabled={!isEditable}
                  />
                </FormControl>

                <FormControl id="endDate" mt={4}>
                  <FormLabel>Proposed End Date</FormLabel>
                  <DatePicker
                    name="endDate"
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    customInput={<Input isDisabled={!isEditable} />}
                    placeholderText="Select Date"
                    disabled={!isEditable}
                  />
                </FormControl>
              </Grid>
            </form>

            <Divider my={4} />

            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                Attachments
              </Text>
              <Button rightIcon={<AttachmentIcon />} colorScheme="teal">
                Attach File
              </Button>
            </Flex>

            {/* Your table goes here */}
          </Flex>
        </Chakra>
      </Providers>
    </Flex>
  );
};

export default projectOverview;
