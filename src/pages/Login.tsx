import { FormEvent, useEffect, useReducer } from "react";
import styles from "./Login.module.css";
import PageNav from "../ui/PageNav";
import Button from "../ui/Button";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface initialStateProps {
  email: string;
  password: string;
}

type Action =
  | { type: "email"; payload: string }
  | { type: "password"; payload: string };

const initialState: initialStateProps = {
  email: "jack@example.com",
  password: "qwerty",
};

function reducer(state: initialStateProps, action: Action): initialStateProps {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  // const [email, setEmail] = useState("jack@example.com");
  // const [password, setPassword] = useState("qwerty");
  const [{ email, password }, dispatch] = useReducer(reducer, initialState);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(function () {
    if (isAuthenticated) navigate("/app", {replace: true});
    
  }, [isAuthenticated, navigate]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email && password) {
      login(email, password);
    }
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) =>
              dispatch({ type: "email", payload: e.target.value })
            }
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) =>
              dispatch({ type: "password", payload: e.target.value })
            }
            value={password}
          />
        </div>

        <div>
          <Button el="button">Login</Button>
        </div>
      </form>
    </main>
  );
}
