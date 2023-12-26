const CommentList = ({ content, id, status }: any) => {
  return (
    <ul>
      <li key={id}>
        <p>{content}</p>
        <p>{status}</p>
      </li>
    </ul>
  );
};

export default CommentList;
