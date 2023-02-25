import Link from 'next/link';
import Styles from './Layout.module.css';
import Image from 'next/image';

export function Layout(props) {
  return (
    <div>
      <header className={Styles.header}>
        <div className={Styles.logo}>
          <img src="logo.png" alt="trawell logo" />
        </div>
        <nav className={Styles.nav_bar}>
          <Link className={Styles.nav_link} href="">
            Route planner
          </Link>
          <Link className={Styles.nav_link} href="#about">
            About us
          </Link>
          <Link className={Styles.nav_link} href="">
            Login
          </Link>
        </nav>
        <div className={Styles.stripe1}></div>
        <div className={Styles.stripe2}></div>
      </header>
      <div className={Styles.backgroundimage}>
        <Image 
        src="/Hintergrund.webp"  
        alt="footprints of water in a forest"
        layout='fill'/> 
        <div className={Styles.backgroundtextleft}>
          Travel
        </div>
        <div className={Styles.backgroundtextright}>
         ecofriendly.
        </div>
        </div>
      <main>{props.children}</main>
      <footer>Footer</footer>
    </div>
  );
}
