import {useState} from "react";
import {Divider, Button} from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function Login({onLogin}) {
  const [showLoginForm, setShowLoginForm] = useState(true);
  return (
    <div>
      {showLoginForm ? (
        <div className="flex flex-col justify-center items-center my-4">
          <LoginForm onLogin={onLogin} />
          <Divider className="my-4" />
          <p>
            Need an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLoginForm(false)}>
              Sign Up
            </Button>
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center my-4">
          <SignUpForm onLogin={onLogin} />
          <Divider className="my-4" />
          <p>
            Already have an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLoginForm(true)}>
              Log In
            </Button>
          </p>
        </div>
      )}
    </div>
  );
}
