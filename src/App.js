import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
// Importing all the svg's that we are going to need from inside the ./icons folder
// We import them as ReactComponent's and name then with CamelCase, we can then
// use them in a JSX element (for example, to use ArrowIcon, we would do: { <ArrowIcon> } )
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';


// Main function of the app that actually get's displayed on the webpage (As it is the default export)
function App() {
  // Wheen called, we can do any logic we need above in the function, but what get's rendered to the webpage is in the
  // return of the function. you can also only have ONE set of html tags on the top level, so a good idea is put 
  // everything inside a <div>
  return (
    // Using our custom Navbar component, from the function below 
    <Navbar>
      
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />

      <NavItem icon={<CaretIcon />}>

        <DropdownMenu/>

      </NavItem>

    </Navbar>
  );
}

// A react component declared as a function for the Nav bar at the top of the site
function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav"> { props.children }</ul>
    </nav>
  )
}


// React component for the individual items, or buttons, that will be on the navbar
function NavItem(props) {

  // useState returns an array of variables, so we use two const's to hold the two values as seperate variables
  const [open, setOpen] = useState();

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  )
}

function DropdownMenu() {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])  

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  // As we want this to be a dropdown menu with items within it, we declare the Dropdown menu item component
  // as a component WITHIN the dropdown menu itself
  function DropDownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    )
  }

  // After declaring the dropdownItem component we can return a div with as dropdownItems we want within it
  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition 
        in={activeMenu === 'main'}
        timeout={500}
        unmountOnExit 
        classNames="menu-primary"
        onEnter={calcHeight}>
          <div className="menu">
            <DropDownItem>My Profile</DropDownItem>
            <DropDownItem
              leftIcon={<CogIcon />}
              rightIcon={<ChevronIcon />}
              goToMenu="settings">
              Settings
            </DropDownItem>
            <DropDownItem
            leftIcon="🦧"
            rightIcon={<ChevronIcon />}
            goToMenu="animals">
            Animals
          </DropDownItem>
          </div>
      </CSSTransition>

      <CSSTransition 
        in={activeMenu === 'settings'}
        timeout={500}
        unmountOnExit
        onEnter={calcHeight}
        classNames="menu-secondary"
        >
          <div className="menu">
            <DropDownItem leftIcon={<ArrowIcon />} goToMenu="main" />
              <h2>Tutorial Menu</h2>
            <DropDownItem leftIcon={<BoltIcon />}>HTML</DropDownItem>
            <DropDownItem leftIcon={<BoltIcon />}>Css</DropDownItem>
            <DropDownItem leftIcon={<BoltIcon />}>JS</DropDownItem>
            <DropDownItem leftIcon={<BoltIcon />}>Other Shite</DropDownItem>
            <DropDownItem
             leftIcon={<CogIcon />}
             rightIcon={<ChevronIcon />}>
            </DropDownItem>
          </div>
      </CSSTransition>
    </div>
  )
}

export default App;
