import Link from 'next/link';
import Styles from './Layout.module.css';

export function Layout(props) {
  return (
    <div>
      <header className={Styles.header}>
        <div className={Styles.logo}>
          <img src="logo.png" alt="trawell logo" />
        </div>
        <nav className={Styles.nav_bar}>
          <Link className={Styles.nav_link} href="/#map">
            Route planner
          </Link>
          <Link className={Styles.nav_link} href="/#about">
            About us
          </Link>
          <Link className={Styles.nav_link} href="">
            Login
          </Link>
        </nav>
        <div className={Styles.stripe1}></div>
        <div className={Styles.stripe2}></div>
      </header>

      <main>{props.children}</main>
      <footer className={Styles.footer}>
        <div className={Styles.copyright_container}>
          <div className={Styles.copyright}>©Crazy 8 by Techlabs</div>
          <nav className={Styles.nav_bar_footer}>
            <Link className={Styles.nav_link_footer} href="/emission-sources">
              List of References
            </Link>
            <Link className={Styles.nav_link_footer} href="https://github.com/Miiiluuu/eco-route-planner">
              GitHub
            </Link>
            <Link className={Styles.nav_link_footer} href="">
              Terms & Conditions
            </Link>
            <Link className={Styles.nav_link_footer} href="">
              Impressum
            </Link>
            <Link className={Styles.nav_link_footer} href="">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
