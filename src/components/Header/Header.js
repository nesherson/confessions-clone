import { useHistory } from 'react-router';
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';

const Head = styled.header`
  border-bottom: 1px solid rgba(136, 136, 136, 0.25);
  @media only screen and (max-width: 925px) {
    display: flex;
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  margin: 10px 17%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 560px;
  @media only screen and (max-width: 925px) {
    width: 598px;
    margin: 10px 15%;
  }

  @media only screen and (max-width: 590px) {
    min-width: 390px;
    margin: 10px 5px;
  }

  @media only screen and (max-width: 420px) {
    min-width: 390px;
    margin: 10px 3px;
  }
`;

const Headline = styled.h1`
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
  margin: 0 0 0 20px;
`;

const Icons = styled.div``;

const Header = () => {
  const history = useHistory();

  console.log('re');

  return (
    <Head>
      <Wrapper>
        <Logo>
          <Headline
            onClick={() => {
              history.push('/');
            }}
          >
            Confessions
          </Headline>
        </Logo>
        <Icons>
          <StyledIcon icon='search' />
          <StyledIcon
            icon='feather'
            onClick={() => {
              history.push('/add-post');
            }}
          />
        </Icons>
      </Wrapper>
    </Head>
  );
};

export default Header;
