"use client";

import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";


export default function Login() {
  return (
    <div>
      <Button 
        colorScheme="blue" 
        onClick={() => signIn("google", { callbackUrl: `${window.location.origin}/admin` })}
      >
        Sign into google
      </Button>
    </div>
  );
};