import styles from './About.module.css';

export function About(props) {
  return (
    <div className={styles.background}>
      {props.children}
      <div className={styles['text-background']}>
        <h1 id="about" className={styles['h1-about']}>Über uns</h1>
        <p className={styles['p-about']}>TraWell has set itself the goal of promoting the compatibility of sustainability and good travel planning
          to enable green travel for everyone. We attach great importance to the fact that all alternatives not otherwise listed
          be displayed quickly and clearly. Have you noticed our sustainability sheets? These give you one
          a quick overview of whether your route would cause fewer or more emissions. <br/>
          We thank you very much for using it, because we can only do ours if we all work together
          save planet. Feel free to recommend us and follow us on our social media channels to avoid any of our projects
          to miss!
        </p>
        </div> 
      <div className={styles.footer}></div>
    </div>
  );
}