import React, { useState } from 'react';
import { LocaleConsumer } from '../contexts/LocaleContext';
import { Link } from 'react-router-dom';

function NavSlide(){
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
      setIsOpen(!isOpen);
    };
    return (
        <LocaleConsumer>
            {() => {
                return (
             <div>
                 <button className="toggle-button" onClick={toggleNav}>
                            &#9776; {/* Unicode for hamburger icon */}
                        </button>
                    <nav className={`slide-navigation ${isOpen ? 'open' : ''}`}>
                                   
                        <ul>
                            <li><Link to='/'>Dashboard</Link></li>
                            <li><Link to='/item'>Item</Link></li>
                            <li><Link to='/task'>Task</Link></li>
                        </ul>
                        </nav>
             </div>
                        
                    
                    
                )
            }
        }
        </LocaleConsumer>
    )
}
  

export default NavSlide;
