import React, { useState } from "react";
import styles from "./style/AuthForm.module.css";
import { Avatar, Button, TextField, Grid, Typography } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { loginAuthData } from "../interfaces/userAuth";
import { registAuthData } from "../interfaces/userAuth";
import { AuthRequest } from "../requests/AuthRequest";
import { UserType } from "../../components/interfaces/interface";
import { AuthHeader } from "./AuthHeader";

interface Props {
  isLoggedIn: boolean;
  handleOnChangeStatus: (user: UserType) => void;
}

export const AuthForm: React.FC<Props> = (props) => {
  const [display, setDisplay] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const registerUser = async () => {
    const registUerData: registAuthData = {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    try {
      const res = await AuthRequest("sign_up", {
        data: registUerData,
      });
      if (res.logged_in && res.user) {
        props.handleOnChangeStatus(res.user);
      } else {
        alert(`${res.errors}`);
      }
    } catch (err) {
      alert("通信に失敗しました。");
    }
  };

  const loginUser = async () => {
    const loginUserData: loginAuthData = {
      email: email,
      password: password,
    };
    try {
      const res = await AuthRequest("sign_in", {
        data: loginUserData,
      });
      if (res.logged_in && res.user) {
        props.handleOnChangeStatus(res.user);
      } else {
        alert(res.errors);
      }
    } catch (err) {
      alert("通信に失敗しました。");
    }
  };

  return (
    <div>
      <AuthHeader />
      <div className={styles.main}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ marginTop: "15px" }}>
          {display ? "Login" : "Regster"}
        </Typography>
        <form noValidate className={styles.form}>
          <div className={styles.textfield}>
            <TextField
              className={styles.textfield}
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              autoFocus
            />
          </div>
          <div className={styles.textfield}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
            {display ? (
              <></>
            ) : (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password_confirmation"
                label="Confirmation Password"
                type="password"
                id="password_confirmation"
                autoComplete="current-password"
                value={passwordConfirmation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPasswordConfirmation(e.target.value);
                }}
              />
            )}
          </div>

          <Grid container>
            <Grid item>
              <span
                onClick={() => setDisplay(!display)}
                className={styles.toggleLetter}
              >
                {display ? "Create new acount ?" : "Back to Sign in"}
              </span>
            </Grid>
          </Grid>

          <div className={styles.submit}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<EmailIcon />}
              style={{
                textTransform: "none",
              }}
              onClick={
                display
                  ? async () => {
                      try {
                        await loginUser();
                      } catch (err) {
                        alert(err.message);
                      }
                    }
                  : async () => {
                      try {
                        await registerUser();
                      } catch (err) {
                        alert(err.message);
                      }
                    }
              }
            >
              {display ? "Login" : "Regster"}
            </Button>

            <div className={styles.submit}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                style={{
                  textTransform: "none",
                }}
                // onClick={signInGoogle}
              >
                Sign in with Google
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
