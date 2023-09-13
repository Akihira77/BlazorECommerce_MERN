import React, { useState } from "react";
import { Container, Button, TextField, Box, Text } from "@radix-ui/themes";

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container size={"1"} mt={"9"}>
      <form className="d-flex justify-content-center flex-column">
        <Text size={"7"} className="text-center">
          Login
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
        <div className="mb-3">
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
        </div>
        <Button type="submit" variant="classic">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Login;
