

import "./footer.css";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
 <div>{currentYear}</div>
  );
}
