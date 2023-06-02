import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import TwitterIcon from "@mui/icons-material/Twitter";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import SecurityIcon from "@mui/icons-material/Security";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="black"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box>
                <Link
                  href="/kokoelmani@gmail.com"
                  color="inherit"
                  underline="none"
                >
                  <AlternateEmailIcon /> Email Us
                </Link>
              </Box>
              <Box>
                <Link href="/support@kokoelmani.com" color="inherit">
                  <ContactSupportIcon /> Support
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <SecurityIcon /> Privacy
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <LoginIcon sx={{ color: "green" }} /> Login
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <AppRegistrationIcon sx={{ color: "green" }} /> Register
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Social Media</Box>
              <Box>
                <Link href="https://discord.gg/B2V3B5kc" color="inherit">
                  <FacebookIcon sx={{ color: "#4267B2" }} /> Discord
                </Link>
              </Box>
              <Box>
                <Link href="https://twitter.com/" color="inherit">
                  <InstagramIcon sx={{ color: "peru" }} /> Instagram
                </Link>
              </Box>
              <Box>
                <Link href="https://twitter.com/" color="inherit">
                  <TwitterIcon sx={{ color: "#1DA1F2" }} /> Twitter
                </Link>
              </Box>
              <Box>
                <Link href="https://twitter.com/" color="inherit">
                  <FacebookIcon sx={{ color: "#4267B2" }} /> Facebook
                </Link>
              </Box>
            </Grid>
          </Grid>
          {/* <p>The information presented on this site about Magic: The Gathering, both literal and graphical, is copyrighted by Wizards of the Coast (a subsidiary of Hasbro, Inc.), which includes, but is not limited to, card images, the mana symbols, and Oracle text.
This website is not produced, endorsed, supported, or affiliated with Wizards of the Coast.</p> */}
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Created By: Orelso Vitam &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
