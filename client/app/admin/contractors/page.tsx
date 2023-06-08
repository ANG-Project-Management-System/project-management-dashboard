"use client"

import { useState } from 'react';
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
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Chakra from "@/app/components/Chakra";
import Navbar from "@/app/components/Navbar";
import Providers from "@/app/components/Providers";
import Sidebar from "@/app/components/Sidebar";

export default function Contractors() {
  const [contractors, setContractors] = useState([
    {
      name: 'Contractor 1',
      phone: '123-456-7890',
      email: 'contractor1@example.com',
      discipline: 'Civil',
      status: 'ACCEPTED',
      date: '2023-06-01',
      rate: 20,
      estimate: 40,
      coRate: 30,
    },
    {
      name: 'Contractor 2',
      phone: '098-765-4321',
      email: 'contractor2@example.com',
      discipline: 'Mechanical',
      status: 'PENDING',
      date: '2023-06-05',
      rate: 25,
      estimate: 35,
      coRate: 25,
    },
    {
      name: 'Contractor 3',
      phone: '321-654-0987',
      email: 'contractor3@example.com',
      discipline: 'Electrical',
      status: 'REJECTED',
      date: '2023-06-06',
      rate: 30,
      estimate: 30,
      coRate: 20,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
        return 'green';
      case 'PENDING':
        return 'blue';
      case 'REJECTED':
        return 'red';
      default:
        return 'gray';
    }
  };

  // Implement delete functionality and add new contractor functionality
  // ...

  return (
    <Providers>
      <Chakra>
        <Navbar />
        <Flex style={{ display: "flex" }}>
          <Sidebar children={undefined}/>
          <Flex direction="column" p={5} w="full">
            <Flex justify="space-between" align="center" mb={5}>
              <Heading size="lg">Contractors</Heading>
              <Button leftIcon={<AddIcon />} colorScheme="blue">
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
                        // onClick={...} // Implement the delete functionality
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        </Flex>
      </Chakra>
    </Providers>
  );
}
