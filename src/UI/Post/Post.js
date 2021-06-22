import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';

import { parseDate } from '../../util/helpers';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.div`
  padding: 10px 15px 0 15px;
  border: 1px solid rgba(136, 136, 136, 0.25);
  &:hover {
    background-color: #192633;
  }
  transition: background-color 0.2s ease;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostId = styled.span`
  color: #bccedc;
  font-size: 0.9rem;
`;

const PostDate = styled.span`
  color: #bccedc;
  font-size: 0.9rem;
`;

const PostText = styled.p`
  color: #fff;
  font-size: 1.25rem;
`;

const StyledSpan = styled.span`
  color: #bccedc;
  font-size: 1.05rem;
  margin-right: 10px;
`;

const Number = styled.span`
  color: #fff;
  padding-left: 3px;
  font-weight: bold;
`;

const StyledDiv = styled.div`
  margin: 0;
  padding: 15px 0;
  border-top: 1px solid rgba(136, 136, 136, 0.25);
`;

const IconWrapper = styled.div`
  margin: 0;
  padding: 15px 0;
  display: flex;
  justify-content: space-evenly;
  border-top: 1px solid rgba(136, 136, 136, 0.25);
`;

const StyledIcon = styled(FeatherIcon)`
  margin: 0 25px;
  stroke: #bccedc;
  &:hover {
    stroke: #8aa9c1;
  }
`;

const Post = ({
  id,
  date,
  children,
  likes,
  dislikes,
  comments,
  like,
  dislike,
  handleComments,
}) => {
  const history = useHistory();

  return (
    <Wrapper>
      <PostHeader>
        <PostId
          onClick={() => {
            history.push(`/post/${id}`);
          }}
        >
          {id}
        </PostId>
        <PostDate>{parseDate(date)}</PostDate>
      </PostHeader>
      <PostText>{children}</PostText>
      <StyledDiv>
        <StyledSpan>
          Likes: <Number>{likes}</Number>{' '}
        </StyledSpan>
        <StyledSpan>
          Dislikes: <Number>{dislikes}</Number>
        </StyledSpan>
        <StyledSpan>
          Comments: <Number>{comments}</Number>
        </StyledSpan>
      </StyledDiv>
      <IconWrapper>
        <StyledIcon
          icon='thumbs-up'
          size='20'
          onClick={() => {
            like(id);
          }}
        />
        <StyledIcon
          icon='thumbs-down'
          size='20'
          onClick={() => {
            dislike(id);
          }}
        />
        <StyledIcon icon='message-square' size='20' onClick={handleComments} />
      </IconWrapper>
    </Wrapper>
  );
};

export default Post;
