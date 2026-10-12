import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/clerk-react';
import { getDashboardUrl } from '../config/urls';

const pages = [
  { label: 'Signup', to: '/singup' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Pricing', to: '/pricing' },
];

function Navbar1() {
  const dashboardUrl = getDashboardUrl();

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: '#ffffff', borderBottom: '1px solid #eef0f2' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 64, flexWrap: 'wrap', py: { xs: 1, md: 0 } }}>
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', mr: { xs: 1, md: 4 } }}>
            <Box component="img" src="media/logo.svg" alt="logo" sx={{ width: '9rem' }} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} />

          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-end' }, width: { xs: '100%', md: 'auto' }, flexGrow: { md: 0 } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                component={Link}
                to={page.to}
                sx={{
                  mx: { xs: 0.75, md: 1.5 }, px: 0, minWidth: 'auto', color: '#5a6570', fontWeight: 400,
                  minHeight: 44,
                  fontSize: { xs: '0.875rem', md: '0.95rem' }, textTransform: 'none',
                  '&:hover': { backgroundColor: 'transparent', color: '#387ed1' },
                }}
              >
                {page.label}
              </Button>
            ))}

            {process.env.REACT_APP_CLERK_PUBLISHABLE_KEY && (
              <AuthControls dashboardUrl={dashboardUrl} />
            )}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

function AuthControls({ dashboardUrl }) {
  const { isSignedIn } = useAuth();

  React.useEffect(() => {
    if (isSignedIn && window.location.origin !== dashboardUrl) {
      window.location.assign(`${dashboardUrl}/`);
    }
  }, [dashboardUrl, isSignedIn]);

  return (
    <>
      <SignedOut>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap', gap: 1, width: { xs: '100%', md: 'auto' }, mt: { xs: 0.5, md: 0 } }}>
          <SignInButton mode="modal">
            <Button sx={{ minHeight: 44, borderRadius: 2, textTransform: 'none', backgroundColor: '#387ed1', color: '#fff', '&:hover': { backgroundColor: '#2d69b3' } }}>
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button sx={{ minHeight: 44, borderRadius: 2, textTransform: 'none', border: '1px solid #dfe6ee', color: '#1f2730', '&:hover': { backgroundColor: '#f3f5f8' } }}>
              Sign up
            </Button>
          </SignUpButton>
        </Box>
      </SignedOut>

      <SignedIn>
        <Box sx={{ ml: { xs: 0, md: 1.5 }, width: { xs: '100%', md: 'auto' }, display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, mt: { xs: 0.5, md: 0 } }}>
          <UserButton afterSignOutUrl="/" />
        </Box>
      </SignedIn>
    </>
  );
}

export default Navbar1;
