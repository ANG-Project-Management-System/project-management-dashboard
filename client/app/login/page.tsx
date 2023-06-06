"use client";

import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div>
      <Button 
        colorScheme="blue" 
        onClick={() => signIn("google")}
      >
        Sign into google
      </Button>
    </div>
  );
};
export default Login;
