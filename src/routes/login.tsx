import { Lock, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, InputAdornment, Link } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { AppProvider, SignInPage } from "@toolpad/core";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

const providers = [{ id: "credentials", name: "xxx" }];
function RouteComponent() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <AppProvider>
      <SignInPage
        providers={providers}
        sx={{ width: "100vw", "& > main": { maxWidth: "600px" }, backgroundRepeat: "no-repeat", backgroundPosition: "50%" }}
        slots={{
          forgotPasswordLink: () => <Link href="/sss">Forgot Password</Link>,
        }}
        localeText={{
          signInTitle: "XXXX System ",
          signInSubtitle: "",
          providerSignInTitle: () => "Login",
          email: "",
          password: "",
        }}
        slotProps={{
          emailField: {
            autoFocus: false,
            placeholder: "UserID",
            slotProps: {
              input: {
                startAdornment: (
                  <InputAdornment position={"start"}>
                    <Person />
                  </InputAdornment>
                ),
              },
            },
          },
          passwordField: {
            type: showPassword ? "text" : "password",
            placeholder: "Password",
            slotProps: {
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={() => setShowPassword((prev) => !prev)} sx={{ minWidth: 0, padding: 0 }} variant="text">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  </InputAdornment>
                ),
              },
            },
          },
          form: { noValidate: true },
          submitButton: { variant: "contained", color: "primary" },
        }}
      />
    </AppProvider>
  );
}
