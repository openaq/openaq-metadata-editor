import React from 'react';

class Header extends React.Component {
  render () {
    return (
      <header className='page__header' role='banner'>
        <div className='inner'>
          <div className='page__headline'>
            <h1 className='page__title'><a href='/' title='Visit homepage'>
              <img src='assets/graphics/layout/logo.svg' alt='OpenAQ logotype' height='48' />
              <span>OpenAQ</span>
            </a></h1>
          </div>
          <nav className='page__prime-nav'>
            <h2 className='page__prime-nav-title'><a href='#nav-block-browse'><span>Menu</span></a></h2>
            <div className='nav-block nav-block--browse' id='nav-block-browse'>
              <ul className='browse-menu'>
                <li><a href='#' title='Visit page' className='browse-menu__item browse-menu__item--active'><span>Home</span></a></li>
                <li><a href='#' title='Visit page' className='browse-menu__item'><span>Page 2</span></a></li>
                <li><a href='#' title='Visit page' className='browse-menu__item'><span>Page 3</span></a></li>
                <li><a href='#' title='Visit page' className='browse-menu__item'><span>Page 4</span></a></li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
