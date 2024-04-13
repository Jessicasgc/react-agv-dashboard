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
                    // <nav 
                    // className={'slide-navigation'}
                    // >
                    <div 
                    //className="slide-navigation"
                    >
                        <nav >
                                    <button className="toggle-button" onClick={toggleNav}>
                            &#9776; {/* Unicode for hamburger icon */}
                        </button>
                        <ul className={isOpen ? 'open' : ''}>
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
