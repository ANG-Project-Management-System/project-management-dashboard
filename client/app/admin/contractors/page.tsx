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
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import Chakra from "@/app/components/Chakra";
import Navbar from "@/app/components/Navbar";
import Providers from "@/app/components/Providers";
import Sidebar from "@/app/components/Sidebar";
import Head from "next/head";

export default function Contractors() {
  const [contractors, setContractors] = useState([
    {
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
      name: "Contractor 2",
      phone: "098-765-4321",
      email: "contractor2@example.com",
      discipline: "Mechanical",
      status: "PENDING",
      date: "2023-06-05",
      rate: 25,
      estimate: 35,
      coRate: 25,
    },
    {
      name: "Contractor 3",
      phone: "321-654-0987",
      email: "contractor3@example.com",
      discipline: "Electrical",
      status: "REJECTED",
      date: "2023-06-06",
      rate: 30,
      estimate: 30,
      coRate: 20,
    },
  ]);

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

  const [deleteContractor, setDeleteContractor] = useState<{
    name: string;
    phone: string;
    email: string;
    discipline: string;
    status: string;
    date: string;
    rate: number;
    estimate: number;
    coRate: number;
  } | null>(null);
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const handleDelete = () => {
    const updatedContractors = contractors.filter(
      (contractor) => contractor !== deleteContractor
    );
    setContractors(updatedContractors);
    setDeleteContractor(null);
  };

  const [showNewContractorForm, setShowNewContractorForm] = useState(false);
  const [newContractor, setNewContractor] = useState({
    name: "",
    phone: "",
    email: "",
    discipline: "",
    status: "",
    date: "",
    rate: 0,
    estimate: 0,
    coRate: 0,
  });

  const handleNewContractorSubmit = () => {
    const updatedContractors = [...contractors, newContractor];
    setContractors(updatedContractors);
    setNewContractor({
      name: "",
      phone: "",
      email: "",
      discipline: "",
      status: "",
      date: "",
      rate: 0,
      estimate: 0,
      coRate: 0,
    });
    setShowNewContractorForm(false);
  };

  return (
    <Providers>
      <Chakra>
        <Head>
          <title>Contractors</title>
          <meta name="description" content="Contractors page" />
          {/* Add more metadata as needed */}
        </Head>
        <Navbar />
        <Flex style={{ display: "flex" }}>
          <Sidebar children={undefined} />
          <Flex direction="column" p={5} w="full">
            <Flex justify="space-between" align="center" mb={5}>
              <Heading size="lg">Contractors</Heading>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="blue"
                onClick={() => setShowNewContractorForm(true)}
              >
                New Contractor Request
              </Button>
            </Flex>
            <Table variant="simple" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Contractor Name</Th>
                  <Th>Contractor Phone</Th>
                  <Th>Contractor Email</Th>
                  <Th>Discipline</Th>
                  <Th>Request Status</Th>
                  <Th>Request Date</Th>
                  <Th>Rate ($/hr)</Th>
                  <Th>Hours Estimate</Th>
                  <Th>CO Rate ($/hr)</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {contractors.map((contractor, index) => (
                  <Tr key={index}>
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
                        borderWidth={1} // Make border smaller
                        borderColor={`${getStatusColor(contractor.status)}.500`}
                      >
                        {contractor.status}
                      </Badge>
                    </Td>
                    <Td>{contractor.date}</Td>
                    <Td>{contractor.rate}</Td>
                    <Td>{contractor.estimate}</Td>
                    <Td>{contractor.coRate}</Td>
                    <Td>
                      <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        onClick={() => setDeleteContractor(contractor)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <AlertDialog
              isOpen={!!deleteContractor}
              leastDestructiveRef={cancelRef}
              onClose={() => setDeleteContractor(null)}
            >
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Contractor
                </AlertDialogHeader>

                <AlertDialogCloseButton />
                <AlertDialogBody>
                  Are you sure you want to delete the contractor?
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button
                    ref={cancelRef}
                    onClick={() => setDeleteContractor(null)}
                  >
                    No
                  </Button>
                  <Button colorScheme="red" onClick={handleDelete} ml={3}>
                    Yes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
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
                        <FormLabel>Status</FormLabel>
                        <Select
                          placeholder="Select status"
                          value={newContractor.status}
                          onChange={(e) =>
                            setNewContractor((prevContractor) => ({
                              ...prevContractor,
                              status: e.target.value,
                            }))
                          }
                        >
                          <option value="ACCEPTED">Accepted</option>
                          <option value="PENDING">Pending</option>
                          <option value="REJECTED">Rejected</option>
                        </Select>
                      </FormControl>
                      <FormControl mt={2}>
                        <FormLabel>Date</FormLabel>
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
                      <FormControl mt={2}>
                        <FormLabel>CO Rate ($/hr)</FormLabel>
                        <Input
                          type="number"
                          placeholder="Enter CO rate"
                          value={newContractor.coRate}
                          onChange={(e) =>
                            setNewContractor((prevContractor) => ({
                              ...prevContractor,
                              coRate: parseFloat(e.target.value),
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
