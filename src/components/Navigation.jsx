import { LocaleConsumer } from '../contexts/LocaleContext';
import LocaleToggle from './ToggleLocale';
import ThemeToggle from './ToggleTheme';


function Navigation(){
    return (
        <LocaleConsumer>
            {() => {
                return (
                    <div className='header-navigation'>
                        <>
                            <LocaleToggle/>
                            <ThemeToggle/>
                        </>
                    </div>
                )
            }
        }
        </LocaleConsumer>
    )
}
  

export default Navigation;
