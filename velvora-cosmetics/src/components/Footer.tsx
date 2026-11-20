import { ClockIcon, FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsappIcon, YoutubeIcon } from './Icons'

const links = ['About us', 'Our team', 'FAQ', 'Shipping & returns', 'Contact']

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <div className="footer__brand">
          <a href="#top" className="logo logo--light">Velvora<i>.</i></a>
          <p>Our formulas are made with natural, organic, and cruelty-free ingredients that are gentle, effective, and good for you and the environment.</p>
          <div className="footer__social">
            <a href="#top" aria-label="Facebook"><FacebookIcon size={18} /></a>
            <a href="#top" aria-label="Instagram"><InstagramIcon size={18} /></a>
            <a href="#top" aria-label="WhatsApp"><WhatsappIcon size={18} /></a>
            <a href="#top" aria-label="YouTube"><YoutubeIcon size={18} /></a>
          </div>
        </div>

        <div>
          <h4>Explore</h4>
          <ul className="footer__links">
            {links.map((l) => <li key={l}><a href="#top">{l}</a></li>)}
          </ul>
        </div>

        <div>
          <h4>Visit &amp; talk</h4>
          <ul className="footer__contacts">
            <li><PhoneIcon size={16} /> +123 488 9652</li>
            <li><MailIcon size={16} /> hello@velvora.com</li>
            <li><PinIcon size={16} /> 25 West 21th Street, Miami FL, USA</li>
            <li><ClockIcon size={16} /> Mon–Fri: 10:00 – 18:00</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© 2026 Velvora. All rights reserved.</span>
        <ul>
          <li><a href="#top">Privacy</a></li>
          <li><a href="#top">Terms</a></li>
          <li><a href="#top">Cookies</a></li>
        </ul>
      </div>
    </footer>
  )
}
