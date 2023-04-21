import { styled } from '@mui/system';

const FooterContainer = styled('footer')({
  marginTop: 'auto',
  background: '#333333',
  color: '#ffffff',
  padding: '1rem',
  textAlign: 'center',
  
});

const FooterText = styled('span')({
  marginRight: '0.5rem',
});

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2023 Polished Profiles Team. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
