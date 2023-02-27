import Link from 'next/link';
import styles from './EmissionSources.module.css';
import EmissionTable from './EmissionTable';

export default function EmissionSources(props) {
  return (
    <div className={styles.background}>
      {props.children}
      <div className={styles['text-background']}>
        <h1 className={styles['h1-emissions']}>
          What are CO{'\u2082'}e equivalents?
        </h1>
        <p className={styles['p-emissions']}>
          In short a CO{'\u2082'} equivalent (CO{'\u2082'}e) is a unit of
          measurement that is used to standardise the climate effects of various
          greenhouse gases. A detailed explanation can be found{' '}
          <Link
            className={styles.link_extern}
            href="https://www.myclimate.org/information/faq/faq-detail/what-are-co2-equivalents/"
          >
            here
          </Link>
          .
        </p>
        <h1 className={styles['h1-emissions']}>
          What emission factors did we used?
        </h1>
        <EmissionTable />
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}
