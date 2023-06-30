import {useState, useEffect} from "react";
import {Divider, Button} from "@chakra-ui/react";
import LoginForm from "../components/Auth/LoginForm";
import SignUpForm from "../components/Auth/SignUpForm";

export default function Login({onLogin}) {
  const [showLoginForm, setShowLoginForm] = useState(true);
  function toggleLoginForm() {
    setShowLoginForm(prevShowLoginForm => !prevShowLoginForm);
  }

  return (
    <div >
      {showLoginForm ? (
        <div className="flex flex-col justify-center items-center " style={{backgroundColor:"#334139", paddingBottom:"60.8vh"}} >
          <LoginForm onLogin={onLogin} />
          <Divider className="my-4" />
          <p>
            Need an account? &nbsp;
            <Button 
              onMouseEnter={(e) => e.target.style.backgroundColor = "#4346EF"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#6366F1"}
              style={{backgroundColor:"#6366F1", color:"white", width:"125px"}} 
              onClick={() => setShowLoginForm(false)}>
              Sign Up
            </Button>
          </p>
        </div>
      ) : (
        <div 
          style={{ paddingBottom: "20vh"}}
          className="flex flex-col justify-center items-center bg-smokey">
          <SignUpForm onLogin={onLogin} toggleLoginForm={toggleLoginForm} />
          <Divider className="my-4" />
          <p>
            Already have an account? &nbsp;
            <Button 
              onMouseEnter={(e) => e.target.style.backgroundColor = "#4346EF"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#6366F1"}
              style={{backgroundColor:"#6366F1", color:"white", paddingLeft:"30px", paddingRight:"30px"}} 
              onClick={() => setShowLoginForm(true)}>
              Log In
            </Button>
          </p>
        </div>
      )}
    </div>
  );
}
