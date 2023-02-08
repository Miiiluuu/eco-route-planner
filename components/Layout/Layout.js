import Link from 'next/link';
import Styles from './Layout.module.css';

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
      <main>{props.children}</main>
      <footer>Footer</footer>
    </div>
  );
}
