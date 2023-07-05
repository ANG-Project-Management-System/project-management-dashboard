"use client";

import {
  Box,
  Flex,
  Text,
  Button,
  Badge,
  Divider,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, ChevronRightIcon, CloseIcon } from "@chakra-ui/icons";
import Providers from "../components/Providers";
import Chakra from "../components/Chakra";
import Navbar from "../components/ProjectReqNavbar";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Project {
  _id: string;
  Project_Number: string;
  Client_Company_Name: string;
  Client_Contact_Name: string;
  Client_Email: string;
  Client_Contact_Phone_Number: string;
  Client_Address: string;
  Project_Name: string;
  Project_Description: string;
  Proposed_Start_Date: string;
  Proposed_Project_Completion_Date: string;
  Project_Disciplines_Engineering: string[];
  Project_Disciplines_Design_Drafting: string[];
  Project_Type: string;
  Status: string;
  "As of date:": number;
  "Total Approved Budget:": number;
  "Original PO Value:": number;
  "Expenses: (ABSA Fees, TSSA fees, etc.):": number;
  "Approx. hours remaining (based on blended rate of $120/hour)": number;
  "Remaining Budget:": number;
  Contractors: {
    Contractor_Name: string;
    Contractor_Phone_Number: string;
    Contractor_Email: string;
    Contractor_Availability: string;
    Start_Date: string;
    Specialty_Discipline: string;
    Contractor_Hourly_Rate: number;
    Discipline_Charge_Out_Rate: number;
  }[];
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/projects");
      const data = await response.json();
      console.log("Projects:", data);
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const toast = useToast();

  const handleAccept = async (project: Project) => {

    const status = {
      Status: "In Progress",
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/projects?id=${project._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(status),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast({
        title: "Project Accepted",
        description: "The project has been accepted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Re-fetch data from the API after a successful update
      const newResponse = await fetch("http://localhost:3000/api/projects");
      const newData = await newResponse.json();
      setProjects(newData);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleReject = async (project: Project) => {

    try {
        const response = await fetch(
          `http://localhost:3000/api/projects?id=${project._id}`,
          {
            method: "DELETE",
          }
        );
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        toast({
          title: "Project Rejected",
          description: "The project has been successfully deleted.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
  
        // Re-fetch data from the API after a successful update
        const newResponse = await fetch("http://localhost:3000/api/projects");
        const newData = await newResponse.json();
        setProjects(newData);
      } catch (error) {
        console.error("Error updating project:", error);
      }
  };

  return (
    <Providers>
      <Chakra>
        <Navbar />
        <Flex direction="column" w="full" p={5}>
          <Flex
            mt={20}
            direction="column"
            align="center"
            justify="center"
            w="full"
          >
            {projects &&
              projects
                .filter((project) => project.Status === "Request")
                .map((project, index) => (
                  <Box
                    key={index}
                    width="full"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p={8}
                    boxShadow="lg"
                    m={3}
                  >
                    {/* Project details */}
                    <Flex justifyContent="space-between">
                      <Box>
                        <Text mb={2}>
                          <strong>Project Name:</strong> {project.Project_Name}
                        </Text>
                        <Text mb={2}>
                          <strong>Project Number:</strong>{" "}
                          {project.Project_Number}
                        </Text>
                      </Box>
                      {/* Status and action */}
                      <Flex align="center">
                        <Text mr={4}>
                          <strong>As of date:</strong>{" "}
                          {project.Proposed_Start_Date.slice(0, 10)}
                        </Text>
                        <strong className="mr-2">Status:</strong>
                        <Badge
                          colorScheme="white"
                          borderRadius="lg"
                          px={2}
                          py={1}
                          borderWidth={1}
                          borderColor={
                            project.Status === "Request" ? "orange" : "red"
                          }
                        >
                          {project.Status}
                        </Badge>
                          <Button
                            rightIcon={<CloseIcon />}
                            colorScheme="red"
                            ml={6}
                            variant="outline"
                            onClick={() => {
                              handleReject(project);
                            }}
                          >
                            Reject
                          </Button>
                          <Button
                            rightIcon={<CheckIcon />}
                            colorScheme="teal"
                            ml={3}
                            onClick={() => {
                              handleAccept(project);
                            }}
                          >
                            Accept
                          </Button>
                      </Flex>
                    </Flex>
                    {/* Project description */}
                    <Divider
                      my={3}
                      borderColor={useColorModeValue("gray.200", "gray.700")}
                    />
                    <Text>
                      <strong>Project Description:</strong>{" "}
                      {project.Project_Description}
                    </Text>
                  </Box>
                ))}
          </Flex>
        </Flex>
      </Chakra>
    </Providers>
  );
};

export default Projects;
