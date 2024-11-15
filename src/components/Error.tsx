interface ErrorProps  {
  message: string;
};

function Error({ message }: ErrorProps) {
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
}

export default Error;
