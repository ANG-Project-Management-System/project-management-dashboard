"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import {
  AddIcon,
  DeleteIcon,
  DownloadIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import Pagination from "@/app/components/Pagination";

interface Contractor {
  id: number;
  name: string;
  phone: string;
  email: string;
  availability: string;
  discipline: string;
  hourlyRate: number;
  status: string;
  date: string;
  rate: number;
  estimate: number;
}

interface ContractorFromApi {
  "Team Members": string;
  Discipline: string;
  "Hours charged to date": number;
  "Billout Rate ($/hour)": number;
  "Total cost": number;
  Date: string;
  Email: string;
  "Phone Number": string;
}

const Contractors: React.FC = () => {
  const toast = useToast();
  const [showUploadTimesheets, setShowUploadTimesheets] = useState(false);

  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [deleteContractor, setDeleteContractor] = useState<Contractor | null>(
    null
  );
  const [showNewContractorForm, setShowNewContractorForm] = useState(false);
  const [newContractor, setNewContractor] = useState<Contractor>({
    id: 0,
    name: "",
    phone: "",
    availability: "",
    email: "",
    discipline: "",
    hourlyRate: 0,
    status: "PENDING",
    date: new Date().toISOString().slice(0, 10),
    rate: 0,
    estimate: 0,
  });

  const [files, setFiles] = useState<File[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

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

    // Rest of the form fields

    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }

    console.log("Project Files:", files);
    setShowUploadTimesheets(false);

    toast({
        title: "Timesheet Uploaded",
        description:
          "The timesheet has been successfully uploaded and is available for download.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  };

  const [selectedAvailability, setSelectedAvailability] = useState<string>("");
  const [showCustomDiscipline, setShowCustomDiscipline] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredContractors, setFilteredContractors] = useState<Contractor[]>(
    []
  );
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("");
  const [customHour, setCustomHour] = useState<number>(0);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = contractors.filter((contractor) => {
      const isNameMatch = contractor.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const isDisciplineMatch = contractor.discipline
        .toLowerCase()
        .startsWith(query.toLowerCase());
      const isStatusMatch =
        contractor.status.toLowerCase() === query.toLowerCase();

      return isNameMatch || isDisciplineMatch || isStatusMatch;
    });

    setFilteredContractors(filtered);
  };

  const visibleContractors =
    searchQuery !== ""
      ? filteredContractors
      : contractors.slice(startIndex, endIndex);

  const apiUrl = "http://localhost:3000/api/project?number=88-02032023-01";

  useEffect(() => {
    const cacheKey = "contractors";
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const expirationTime = 24 * 60 * 60 * 1000; // 24 hours
      const currentTime = new Date().getTime();

      if (currentTime - timestamp < expirationTime) {
        setContractors(data);
        return;
      }
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.contractors) {
          const contractorsFromApi = data.contractors.map(
            (contractor: ContractorFromApi, index: number) => ({
              id: index,
              name: contractor["Team Members"],
              discipline: contractor["Discipline"],
              phone: contractor["Phone Number"],
              email: contractor["Email"],
              status: "", // not available in JSON data
              date: contractor["Date"],
              rate: contractor["Billout Rate ($/hour)"],
              estimate: contractor["Hours charged to date"],
              coRate: contractor["Total cost"],
            })
          );

          setContractors(contractorsFromApi);
          localStorage.setItem(
            cacheKey,
            JSON.stringify({
              data: contractorsFromApi,
              timestamp: new Date().getTime(),
            })
          );
        } else {
          console.error("Invalid API response:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const handleDelete = () => {
    if (deleteContractor) {
      const updatedContractors = contractors.filter(
        (contractor) => contractor !== deleteContractor
      );
      setContractors(updatedContractors);
      setDeleteContractor(null);
    }
  };

  const handleNewContractorSubmit = () => {
    let chargeOutRate = 0;
    let contractorHourlyRate = newContractor.hourlyRate;

    if (selectedDiscipline && selectedDiscipline !== "Custom") {
      chargeOutRate =
        disciplineChargeOutRates[
          selectedDiscipline as keyof typeof disciplineChargeOutRates
        ] || 0;
    } else if (selectedDiscipline === "Custom") {
      chargeOutRate = parseFloat(newContractor.rate.toString());
      contractorHourlyRate = parseFloat(newContractor.hourlyRate.toString());
    }

    const newContractorWithId: Contractor = {
      ...newContractor,
      id: Math.floor(Math.random() * 900000) + 100000,
      rate: chargeOutRate,
      estimate: contractorHourlyRate,
      availability: selectedAvailability,
    };

    const updatedContractors = [...contractors, newContractorWithId];
    setContractors(updatedContractors);
    setNewContractor({
      id: 0,
      name: "",
      phone: "",
      email: "",
      availability: "",
      discipline: "",
      hourlyRate: 0,
      status: "PENDING",
      date: new Date().toISOString().slice(0, 10),
      rate: 0,
      estimate: 0,
    });
    setShowNewContractorForm(false);
    setSelectedDiscipline("");
    setCustomHour(0);
  };

  const disciplineChargeOutRates = {
    "Principal Engineer": 175.0,
    "Senior Stress Engineer": 135.0,
    "Senior Process Engineer": 135.0,
    "Senior *Engineer": 130.0,
    "Intermediate Engineer": 115.0,
    "Project Manager": 115.0,
    "Senior Designer / Checker": 120.0,
    "Intermediate Designer": 108.0,
    "Junior Designer": 90.0,
    Administrative: 68.0,
  };

  return (
    <Flex>
      <Flex mt={2} direction="column" p={5} w="full">
        <Flex justify="space-between" align="center" mb={10}>
          <Heading mt={20} size="lg">
            Master Contractors
          </Heading>
          <Flex>
            <Input
              mt={20}
              mr={8}
              w="270px"
              placeholder="Search by name or discipline"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Flex>
          <Button
            mt={20}
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={() => setShowNewContractorForm(true)}
          >
            New Contractor Request
          </Button>
        </Flex>
        <Table>
          <Thead>
            <Tr>
              <Th>Contractor Name</Th>
              <Th>Contractor Phone</Th>
              <Th>Contractor Email</Th>
              <Th>Contractor Availability</Th>
              <Th>Initial Request Date</Th>
              <Th>Specialty (Discipline)</Th>
              <Th>Contractor Hourly Rate ($/hr)</Th>
              <Th>Discipline Charge out Rate ($/hr)</Th>
              <Th>Upload Timesheets</Th>
              <Th>Download Timesheets</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {visibleContractors.map((contractor) => (
              <Tr key={contractor.id}>
                <Td>{contractor.name}</Td>
                <Td>{contractor.phone}</Td>
                <Td>{contractor.email}</Td>
                <Td>{contractor.availability}</Td>
                <Td>{contractor.date}</Td>
                <Td>{contractor.discipline}</Td>
                <Td>{contractor.hourlyRate}</Td>
                <Td>{contractor.rate}</Td>
                <Td>
                  <IconButton
                    icon={<AddIcon />}
                    aria-label="Upload Timesheets"
                    variant="outline"
                    colorScheme="green"
                    onClick={() => setShowUploadTimesheets(true)}
                  />
                </Td>
                <Td>
                  <IconButton
                    icon={<DownloadIcon />}
                    aria-label="Download Timesheets"
                    variant="outline"
                    colorScheme="blue"
                    onClick={() => setDeleteContractor(contractor)}
                  />
                </Td>
                <Td>
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Delete contractor"
                    variant="outline"
                    colorScheme="red"
                    onClick={() => setDeleteContractor(contractor)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(contractors.length / itemsPerPage)}
          onPageChange={setPage}
        />

        <AlertDialog
          isOpen={Boolean(deleteContractor)}
          leastDestructiveRef={cancelRef}
          onClose={() => setDeleteContractor(null)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Contractor
              </AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                Are you sure? This action cannot be undone.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  ref={cancelRef}
                  onClick={() => setDeleteContractor(null)}
                >
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        {showUploadTimesheets && (
          <AlertDialog
            isOpen={showUploadTimesheets}
            leastDestructiveRef={cancelRef}
            onClose={() => setShowUploadTimesheets(false)}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Upload Timesheets
                </AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  <form ref={formRef} onSubmit={handleSubmit}>
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
                        accept=".xls,.xlsx,.xlsm,.csv,.docx,.pdf,.ppt,"
                        multiple
                        onChange={handleFileChange}
                        opacity={0}
                        position="absolute"
                        zIndex="-1"
                      />

                      {renderUploadedFiles()}
                    </FormControl>
                    <Flex 
                        justifyContent="flex-end"
                        marginRight={-4}
                        mt={10}
                        p={2}
                    >
                      <Button
                        ref={cancelRef}
                        onClick={() => setShowUploadTimesheets(false)}
                        marginRight={3}
                      >
                        Cancel
                      </Button>
                      <Button 
                        colorScheme="blue" 
                        type="submit"
                    >
                        Submit
                      </Button>
                    </Flex>
                  </form>
                </AlertDialogBody>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )}

        {showNewContractorForm && (
          <AlertDialog
            isOpen={showNewContractorForm}
            leastDestructiveRef={cancelRef}
            onClose={() => setShowNewContractorForm(false)}
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                New Contractor Request
              </AlertDialogHeader>
              <AlertDialogCloseButton />

              <form onSubmit={handleNewContractorSubmit}>
                <AlertDialogBody>
                  <FormControl isRequired>
                    <FormLabel>Contractor Name</FormLabel>
                    <Input
                      placeholder="Enter name"
                      value={newContractor.name}
                      onChange={(e) =>
                        setNewContractor((prevContractor) => ({
                          ...prevContractor,
                          name: e.target.value,
                        }))
                      }
                    />
                  </FormControl>
                  <FormControl mt={2} isRequired>
                    <FormLabel>Contractor Phone</FormLabel>
                    <Input
                      isRequired
                      placeholder="Ex. 403-123-4567"
                      value={newContractor.phone}
                      onChange={(e) =>
                        setNewContractor((prevContractor) => ({
                          ...prevContractor,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </FormControl>
                  <FormControl mt={2} isRequired>
                    <FormLabel>Contractor Email</FormLabel>
                    <Input
                      placeholder="Example@gmail.com"
                      value={newContractor.email}
                      onChange={(e) =>
                        setNewContractor((prevContractor) => ({
                          ...prevContractor,
                          email: e.target.value,
                        }))
                      }
                    />
                  </FormControl>

                  <FormControl mt={2} isRequired>
                    <FormLabel>Contractor Availability</FormLabel>
                    <Select
                      isRequired
                      placeholder="Select Availability"
                      value={selectedAvailability}
                      onChange={(e) => setSelectedAvailability(e.target.value)}
                    >
                      <option value="Full time - anytime">
                        Full time - anytime
                      </option>
                      <option value="Weekends only">Weekends only</option>
                      <option value="Evenings only">Evenings only</option>
                      <option value="9 to 5, Monday through Friday">
                        9 to 5, Monday through Friday
                      </option>
                    </Select>
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Discipline</FormLabel>
                    <Select
                      isRequired
                      placeholder="Select discipline"
                      value={selectedDiscipline}
                      onChange={(e) => {
                        const selectedDiscipline = e.target.value;

                        if (selectedDiscipline === "Custom") {
                          setShowCustomDiscipline(true);
                        } else {
                          setShowCustomDiscipline(false);
                        }

                        setSelectedDiscipline(selectedDiscipline);
                        setNewContractor((prevContractor) => ({
                          ...prevContractor,
                          discipline: selectedDiscipline,
                          rate:
                            disciplineChargeOutRates[
                              selectedDiscipline as keyof typeof disciplineChargeOutRates
                            ] || 0,
                        }));
                      }}
                    >
                      <option value="Principal Engineer">
                        Principal Engineer
                      </option>
                      <option value="Senior Stress Engineer">
                        Senior Stress Engineer
                      </option>
                      <option value="Senior Process Engineer">
                        Senior Process Engineer
                      </option>
                      <option value="Senior *Engineer">Senior *Engineer</option>
                      <option value="Intermediate Engineer">
                        Intermediate Engineer
                      </option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Senior Designer / Checker">
                        Senior Designer / Checker
                      </option>
                      <option value="Intermediate Designer">
                        Intermediate Designer
                      </option>
                      <option value="Junior Designer">Junior Designer</option>
                      <option value="Administrative">Administrative</option>
                      <option value="Custom">Custom</option>
                    </Select>

                    {showCustomDiscipline && (
                      <FormControl mt={2} isRequired>
                        <FormLabel>Custom Discipline</FormLabel>
                        <Input
                          placeholder="Enter custom discipline"
                          value={newContractor.discipline}
                          onChange={(e) =>
                            setNewContractor((prevContractor) => ({
                              ...prevContractor,
                              discipline: e.target.value,
                            }))
                          }
                        />
                      </FormControl>
                    )}
                  </FormControl>
                  <FormControl mt={2}>
                    <FormLabel>Initial Request Date</FormLabel>
                    <Input
                      placeholder="Enter date (YYYY-MM-DD)"
                      value={newContractor.date}
                      onChange={(e) =>
                        setNewContractor((prevContractor) => ({
                          ...prevContractor,
                          date: e.target.value,
                        }))
                      }
                    />
                  </FormControl>

                  <FormControl mt={2} isRequired>
                    <FormLabel>Discipline Charge Out Rate ($/hr)</FormLabel>
                    <Input
                      type="number"
                      placeholder="Enter rate"
                      value={newContractor.rate}
                      onChange={(e) =>
                        setNewContractor((prevContractor) => ({
                          ...prevContractor,
                          rate: parseFloat(e.target.value),
                        }))
                      }
                    />
                  </FormControl>
                  <FormControl mt={2} isRequired>
                    <FormLabel>Contractor Hourly Rate ($/hr)</FormLabel>
                    <Input
                      type="number"
                      value={newContractor.hourlyRate}
                      onChange={(e) =>
                        setNewContractor((prevContractor) => ({
                          ...prevContractor,
                          hourlyRate: parseFloat(e.target.value),
                        }))
                      }
                    />
                  </FormControl>
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button
                    ref={cancelRef}
                    onClick={() => setShowNewContractorForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" colorScheme="blue" ml={3}>
                    Submit
                  </Button>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </Flex>
    </Flex>
  );
};

export default Contractors;
