import styles from '../../styles/Home.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <a href="https://github.com/LJC0831/my-blog"
            target="_blank"
            rel="noopener noreferrer">
          <span>저자 : LJC</span><br/>
          <span>이메일 : leejc831@naver.com</span><br/>
          <span>Copyright 2024. cocoder. All Rights Reserved.</span>
        </a>
      </p>
    </footer>
  );
};

export default Footer;