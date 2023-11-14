import "./footer.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer root__content">
      <p className="footer__text">&copy; {year} Bookshelf</p>
    </footer>
  );
}
