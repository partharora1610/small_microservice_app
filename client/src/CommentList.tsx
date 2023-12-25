const CommentList = ({ content, id }: any) => {
  return (
    <ul>
      <li key={id}>{content}</li>
    </ul>
  );
};

export default CommentList;
