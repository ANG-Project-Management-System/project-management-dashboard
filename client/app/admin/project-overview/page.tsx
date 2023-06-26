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
  Textarea,
  Progress,
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

  // notification
  const toast = useToast();

  // attachments
  const [attachments, setAttachments] = useState<
    {
      fileName: string;
      fileSize: number;
      attachmentDate: Date;
    }[]
  >([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // // Validate start date and end date
    // if (!startDate || !endDate) {
    //   console.error("Invalid date values");
    //   return;
    // }

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
    const currentDate = new Date();

    setTableRows((prevRows) => [
      ...prevRows,
      {
        id: `row-${Date.now()}`,
        deliverable: "",
        percentComplete: 0,
        date: currentDate,
        comments: "",
      },
    ]);
  };

  const handleSaveClick = (row: TableRow) => {
    const rowId = `row-${Date.now()}`;
    const newRow = { id: rowId, ...row };

    // Check if the row already exists in local storage
    const existingRowIndex = tableRows.findIndex(
      (item) => item.deliverable === row.deliverable
    );

    if (existingRowIndex !== -1) {
      // Update the existing row with the new values
      const updatedRows = [...tableRows];
      updatedRows[existingRowIndex] = newRow;

      // Update the state with the updated rows
      setTableRows(updatedRows);

      // Update the row in local storage
      localStorage.setItem(
        tableRows[existingRowIndex].id,
        JSON.stringify(newRow)
      );
    } else {
      // Add the new row to the state
      setTableRows((prevRows) => [...prevRows, newRow]);

      // Store the new row in local storage
      localStorage.setItem(rowId, JSON.stringify(newRow));
    }

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileSizeMB = Math.round((file.size / (1024 * 1024)) * 100) / 100; // Convert file size to megabytes
      const newAttachment = {
        fileName: file.name,
        fileSize: fileSizeMB,
        attachmentDate: new Date(),
      };
      setAttachments((prevAttachments) => [...prevAttachments, newAttachment]);
    }
  };

  const handleDeleteAttachment = (index: number) => {
    setAttachments((prevAttachments) => {
      const newAttachments = [...prevAttachments];
      newAttachments.splice(index, 1);
      return newAttachments;
    });
  };

  const [totalCosts, setTotalCosts] = useState<number[]>([]);
  const [totalApprovedBudget, setTotalApprovedBudget] = useState<number>(0);

  useEffect(() => {
    const apiUrl = "http://localhost:3000/api/project?number=88-02032023-01";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.contractors) {
          const totalCosts = data.contractors.map(
            (contractor: any) => contractor["Total cost"]
          );
          const totalApprovedBudget = data.project["Total Approved Budget:"];

          setTotalCosts(totalCosts);
          setTotalApprovedBudget(totalApprovedBudget);
          console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [totalCostsSum, setTotalCostsSum] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  useEffect(() => {
    const totalCostsSum = totalCosts.reduce(
      (accumulator, currentCost) => accumulator + currentCost,
      0
    );
    setTotalCostsSum(totalCostsSum);

    // Add condition to avoid division by zero
    if (totalApprovedBudget > 0) {
      const progressPercentage = (totalCostsSum / totalApprovedBudget) * 100;
      setProgressPercentage(progressPercentage); // Update the state variable
    }
  }, [totalCosts, totalApprovedBudget]);

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
            <Text>
              <strong>Project Disciplines (Engineering):</strong>{" "}
              {selectedProject.description}
            </Text>
            <Text>
              <strong>Project Disciplines (Design & Drafting):</strong>{" "}
              {selectedProject.description}
            </Text>
            <Text>
              <strong>Project Type:</strong> {selectedProject.description}
            </Text>
            <br />
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Client Information
            </Text>
            <Text>
              <strong>Client Name:</strong> {selectedProject.description}
            </Text>
            <Text>
              <strong>Client Email:</strong> {selectedProject.description}
            </Text>
            <Text>
              <strong>Client Phone Number:</strong>{" "}
              {selectedProject.description}
            </Text>
            <Text>
              <strong>Client Company:</strong> {selectedProject.description}
            </Text>
            <Text>
              <strong>Client Address:</strong> {selectedProject.description}
            </Text>
          </Box>
          <Box>{/* Your dropdowns and checkboxes go here */}</Box>
        </Grid>

        <Divider my={4} />

        <Text fontSize="xl" fontWeight="bold">
          Project Form for Change Order
        </Text>

        <form id="projectForm" ref={formRef} onSubmit={handleSubmit}>
          <SimpleGrid columns={3} spacing={10}>
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

          <Box maxW="300px">
            <FormControl id="projectType" mt={4}>
              <FormLabel>Project Type</FormLabel>
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
          </Box>

          <SimpleGrid columns={3} spacing={10}>
            <Box maxW="300px">
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
            </Box>

            <Box maxW="300px">
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
            </Box>
          </SimpleGrid>

          <Divider my={4} />

          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Budgeted Hours
          </Text>

          <Text fontSize="xl">
            Total Approved Budget: ${totalApprovedBudget}
          </Text>

          <Text fontSize="xl">
            Total Cost Used: ${totalCostsSum}
          </Text>

          <Text fontSize="xl" mt={4} mb={2}>
            {/* Display the percentage here */}
            Budget Hours Used: <strong>{progressPercentage.toFixed(2)}%</strong>
          </Text>

          <Box width="45%">
            <Progress
              colorScheme="teal"
              size="md"
              value={progressPercentage}
              hasStripe
            />
          </Box>

          <Divider my={5} />

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
                        mb={12}
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
                        mb={12}
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
                        <option value="10">5%</option>
                        <option value="20">10%</option>
                        <option value="30">15%</option>
                        <option value="40">20%</option>
                        <option value="50">25%</option>
                        <option value="60">30%</option>
                        <option value="70">35%</option>
                        <option value="80">40%</option>
                        <option value="90">45%</option>
                        <option value="100">50%</option>
                        <option value="10">55%</option>
                        <option value="20">60%</option>
                        <option value="30">65%</option>
                        <option value="40">70%</option>
                        <option value="50">75%</option>
                        <option value="60">80%</option>
                        <option value="70">85%</option>
                        <option value="80">90%</option>
                        <option value="90">95%</option>
                        <option value="100">100%</option>
                      </Select>
                    </Td>

                    <Td>
                      <Flex mb={12}>
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
                      </Flex>
                    </Td>

                    <Td>
                      <Textarea
                        mt={2}
                        value={row.comments}
                        size="md" // Adjust the size to your preference
                        height="100px" // Set the desired height for the textarea
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

            <Button
              as="label"
              htmlFor="fileUpload"
              leftIcon={<AttachmentIcon />}
              cursor="pointer"
              colorScheme="teal"
              mt={2}
            >
              Attach File
            </Button>
            <Input
              id="fileUpload"
              type="file"
              accept=".xls,.xlsx,.xlsm,.csv,.docx,.pdf,.ppt,"
              multiple
              onChange={handleFileUpload}
              opacity={0}
              position="absolute"
              zIndex="-1"
            />
          </Flex>

          <Table variant="simple" mt={5}>
            <Thead>
              <Tr>
                <Th>File Name</Th>
                <Th>Attachment Size</Th>
                <Th>Attachment Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {attachments.map((attachment, index) => (
                <Tr key={index}>
                  <Td>
                    <a
                    // href="#" // Replace with the actual file URL
                    // download={attachment.fileName}
                    // style={{ color: "blue", textDecoration: "underline" }}
                    >
                      {attachment.fileName}
                    </a>
                  </Td>
                  <Td>{attachment.fileSize} MB</Td>
                  <Td>{attachment.attachmentDate.toDateString()}</Td>
                  <Td>
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      variant="outline"
                      aria-label="Delete Attachment"
                      onClick={() => handleDeleteAttachment(index)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </form>
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
