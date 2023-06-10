"use client";

import { useState, useRef } from "react";
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
  Badge,
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
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Chakra from "@/app/components/Chakra";
import Navbar from "@/app/components/Navbar";
import Providers from "@/app/components/Providers";
import Sidebar from "@/app/components/Sidebar";
import Head from "next/head";
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
  coRate: number;
}

const contractorsData = [
  {
    id: 1,
    name: "Contractor 1",
    phone: "123-456-7890",
    email: "contractor1@example.com",
    discipline: "Civil",
    status: "ACCEPTED",
    date: "2023-06-01",
    rate: 20,
    estimate: 40,
    coRate: 30,
  },
  {
    id: 19,
    name: "Contractor 19",
    phone: "111-999-0000",
    email: "contractor19@example.com",
    discipline: "Facilities",
    status: "REJECTED",
    date: "2023-06-21",
    rate: 185,
    estimate: 200,
    coRate: 190,
  },
  {
    id: 20,
    name: "Contractor 20",
    phone: "222-000-1111",
    email: "contractor20@example.com",
    discipline: "Mechanical",
    status: "ACCEPTED",
    date: "2023-06-22",
    rate: 195,
    estimate: 210,
    coRate: 200,
  },
];

export default function Contractors() {
  const [contractors, setContractors] = useState<Contractor[]>(contractorsData);

  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(contractors.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "green";
      case "PENDING":
        return "blue";
      case "REJECTED":
        return "red";
      default:
        return "gray";
    }
  };

  const [deleteContractor, setDeleteContractor] = useState<Contractor | null>(
    null
  );
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const handleDelete = () => {
    const updatedContractors = contractors.filter(
      (contractor) => contractor !== deleteContractor
    );
    setContractors(updatedContractors);
    setDeleteContractor(null);
  };

  const [showNewContractorForm, setShowNewContractorForm] = useState(false);
  const [newContractor, setNewContractor] = useState<Contractor>({
    id: 0,
    name: "",
    phone: "",
    email: "",
    discipline: "",
    status: "PENDING",
    date: "",
    rate: 0,
    estimate: 0,
    coRate: 0,
  });

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
      date: "",
      rate: 0,
      estimate: 0,
      coRate: 0,
    });
    setShowNewContractorForm(false);
  };

  const [showEditContractorForm, setShowEditContractorForm] = useState(false);
  const [editingContractor, setEditingContractor] = useState<Contractor | null>(
    null
  );

  const handleEdit = (contractor: Contractor) => {
    const clonedContractor: Contractor = { ...contractor };
    setEditingContractor(clonedContractor);
    setShowEditContractorForm(true);
  };

  const handleEditContractorSubmit = (editedContractor: Contractor) => {
    const updatedContractors = contractors.map((contractor) =>
      contractor.id === editedContractor.id ? editedContractor : contractor
    );
    setContractors(updatedContractors);
    setEditingContractor(null);
    setShowEditContractorForm(false);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredContractors, setFilteredContractors] = useState<Contractor[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = contractors.filter((contractor) => {
      const isNameMatch = contractor.name.toLowerCase().includes(query.toLowerCase());
      const isDisciplineMatch = contractor.discipline.toLowerCase() === query.toLowerCase();
      const isStatusMatch = contractor.status.toLowerCase() === query.toLowerCase();

      return isNameMatch || isDisciplineMatch || isStatusMatch;
    });

    setFilteredContractors(filtered);
  };

  const visibleContractors = searchQuery !== "" ? filteredContractors : contractors.slice(startIndex, endIndex);

  const leastDestructiveRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Providers>
      <Chakra>
        <Head>
          <title>Contractors</title>
          <meta name="description" content="Contractors page" />
          {/* Add more metadata as needed */}
        </Head>
        <Navbar />
        <Flex>
          <Sidebar children={undefined} />
          <Flex mt={2} direction="column" p={5} w="full">
            <Flex justify="space-between" align="center" mb={10}>
              <Heading mt={20} size="lg">
                Contractors
              </Heading>
              <Flex>
                <Input
                  mt={20}
                  mr={2}
                  w="200px"
                  placeholder="Search by name, discipline, or status"
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
                  <Th>Name</Th>
                  <Th>Phone</Th>
                  <Th>Email</Th>
                  <Th>Discipline</Th>
                  <Th>Request Status</Th>
                  <Th>Request Date</Th>
                  <Th>Rate ($/hr)</Th>
                  <Th>Hours Estimate</Th>
                  <Th>Edit</Th>
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
                    <Td>
                      <Badge
                        colorScheme="white"
                        borderRadius="lg"
                        px={2}
                        py={1}
                        borderWidth={1}
                        borderColor={`${getStatusColor(contractor.status)}.500`}
                      >
                        {contractor.status}
                      </Badge>
                    </Td>
                    <Td>{contractor.date}</Td>
                    <Td>{contractor.rate}</Td>
                    <Td>{contractor.estimate}</Td>
                    <Td>
                      <IconButton
                        icon={<EditIcon />}
                        aria-label="Edit contractor"
                        colorScheme="blue"
                        onClick={() => handleEdit(contractor)}
                      />
                    </Td>
                    <Td>
                      <IconButton
                        icon={<DeleteIcon />}
                        aria-label="Delete contractor"
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
            {showEditContractorForm && editingContractor && (
              <AlertDialog
                isOpen={showEditContractorForm}
                onClose={() => setShowEditContractorForm(false)}
                leastDestructiveRef={leastDestructiveRef}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader>Edit Contractor</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                      <FormControl>
                        <FormLabel>Status</FormLabel>
                        <Select
                          placeholder="Select status"
                          value={editingContractor.status}
                          onChange={(e) =>
                            setEditingContractor((prevContractor) => {
                              if (prevContractor === null) {
                                return null;
                              } else {
                                return {
                                  ...prevContractor,
                                  status: e.target.value,
                                };
                              }
                            })
                          }
                        >
                          <option value="ACCEPTED">Accepted</option>
                          <option value="REJECTED">Rejected</option>
                        </Select>
                      </FormControl>
                      {/* Add the additional fields here */}
                      <FormControl mt={2}>
                        <FormLabel>Rate ($/hr)</FormLabel>
                        <Input
                          type="number"
                          placeholder="Enter rate"
                          value={editingContractor.rate}
                          onChange={(e) =>
                            setEditingContractor((prevContractor) => {
                              if (prevContractor === null) {
                                return null;
                              } else {
                                return {
                                  ...prevContractor,
                                  rate: parseFloat(e.target.value),
                                };
                              }
                            })
                          }
                        />
                      </FormControl>
                      <FormControl mt={2}>
                        <FormLabel>Estimated Hours</FormLabel>
                        <Input
                          type="number"
                          placeholder="Enter estimated hours"
                          value={editingContractor.estimate}
                          onChange={(e) =>
                            setEditingContractor((prevContractor) => {
                              if (prevContractor === null) {
                                return null;
                              } else {
                                return {
                                  ...prevContractor,
                                  estimate: parseInt(e.target.value),
                                };
                              }
                            })
                          }
                        />
                      </FormControl>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button onClick={() => setShowEditContractorForm(false)}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="blue"
                        onClick={() =>
                          handleEditContractorSubmit(editingContractor)
                        }
                        ml={3}
                      >
                        Submit
                      </Button>
                    </AlertDialogFooter>
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
                      <FormControl>
                        <FormLabel>Name</FormLabel>
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
                      <FormControl mt={2}>
                        <FormLabel>Phone</FormLabel>
                        <Input
                          placeholder="Enter phone"
                          value={newContractor.phone}
                          onChange={(e) =>
                            setNewContractor((prevContractor) => ({
                              ...prevContractor,
                              phone: e.target.value,
                            }))
                          }
                        />
                      </FormControl>
                      <FormControl mt={2}>
                        <FormLabel>Email</FormLabel>
                        <Input
                          placeholder="Enter email"
                          value={newContractor.email}
                          onChange={(e) =>
                            setNewContractor((prevContractor) => ({
                              ...prevContractor,
                              email: e.target.value,
                            }))
                          }
                        />
                      </FormControl>
                      <FormControl mt={2}>
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
                          <option value="Civil">Civil</option>
                          <option value="Mechanical">Mechanical</option>
                          <option value="Electrical">Electrical</option>
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
                      <FormControl mt={2}>
                        <FormLabel>Rate ($/hr)</FormLabel>
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
                      <FormControl mt={2}>
                        <FormLabel>Hours Estimate</FormLabel>
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
      </Chakra>
    </Providers>
  );
}
