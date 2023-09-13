import React, { useState } from "react";
import { Container, Button, TextField, Box, Text } from "@radix-ui/themes";

type Props = {};

const Register = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Container size={"1"} mt={"9"}>
      <form className="d-flex justify-content-center flex-column">
        <Text size={"7"} className="text-center">
          Register
        </Text>
        <Box className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <TextField.Input
            type="email"
            className="form-control"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>
        <Box className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <TextField.Input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>
        <Box className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <TextField.Input
            type="confirmPassword"
            className="form-control"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Box>
        <Button type="submit" variant="classic">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Register;
