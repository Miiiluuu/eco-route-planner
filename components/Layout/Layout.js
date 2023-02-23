import Link from 'next/link';
import Styles from './Layout.module.css';
import Image from 'next/image';

export function Layout(props) {
  return (
    <div>
      <header className={Styles.header}>
        <div className={Styles.logo}>
          <img src="logo.png" />
        </div>
        <nav className={Styles.nav_bar}>
          <Link className={Styles.nav_link} href="">
            Routenplaner
          </Link>
          <Link className={Styles.nav_link} href="">
            Über uns
          </Link>
          <Link className={Styles.nav_link} href="">
            Anmelden
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
          Nachhaltig 
        </div>
        <div className={Styles.backgroundtextright}>
         Reisen.
        </div>
        </div>
      <main>{props.children}</main>
      <footer>Footer</footer>
    </div>
  );
}
