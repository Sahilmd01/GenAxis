import { useNavigate } from 'react-router-dom';

const HelpButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/feedback');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-transparent hover:scale-110 transition-all duration-300 focus:outline-none animate-[bounce_2s_infinite]"
      aria-label="Get help"
    >
      <img 
        src="/robo.png" 
        alt="Help" 
        className="w-10 h-10"
      />
    </button>
  );
};

export default HelpButton;