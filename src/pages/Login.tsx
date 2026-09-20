// Login page - code3x internship task
import { useState } from "react";
import { Box, Grid, TextField, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { VisibilityOff, Google, Apple, Facebook } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function Login() {
  // states for inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  // normal login button (no backend, just validation)
  const handleLogin = () => {
    let ok = true;

    // check email format, task said email validation
    if (!username.includes("@") || !username.includes(".")) {
      setUsernameError("enter a valid email");
      ok = false;
    } else {
      setUsernameError("");
    }

    if (password.length < 6) {
      setPasswordError("password must be 6 characters");
      ok = false;
    } else {
      setPasswordError("");
    }

    if (ok) {
      alert("Login ok (demo only)");
    }
  };

  // google login using firebase, saw youtube tutorial for this
  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const cred = GoogleAuthProvider.credentialFromResult(result);
      console.log("google result", result); // for debug

      let token: any = cred?.accessToken;
      if (!token) {
        token = await result.user.getIdToken();
      }
      localStorage.setItem("accessToken", token);
      navigate("/success");
    } catch (error: any) {
      console.log(error);
      alert("google login failed");
    }
  };

  return (
    <Grid container style={{ minHeight: "100vh", background: "white" }}>
      {/* left side form */}
      <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", px: 4, py: 4, paddingLeft: { md: 10 }, paddingRight: { md: 10 } }}>
        <Typography variant="h3" style={{ fontWeight: 800 }}>Welcome back!</Typography>
        <Typography color="gray" sx={{ mt: 1, mb: 4 }}>
          Simplify your workflow and boost your productivity with <b>Tuga's App.</b> Get started for free.
        </Typography>

        <TextField
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={usernameError != ""}
          helperText={usernameError}
          fullWidth
          sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: "50px" } }}
        />

        <TextField
          placeholder="Password" type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError != ""}
          helperText={passwordError}
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end"><VisibilityOff style={{ color: "#aaa" }} /></InputAdornment>
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" } }}
        />

        <p style={{ textAlign: "right", fontSize: 14, marginTop: 8, marginBottom: 20 }}>Forgot Password?</p>

        <Button onClick={handleLogin} fullWidth
          sx={{ bgcolor: "black", color: "white", borderRadius: "50px", py: 1.8, textTransform: "none", fontSize: 17 }}>
          Login
        </Button>

        {/* or line */}
        <Box sx={{ display: "flex", alignItems: "center", my: 3, gap: 2 }}>
          <div style={{ flex: 1, height: 1, background: "#ddd" }}></div>
          <Typography sx={{ fontSize: 15 }}>or continue with</Typography>
          <div style={{ flex: 1, height: 1, background: "#ddd" }}></div>
        </Box>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <IconButton onClick={handleGoogle} sx={{ bgcolor: "black", color: "white", p: 2 }}>
            <Google />
          </IconButton>
          <IconButton sx={{ bgcolor: "black", color: "white", p: 2 }}>
            <Apple />
          </IconButton>
          <IconButton sx={{ bgcolor: "black", color: "white", p: 2 }}>
            <Facebook />
          </IconButton>
        </Box>

        <p style={{ textAlign: "center", marginTop: 60 }}>Not a member? <span style={{ color: "green" }}>Register now</span></p>
      </Grid>

      {/* right side image, hide in phone */}
      <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "flex" }, p: 3 }}>
        <Box sx={{ bgcolor: "#f3f7f0", borderRadius: "24px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 4 }}>
          {/* image from undraw.co */}
          <img src="/illustration.svg" alt="login" style={{ width: "80%", maxWidth: 400 }} />
          <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: "#ccc" }}></div>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: "#ccc" }}></div>
            <div style={{ width: 28, height: 10, borderRadius: 10, background: "black" }}></div>
          </Box>
          <h2 style={{ textAlign: "center", marginTop: 20, fontWeight: 400 }}>Make your work easier and organized <br /> with <b>Tuga's App</b></h2>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;

