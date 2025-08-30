import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroModern} style={{ marginTop: '-80px', paddingTop: '80px' }}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            show your
            <br />
            <span className={styles.heroTitleHandwritten}>supports</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Turn your passion into action; create custom images that show what you stand for and invite friends to join you
          </p>
          <Link href="/create" className={styles.btnPrimary}>
            + Start a Campaign
          </Link>
        </div>
      </div>
      
      {/* Hero Mockups */}
      <div className={styles.heroMockups}>
        <div className={styles.mockupsContainer}>
          {/* Campaign frame mockups would go here */}
          <div className={styles.mockupsGrid}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.mockupCard}></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}