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
    projectNumber: "001",
    lastUpdated: "2023-06-19 11:00",
    status: "Active",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    projectName: "Project Three",
    projectNumber: "001",
    lastUpdated: "2023-06-19 11:00",
    status: "Active",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    projectName: "Project Four",
    projectNumber: "001",
    lastUpdated: "2023-06-19 11:00",
    status: "Active",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    projectName: "Project Five",
    projectNumber: "001",
    lastUpdated: "2023-06-19 11:00",
    status: "Active",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
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
          <Link href="/admin">
              <Button
                rightIcon={<ChevronRightIcon />}
                colorScheme="blue"
                // variant="outline"
                ml={6}
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
  return (
    <Providers>
      <Chakra>
        <Navbar />
        <Flex direction="column" w="full" p={5}>
          {" "}
          {/* Adding padding here */}
          <Flex
            mt={20}
            direction="column"
            align="center"
            justify="center"
            w="full"
          >
            {cardContent.map((project, index) => (
              <ProjectCard project={project} key={index} />
            ))}
          </Flex>
        </Flex>
      </Chakra>
    </Providers>
  );
};

export default Projects;
