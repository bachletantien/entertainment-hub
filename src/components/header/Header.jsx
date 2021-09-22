import './header.scss';
const Header = () => {
  return (
    <div onClick={() => window.scroll(0, 0)} className='header'>
      🎥 entertainment hub 🎬
    </div>
  );
};

export default Header;
