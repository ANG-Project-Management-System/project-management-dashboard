"use client";

import {
  Box,
  Flex,
  Text,
  Button,
  Badge,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Providers from "../components/Providers";
import Chakra from "../components/Chakra";
import Navbar from "../components/ProjectNavbar";
import Link from "next/link";
import { useState } from "react";

interface Project {
  projectName: string;
  projectNumber: string;
  lastUpdated: string;
  status: string;
  description: string;
}

const cardContent: Project[] = [
  {
    projectName: "Project One",
    projectNumber: "001",
    lastUpdated: "2023-06-19 11:00",
    status: "Active",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    projectName: "Project Two",
    projectNumber: "002",
    lastUpdated: "2023-06-19 12:00",
    status: "Active",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    projectName: "Project Three",
    projectNumber: "003",
    lastUpdated: "2023-06-19 13:00",
    status: "Active",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    projectName: "Project Four",
    projectNumber: "004",
    lastUpdated: "2023-06-19 14:00",
    status: "Active",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    projectName: "Project Five",
    projectNumber: "005",
    lastUpdated: "2023-06-19 15:00",
    status: "Inactive",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

interface ProjectCardProps {
  project: Project;
  selectProject: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, selectProject }) => {
  return (
    <Box
      width="full"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={8}
      boxShadow="lg"
      m={3}
    >
      <Flex justifyContent="space-between">
        <Box>
          <Text mb={2}>
            <strong>Project Name:</strong> {project.projectName}
          </Text>
          <Text mb={2}>
            <strong>Project Number:</strong> {project.projectNumber}
          </Text>
        </Box>
        <Flex align="center">
          <Text mr={4}>
            <strong>Last Updated:</strong> {project.lastUpdated}
          </Text>
          <strong className="mr-2">Status:</strong>
          <Badge
            colorScheme="white"
            borderRadius="lg"
            px={2}
            py={1}
            borderWidth={1}
            borderColor={project.status === "Active" ? "green" : "red"}
          >
            {project.status}
          </Badge>
          <Link href={`/admin`}>
              <Button
                rightIcon={<ChevronRightIcon />}
                colorScheme="blue"
                ml={6}
                onClick={() => {
                  selectProject(project);
                  localStorage.setItem('selectedProject', JSON.stringify(project)); // Store selected project in Local Storage
                }} 
              >
                Open
              </Button>
            </Link>
        </Flex>
      </Flex>
      <Divider my={3} borderColor={useColorModeValue("gray.200", "gray.700")} />
      <Text>
        <strong>Project Description:</strong> {project.description}
      </Text>
    </Box>
  );
};

const Projects: React.FC = () => {
  const getInitialProject = (): Project | null => {
    const storedProject = localStorage.getItem('selectedProject');
    if (storedProject) {
      try {
        return JSON.parse(storedProject) as Project;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    return null;
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(getInitialProject); // Initialize selectedProject state from Local Storage
  return (
    <Providers>
      <Chakra>
        <Navbar /> 
        state down to Navbar
        <Flex direction="column" w="full" p={5}>
          <Flex
            mt={20}
            direction="column"
            align="center"
            justify="center"
            w="full"
          >
            {cardContent.map((project, index) => (
              <ProjectCard
                project={project}
                key={index}
                selectProject={setSelectedProject}
              /> // Pass setSelectedProject function down to each ProjectCard
            ))}
          </Flex>
        </Flex>
      </Chakra>
    </Providers>
  );
};

export default Projects;
