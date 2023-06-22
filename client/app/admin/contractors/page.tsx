"use client";

import { useState, useEffect, useRef } from "react";
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
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import Pagination from "@/app/components/Pagination";

interface Contractor {
  id: number;
  name: string;
  phone: string;
  email: string;
  discipline: string;
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

export default function Contractors() {
  const [contractors, setContractors] = useState<Contractor[]>([]);

  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(contractors.length / itemsPerPage);

  const [deleteContractor, setDeleteContractor] = useState<Contractor | null>(
    null
  );

  const [showNewContractorForm, setShowNewContractorForm] = useState(false);
  const [newContractor, setNewContractor] = useState<Contractor>({
    id: 0,
    name: "",
    phone: "",
    email: "",
    discipline: "",
    status: "PENDING",
    date: new Date().toISOString().slice(0, 10), // Set initial value to today's date
    rate: 0,
    estimate: 0,
  });

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredContractors, setFilteredContractors] = useState<Contractor[]>(
    []
  );

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
    const newContractorWithId: Contractor = {
      ...newContractor,
      id: Math.floor(Math.random() * 900000) + 100000, // generate a random 6-digit ID
    };

    const updatedContractors = [...contractors, newContractorWithId];
    setContractors(updatedContractors);
    setNewContractor({
      id: 0,
      name: "",
      phone: "",
      email: "",
      discipline: "",
      status: "PENDING",
      date: new Date().toISOString().slice(0, 10), // Set initial value to today's date
      rate: 0,
      estimate: 0,
    });
    setShowNewContractorForm(false);
  };

  return (
    <Flex>
      <Flex mt={2} direction="column" p={5} w="full">
        <Flex justify="space-between" align="center" mb={10}>
          <Heading mt={20} size="lg">
            Contractors
          </Heading>
          <Flex>
            <Input
              mt={20}
              mr={2}
              w="320px"
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
              <Th>Discipline</Th>
              <Th>Initial Request Date</Th>
              <Th>Contractor Rate ($/hr)</Th>
              <Th>Contractor Hours Estimate</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {visibleContractors.map((contractor) => (
              <Tr key={contractor.id}>
                <Td>{contractor.name}</Td>
                <Td>{contractor.phone}</Td>
                <Td>{contractor.email}</Td>
                <Td>{contractor.discipline}</Td>
                <Td>{contractor.date}</Td>
                <Td>{contractor.rate}</Td>
                <Td>{contractor.estimate}</Td>
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
          totalPages={totalPages}
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
                    <FormLabel>Discipline</FormLabel>
                    <Select
                      placeholder="Select discipline"
                      value={newContractor.discipline}
                      onChange={(e) =>
                        setNewContractor((prevContractor) => ({
                          ...prevContractor,
                          discipline: e.target.value,
                        }))
                      }
                    >
                      <option value="Civil Eng">Civil Eng</option>
                      <option value="Mechanical Eng">Mechanical Eng</option>
                      <option value="Electrical Eng">Electrical Eng</option>
                      <option value="Process Eng">Process Eng</option>
                      <option value="Mechanical DesDraft">
                        Mechanical Design & Drafting
                      </option>
                    </Select>
                  </FormControl>
                  <FormControl mt={2}>
                    <FormLabel>Request Date</FormLabel>
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
                    <FormLabel>Contractor Rate ($/hr)</FormLabel>
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
                    <FormLabel>Contractor Hours Estimate</FormLabel>
                    <Input
                      type="number"
                      placeholder="Enter estimate"
                      value={newContractor.estimate}
                      onChange={(e) =>
                        setNewContractor((prevContractor) => ({
                          ...prevContractor,
                          estimate: parseFloat(e.target.value),
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
}
