import { useHistory } from 'react-router';
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';

const Head = styled.header`
  border: 1px solid rgba(136, 136, 136, 0.25);
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledH1 = styled.h1`
  margin: 0;
  cursor: pointer;
`;

const Logo = styled.div`
  color: #fff;
`;

const StyledIcon = styled(FeatherIcon)`
  color: #fff;
  &:hover {
    color: #8aa9c1;
  }
  margin: 0 20px;
`;

const Wrapper = styled.div`
  margin: 0 25px;
`;

const Header = () => {
  const history = useHistory();

  return (
    <Head>
      <Logo>
        <StyledH1
          onClick={() => {
            history.push('/');
          }}
        >
          Confessions
        </StyledH1>
      </Logo>
      <Wrapper>
        <StyledIcon icon='search' />
        <StyledIcon
          icon='feather'
          onClick={() => {
            history.push('/add-post');
          }}
        />
      </Wrapper>
    </Head>
  );
};

export default Header;
