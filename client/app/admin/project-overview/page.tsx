"use client";

import { useState, useRef, useEffect } from "react";
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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import {
  EditIcon,
  ExternalLinkIcon,
  AttachmentIcon,
  CheckIcon,
  CloseIcon,
  AddIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProjectOverview = () => {
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
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const toast = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate start date and end date
    if (!startDate || !endDate) {
      console.error("Invalid date values");
      return;
    }

    setIsOpen(true);
  };

  const handleConfirmSubmit = () => {
    const formData = new FormData(formRef.current!);
    console.log("Project Disciplines (Engineering): ", selectedDisciplinesEng);
    console.log(
      "Project Disciplines (Design & Drafting): ",
      selectedDisciplinesDesDraft
    );
    const projectType = formData.get("projectType");
    console.log("Project Type:", projectType);
    const startDate = formData.get("startDate");
    console.log("Start Date:", startDate);
    const endDate = formData.get("endDate");
    console.log("End Date:", endDate);

    setIsEditable(false);
    setIsOpen(false);

    // Reset form fields
    formRef.current?.reset();
    setStartDate(null);
    setEndDate(null);
    setSelectedDisciplinesEng([]);
    setSelectedDisciplinesDesDraft([]);
  };

  const handleCancelSubmit = () => {
    setIsEditable(false);
    setIsOpen(false);

    // Reset form fields
    formRef.current?.reset();
    setStartDate(null);
    setEndDate(null);
    setSelectedDisciplinesEng([]);
    setSelectedDisciplinesDesDraft([]);
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  //---  FOR PROJECT COMMENTS ---//
  const [tableRows, setTableRows] = useState<
    {
      id: string;
      deliverable: string;
      percentComplete: number;
      date: Date | null;
      comments: string;
    }[]
  >([
    {
      id: "row-0",
      deliverable: "",
      percentComplete: 0,
      date: null,
      comments: "",
    },
  ]);

  // Fetch stored data from localStorage on component mount
  useEffect(() => {
    const storedRows = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("row-")) {
        const storedData = localStorage.getItem(key);
        if (storedData) {
          const row = JSON.parse(storedData);
          storedRows.push(row);
        }
      }
    }
    setTableRows(storedRows);
  }, []);

  // Define the TableRow type
  type TableRow = {
    deliverable: string;
    percentComplete: number;
    date: Date | null;
    comments: string;
  };

  const handleTableRowChange = (
    index: number,
    key: keyof TableRow,
    value: any
  ) => {
    const newTableRows = [...tableRows];
    if (key === "percentComplete" && value === "") {
      newTableRows[index][key] = value;
    } else {
      newTableRows[index] = {
        ...newTableRows[index],
        [key]: key === "percentComplete" ? Number(value) : value,
      };
    }
    setTableRows(newTableRows);
  };

  const handleAddRow = () => {
    setTableRows([
      ...tableRows,
      {
        id: `row-${Date.now()}`,
        deliverable: "",
        percentComplete: 0,
        date: null,
        comments: "",
      },
    ]);
  };

  const handleSaveClick = (row: TableRow) => {
    const rowId = `row-${Date.now()}`;
    const newRow = { id: rowId, ...row };
    localStorage.setItem(rowId, JSON.stringify(newRow));

    // Display the success notification
    toast({
      title: "Successfully saved!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteRow = (index: number) => {
    // Get the ID of the row to be deleted
    const rowId = tableRows[index].id;

    // Remove the row from local storage
    localStorage.removeItem(rowId);

    // Remove the row from the state
    const newTableRows = [...tableRows];
    newTableRows.splice(index, 1);
    setTableRows(newTableRows);

    // Update the stored data in local storage
    localStorage.clear();
    newTableRows.forEach((row) => {
      localStorage.setItem(row.id, JSON.stringify(row));
    });
  };

  return (
    <Flex>
      <Flex mt={20} direction="column" p={5}>
        <Flex justifyContent="space-between">
          <Box>
            <Heading size="lg">Project Information</Heading>
            {/* Display your project information here */}
          </Box>
          <Flex alignItems="center">
            {!isEditable ? (
              <Button
                leftIcon={<EditIcon />}
                colorScheme="teal"
                variant="outline"
                onClick={handleEditClick}
              >
                Edit
              </Button>
            ) : (
              <Flex>
                <HStack spacing={2}>
                  <Button
                    leftIcon={<CloseIcon />}
                    variant="outline"
                    onClick={handleCancelSubmit}
                    mr={1}
                  >
                    Cancel
                  </Button>
                  <Button
                    leftIcon={<CheckIcon />}
                    colorScheme="teal"
                    variant="solid"
                    type="submit"
                    form="projectForm"
                  >
                    Submit
                  </Button>
                </HStack>
              </Flex>
            )}
            <Button rightIcon={<ExternalLinkIcon />} colorScheme="teal" ml={3}>
              Share to Contractors
            </Button>
          </Flex>
        </Flex>

        <Divider my={4} />

        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <Box>
            <Text mb={2}>
              <strong>Project Name:</strong> {selectedProject.projectName}
            </Text>
            <Text mb={2}>
              <strong>Project Number:</strong> {selectedProject.projectNumber}
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
          <SimpleGrid columns={2} spacing={1}>
            <FormControl id="projectDisciplinesEng" mt={4}>
              <FormLabel>Project Disciplines (Engineering)</FormLabel>
              <CheckboxGroup
                colorScheme="green"
                value={selectedDisciplinesEng} // Update the value prop
                onChange={(values: string[]) =>
                  setSelectedDisciplinesEng(values)
                }
                isDisabled={!isEditable}
              >
                <HStack spacing={5}>
                  <VStack align="start" spacing={1}>
                    <Checkbox value="Mechanical">Mechanical</Checkbox>
                    <Checkbox value="Structural">Structural</Checkbox>
                    <Checkbox value="Instrumentation">Instrumentation</Checkbox>
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
                value={selectedDisciplinesDesDraft} // Update the value prop
                onChange={(values: string[]) =>
                  setSelectedDisciplinesDesDraft(values)
                }
                isDisabled={!isEditable}
              >
                <HStack spacing={5}>
                  <VStack align="start" spacing={1}>
                    <Checkbox value="Mechanical">Mechanical</Checkbox>
                    <Checkbox value="Structural">Structural</Checkbox>
                    <Checkbox value="Instrumentation">Instrumentation</Checkbox>
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
              <FormLabel>Proposed Start Date (Optional)</FormLabel>
              <DatePicker
                name="startDate"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                customInput={<Input isDisabled={!isEditable} />}
                placeholderText="Select Date"
                disabled={!isEditable}
                // Add minDate and maxDate props if needed
                // minDate={new Date()} // Example: restrict to current date and future dates
                // maxDate={someMaxDate} // Example: restrict to a maximum date
              />
            </FormControl>

            <FormControl id="endDate" mt={4}>
              <FormLabel>Proposed End Date (Optional)</FormLabel>
              <DatePicker
                name="endDate"
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                customInput={<Input isDisabled={!isEditable} />}
                placeholderText="Select Date"
                disabled={!isEditable}
                // Add minDate and maxDate props if needed
                // minDate={new Date()} // Example: restrict to current date and future dates
                // maxDate={someMaxDate} // Example: restrict to a maximum date
              />
            </FormControl>
          </Grid>

          <Divider my={4} />

          <Text fontSize="xl" fontWeight="bold" mb={3}>
            Project Comments
          </Text>

          <Flex>
            <IconButton
              icon={<AddIcon />}
              colorScheme="teal"
              variant="outline"
              aria-label="Add Row"
              onClick={handleAddRow}
              disabled={!isEditable}
              mt={3}
              mr={5}
            />
            {/* ... */}
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Deliverable</Th>
                  <Th>Percent Complete</Th>
                  <Th>Date</Th>
                  <Th>Comments</Th>
                  <Th>Save</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tableRows.map((row, index) => (
                  <Tr key={index}>
                    <Td>
                      <Input
                        value={row.deliverable}
                        onChange={(e) =>
                          handleTableRowChange(
                            index,
                            "deliverable",
                            e.target.value
                          )
                        }
                      />
                    </Td>
                    <Td>
                      <Select
                        value={row.percentComplete}
                        onChange={(e) => {
                          let inputValue = e.target.value;
                          let numValue =
                            inputValue === "null" ? null : Number(inputValue);
                          handleTableRowChange(
                            index,
                            "percentComplete",
                            numValue
                          );
                        }}
                      >
                        <option value="null">-</option>{" "}
                        {/* Added null option */}
                        <option value="10">10%</option>
                        <option value="20">20%</option>
                        <option value="30">30%</option>
                        <option value="40">40%</option>
                        <option value="50">50%</option>
                        <option value="60">60%</option>
                        <option value="70">70%</option>
                        <option value="80">80%</option>
                        <option value="90">90%</option>
                        <option value="100">100%</option>
                      </Select>
                    </Td>

                    <Td>
                      <DatePicker
                        selected={row.date ? new Date(row.date) : null}
                        onChange={(date: Date | null) =>
                          handleTableRowChange(
                            index,
                            "date",
                            date ? date.toISOString() : null
                          )
                        }
                        customInput={<Input isDisabled={!isEditable} />}
                        placeholderText="Select Date"
                        // isClearable
                      />
                    </Td>

                    <Td>
                      <Input
                        value={row.comments}
                        onChange={(e) =>
                          handleTableRowChange(
                            index,
                            "comments",
                            e.target.value
                          )
                        }
                      />
                    </Td>
                    <Td>
                      <IconButton
                        icon={<CheckIcon />}
                        colorScheme="teal"
                        // variant="outline"
                        aria-label="Save Row"
                        onClick={() => handleSaveClick(row)}
                        disabled={!isEditable}
                      />
                    </Td>
                    <Td>
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        variant="outline"
                        aria-label="Delete Row"
                        onClick={() => handleDeleteRow(index)}
                        disabled={!isEditable}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>

          <Divider my={4} />

          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="xl" fontWeight="bold">
              Attachments
            </Text>
            <Button rightIcon={<AttachmentIcon />} colorScheme="teal">
              Attach File
            </Button>
          </Flex>
        </form>

        <Divider my={4} />
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Submission
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure you want to submit?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCancelSubmit}>
                Cancel
              </Button>
              <Button colorScheme="teal" onClick={handleConfirmSubmit} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default ProjectOverview;
