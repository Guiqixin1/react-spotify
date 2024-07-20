export default function Button({ children, onClick, style }) {
  const commonStyle = {
    backgroundColor: '#1d1d1d',
    border: 'none',
    color: 'white',
    textAlign: 'center',
    display: 'inline-block',
    padding: '10px',
    opacity: '0.5'
  };
  const combinedStyle = { ...commonStyle, ...style };
  return (
    <>
      <button style={combinedStyle} onClick={onClick}>
        {children}
      </button>
    </>
  );
}
