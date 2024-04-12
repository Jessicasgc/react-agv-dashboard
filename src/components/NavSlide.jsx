import { LocaleConsumer } from '../contexts/LocaleContext';
import { Link } from 'react-router-dom';

function NavSlide(){
    return (
        <LocaleConsumer>
            {() => {
                return (
                    <nav className='slide-navigation'>
                        <ul>
                            <li><Link to='/'>Dashboard</Link></li>
                            <li><Link to='/item'>Item</Link></li>
                            <li><Link to='/task'>Task</Link></li>
                        </ul>
                    </nav>
                )
            }
        }
        </LocaleConsumer>
    )
}
  

export default NavSlide;
