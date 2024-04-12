import { ThemeConsumer } from '../contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

function ThemeToggle() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return <button className='toggle-theme' onClick={toggleTheme}>{theme === 'light' ? <FaMoon /> : <FaSun />}</button>;
      }}
    </ThemeConsumer>
  );
}

export default ThemeToggle;
