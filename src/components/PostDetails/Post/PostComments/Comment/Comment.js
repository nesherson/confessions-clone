import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';

const Container = styled.li`
  padding: 7px 15px;
  border-bottom: 1px solid rgba(136, 136, 136, 0.25);
  &:hover {
    background-color: #192633;
  }
  transition: background-color 0.2s ease;
  @media only screen and (max-width: 620px) {
    padding: 7px 5px;
  }
`;

const CommentDate = styled.span`
  margin: 5px 0;
  color: #bccedc;
  font-size: 0.9rem;
`;

const CommentText = styled.p`
  color: #fff;
`;

const Social = styled.div`
  display: flex;
  align-items: center;
`;

const StyledIcon = styled(FeatherIcon)`
  stroke: #bccedc;
  &:hover {
    stroke: #8aa9c1;
  }
  margin-right: 18px;
`;

const Number = styled.span`
  color: #bccedc;
  font-size: 0.95rem;
`;

const Comment = ({
  children,
  likes,
  dislikes,
  date,
  likeComment,
  dislikeComment,
}) => {
  const stats = likes - dislikes;
  return (
    <Container>
      <CommentDate>{date}</CommentDate>
      <CommentText>{children}</CommentText>
      <Social>
        <StyledIcon icon='thumbs-up' size='18' onClick={likeComment} />
        <StyledIcon icon='thumbs-down' size='18' onClick={dislikeComment} />
        <Number>{stats}</Number>
      </Social>
    </Container>
  );
};

export default Comment;
