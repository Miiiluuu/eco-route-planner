import styles from './About.module.css';

export function About(props) {
  return (
    <div className={styles.background}>
      {props.children}
      <div className={styles['text-background']}>
        <h1 id="about" className={styles['h1-about']}>
          About TraWell
        </h1>
        <p className={styles['p-about']}>
          TraWell has set itself the goal to promote the compatibility of
          sustainability and easy travel planning to enable green travel for
          everyone. We take great care to ensure that all alternative trips are
          displayed quickly and clearly. Have you noticed our Eco Icon? It gives
          you a quick overview of whether your trip would cause less or more
          emissions. <br />
          We thank you very much for using TraWell, together we can save the
          planet! Feel free to recommend us or participate, all code
          contributions and bug reports are welcome!
        </p>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}
