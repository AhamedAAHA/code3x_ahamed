// after login page, just show token
import { Box, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  // get token saved after google login
  const token = localStorage.getItem("accessToken");

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: 2, bgcolor: "#f3f7f0" }}>
      <Paper sx={{ p: 4, maxWidth: 600, width: "100%" }}>
        <h2>Login Successful!</h2>
        <Typography color="gray" sx={{ mt: 1 }}>
          Your accessToken:
        </Typography>

        <div style={{ background: "#eee", padding: 12, marginTop: 12, wordBreak: "break-all", fontSize: 12 }}>
          {token ? token : "no token found"}
        </div>

        <Button
          variant="contained"
          sx={{ mt: 3, bgcolor: "black", borderRadius: "50px" }}
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
}

export default Success;
