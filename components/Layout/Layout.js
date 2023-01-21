import Link from 'next/link';
import Styles from './Layout.module.css';

export function Layout(props) {
  return (
    <div>
      <header className={Styles.header}>
        <div className={Styles.logo}>Logo</div>
        <nav className={Styles.nav_bar}>
          <Link className={Styles.nav_link} href="">
            Link
          </Link>
          <Link className={Styles.nav_link} href="">
            Link
          </Link>
          <Link className={Styles.nav_link} href="">
            Link
          </Link>
        </nav>
      </header>
      <main>{props.children}</main>
      <footer>Footer</footer>
    </div>
  );
}
