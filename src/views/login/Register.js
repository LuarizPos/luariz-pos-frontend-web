import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  doRegister,
  showError,
} from "../../store/actions/loginActions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        LuarizPOS
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [password_1, setPassword_1] = useState("");
  const [password_2, setPassword_2] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const classes = useStyles();

  const error = useSelector((state) => state.login.error);

  const loading = useSelector((state) => state.login.loadingLoginData);

  const roles = [
    {
      value: 2,
      label: "Owner",
    },
    {
      value: 3,
      label: "Admin",
    },
  ];

  const validateForm = () => {
    if (name.length === 0) {
      dispatch(showError("Nama harus diisi"));
      return false;
    } else if (phone.length === 0) {
      dispatch(showError("No.Telp harus diisi"));
      return false;
    } else if (email.length === 0) {
      dispatch(showError("Email harus diisi"));
      return false;
    } else if (company.length === 0) {
      dispatch(showError("Nama Perusahaan harus diisi"));
      return false;
    } else if (role.length === 0) {
      dispatch(showError("Peran dalam Perusahaan harus dipilih"));
      return false;
    } else if (password_1.length === 0) {
      dispatch(showError("Password harus diisi"));
      return false;
    } else if (password_2.length === 0) {
      dispatch(showError("Ketik ulang password"));
      return false;
    } else if (password_1.length !== password_2.length) {
      dispatch(showError("Password yang Anda masukkan tidak sama"));
      return false;
    } else if (address.length === 0) {
      dispatch(showError("Alamat harus diisi"));
      return false;
    } else {
      dispatch(clearError());
      return true;
    }
  };

  const register = (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const formData = {
          name,
          phone,
          email,
          company,
          role,
          password_1,
          password_2,
          address,
        };
        dispatch(doRegister(formData));
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {loading ? <CircularProgress className="ml-2" /> : null}
        {error === "" ? null : (
          <Alert severity="error" className="error-login m-2">
            {error}
          </Alert>
        )}
        <form className={classes.form} onSubmit={register}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Phone"
                label="Phone"
                name="Phone"
                autoComplete="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="company"
                label="Company"
                name="company"
                autoComplete="company"
                onChange={(e) => setCompany(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="role"
                variant="outlined"
                fullWidth
                select
                label="Role"
                name="role_id"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                helperText="Please select your role in your company"
              >
                {roles.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_1"
                label="Password"
                type="password"
                id="password_1"
                autoComplete="password_1"
                onChange={(e) => setPassword_1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_2"
                label="Re-enter Password"
                type="password"
                id="password_2"
                autoComplete=" password_2"
                onChange={(e) => setPassword_2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // placeholder="MultiLine with rows: 2 and rowsMax: 4"
                multiline
                rows={2}
                rowsMax={4}
                variant="outlined"
                required
                fullWidth
                name="address"
                label="Address"
                type="text"
                id="address"
                autoComplete=" address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Register
          </Button>
          <Grid className="text-center">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
