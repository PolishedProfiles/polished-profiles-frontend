import { Container, Grid, Text, Link } from '@mantine/core';
// import { GitHub, Twitter, Instagram } from 'react-feather';

function Footer() {
  return (
    <footer className="footer">
      <Container size="xl">
        <Grid
          id="footer-grid"
          columns={12}
          spacing="md"
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Text align="center" size="sm" style={{ textAlign: 'center' }}>
            © 2023 Polished Profiles Team. All rights reserved.
          </Text>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
