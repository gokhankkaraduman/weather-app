import { useState } from 'react';
import styles from './Footer.module.css';
import Modal from '../Modal/Modal';
import developerPhoto from '../../assets/developer.png';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className={styles.footer}>
        <p className={styles.text}>
          Made with ❤️ by{' '}
          <button 
            className={styles.link} 
            onClick={() => setIsModalOpen(true)}
            aria-label="View developer info"
          >
            Gökhan Karaduman
          </button>
        </p>
      </footer>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Developer Info"
      >
        <div className={styles.modalContent}>
          <div className={styles.profileSection}>
            <div className={styles.avatar}>
              <img 
                src={developerPhoto} 
                alt="Gökhan Karaduman" 
                className={styles.profilePhoto}
              />
            </div>
            <div className={styles.info}>
              <h3>Gökhan Karaduman</h3>
              <p>Frontend Developer</p>
            </div>
          </div>
          
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Email:</span>
              <a href="mailto:gokhan.kkaraduman3@gmail.com" className={styles.value}>
                gokhan.kkaraduman3@gmail.com    
              </a>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>GitHub:</span>
              <a 
                href="https://github.com/gokhankkaraduman" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.value}
              >
                github.com/gokhankkaraduman
              </a>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>LinkedIn:</span>
              <a 
                href="https://www.linkedin.com/in/gökhan-karaduman-419198320" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.value}
              >
                linkedin.com/in/gökhan-karaduman
              </a>
            </div>
          </div>

          <div className={styles.techStack}>
            <h4>Tech Stack Used:</h4>
            <div className={styles.tags}>
              <span className={styles.tag}>React</span>
              <span className={styles.tag}>Vite</span>
              <span className={styles.tag}>CSS Modules</span>
              <span className={styles.tag}>OpenWeather API</span>
              <span className={styles.tag}>React Icons</span>
              <span className={styles.tag}>Formik</span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}