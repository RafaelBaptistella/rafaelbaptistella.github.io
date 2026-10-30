/* ==========================================================================
   Shared chrome — header, contact menu and footer.
   Injected on every page so project pages stay tiny and in sync.
   ========================================================================== */

(() => {
  const ROOT = new URL("..", document.currentScript.src).href;
  const asset = (file) => `${ROOT}assets/${file}`;

  const CONTACT = {
    email: "rafaeldesouzabaptistella@gmail.com",
    phone: "(+55) 11 99917-4066",
    cv: "https://docs.google.com/document/d/1Q-fFEERuD2KZth9sEtyevQCwOUXftVWyIsRzCYFXAq4/edit?tab=t.0",
    linkedin: "https://www.linkedin.com/in/rafael-baptistella-6830b824a/",
    whatsapp: "https://api.whatsapp.com/send/?phone=5511999174066&text&type=phone_number&app_absent=0",
  };
  const MAILTO = `mailto:${CONTACT.email}`;
  const EXTERNAL = 'target="_blank" rel="noopener noreferrer"';

  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"></use></svg>`;

  /* Icon sprite — paths come straight from the Euristike DS icon set */
  const sprite = `
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="i-mail" viewBox="0 0 24 24"><path d="M21.1797 3C22.7371 3 24 4.26287 24 5.82031L24 18.1797C24 19.7371 22.7371 21 21.1797 21L2.82031 21L2.53125 20.9854C1.10945 20.8407 0 19.6396 0 18.1797L0 5.82031C0 4.36036 1.10945 3.15926 2.53125 3.01465L2.82031 3L21.1797 3ZM12.3525 14.1621L12 14.3496L11.6475 14.1621L1.5 8.75098L1.5 18.1797C1.5 18.9087 2.0913 19.5 2.82031 19.5L21.1797 19.5C21.9087 19.5 22.5 18.9087 22.5 18.1797L22.5 8.75098L12.3525 14.1621ZM12.3525 13.3115L12 13.499L11.6475 13.3115L1.85254 8.08887L12 13.5L22.1475 8.08887L12.3525 13.3115ZM2.82031 4.5C2.0913 4.5 1.5 5.0913 1.5 5.82031L1.5 7.05078L12 12.6494L22.5 7.05078V5.82031C22.5 5.0913 21.9087 4.5 21.1797 4.5L2.82031 4.5Z"/></symbol>
  <symbol id="i-linkedin" viewBox="48 0 24 24"><path d="M64 8C65.5913 8 67.1174 8.63214 68.2426 9.75736C69.3679 10.8826 70 12.4087 70 14V21H66V14C66 13.4696 65.7893 12.9609 65.4142 12.5858C65.0391 12.2107 64.5304 12 64 12C63.4696 12 62.9609 12.2107 62.5858 12.5858C62.2107 12.9609 62 13.4696 62 14V21H58V14C58 12.4087 58.6321 10.8826 59.7574 9.75736C60.8826 8.63214 62.4087 8 64 8ZM50 9H54V21H50V9ZM54 4C54 5.10457 53.1046 6 52 6C50.8954 6 50 5.10457 50 4C50 2.89543 50.8954 2 52 2C53.1046 2 54 2.89543 54 4Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-whatsapp" viewBox="96 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M116.503 3.48755C115.394 2.37759 114.076 1.49802 112.625 0.899492C111.174 0.30096 109.62 -0.00471772 108.05 5.5039e-05C101.464 5.5039e-05 96.1029 5.33469 96.1002 11.8929C96.0973 13.9812 96.6477 16.0329 97.6955 17.8393L96 24L102.335 22.3463C104.088 23.2962 106.051 23.7934 108.046 23.7927H108.05C114.636 23.7927 119.997 18.4575 120 11.8999C120.004 10.3359 119.697 8.78671 119.097 7.34251C118.496 5.89831 117.615 4.58791 116.503 3.48755ZM108.05 21.7854H108.046C106.268 21.7859 104.523 21.3101 102.991 20.4075L102.628 20.1932L98.8693 21.1747L99.8727 17.527L99.6364 17.152C98.6423 15.5782 98.1157 13.7544 98.1177 11.8929C98.1177 6.44308 102.575 2.00898 108.054 2.00898C110.682 2.00429 113.205 3.04373 115.067 4.89868C116.929 6.75364 117.977 9.27219 117.982 11.9004C117.98 17.3507 113.525 21.7854 108.05 21.7854ZM113.498 14.3824C113.2 14.2334 111.73 13.5145 111.458 13.4154C111.186 13.3163 110.985 13.2665 110.786 13.5643C110.587 13.8622 110.015 14.5286 109.841 14.7295C109.667 14.9304 109.492 14.9524 109.194 14.8034C108.896 14.6545 107.933 14.3411 106.792 13.3286C105.905 12.5406 105.306 11.5677 105.132 11.2704C104.958 10.9731 105.113 10.8118 105.262 10.664C105.397 10.5306 105.561 10.3168 105.71 10.1433C105.86 9.96968 105.91 9.8454 106.009 9.64718C106.108 9.44897 106.059 9.2754 105.984 9.127C105.91 8.97861 105.312 7.51558 105.064 6.9204C104.821 6.34076 104.575 6.41951 104.392 6.4104C104.218 6.40183 104.017 6.39969 103.819 6.39969C103.668 6.40362 103.519 6.43867 103.383 6.50263C103.246 6.5666 103.123 6.65812 103.023 6.77147C102.749 7.06933 101.978 7.78933 101.978 9.25075C101.978 10.7122 103.049 12.1265 103.197 12.3247C103.345 12.5229 105.303 15.5245 108.298 16.8118C108.854 17.05 109.422 17.2589 110 17.4375C110.716 17.6636 111.366 17.632 111.881 17.5554C112.454 17.4702 113.649 16.8365 113.897 16.1422C114.145 15.4479 114.145 14.8532 114.071 14.7295C113.996 14.6057 113.797 14.5307 113.498 14.3824Z"/></symbol>
  <symbol id="i-arrow-up" viewBox="0 0 24 24"><path d="M12.0015 7.5C12.1591 7.5 12.2985 7.57449 12.3901 7.68848L12.4243 7.7168L15.354 10.6465C15.5491 10.8417 15.549 11.1583 15.354 11.3535C15.1588 11.5487 14.8422 11.5487 14.647 11.3535L12.5015 9.20801L12.5015 16C12.5015 16.2761 12.2776 16.5 12.0015 16.5C11.7254 16.4999 11.5015 16.2761 11.5015 16L11.5015 9.20605L9.354 11.3535C9.15878 11.5487 8.84224 11.5487 8.64697 11.3535C8.45174 11.1583 8.45172 10.8417 8.64697 10.6465L11.5757 7.7168L11.6186 7.68164C11.7103 7.57159 11.8471 7.50008 12.0015 7.5Z"/></symbol>
  <symbol id="i-back" viewBox="0 0 16 16"><path d="M3.09091 3.64684C3.28612 3.45179 3.60271 3.45181 3.79794 3.64684C3.99315 3.84205 3.99305 4.1586 3.79794 4.35387L2.65146 5.50035H12.5157C13.8968 5.50074 15.0127 6.62066 15.0128 8.00035L15.0138 10.0004C15.0135 11.3805 13.8939 12.4999 12.5138 12.5004H8.94638C8.67056 12.5002 8.44667 12.2761 8.44638 12.0004C8.44638 11.7243 8.67037 11.5005 8.94638 11.5004H12.5138C13.3416 11.4999 14.0135 10.8282 14.0138 10.0004L14.0128 8.00035C14.0127 7.17147 13.3431 6.50074 12.5157 6.50035H2.65146L3.79794 7.64684C3.9932 7.84209 3.99319 8.1586 3.79794 8.35387C3.60266 8.54888 3.28609 8.54904 3.09091 8.35387L1.16122 6.42516L1.08505 6.33043C0.953271 6.13083 0.953286 5.86988 1.08505 5.67027L1.16122 5.57652L3.09091 3.64684Z"/></symbol>
  <symbol id="i-external" viewBox="0 0 16 16"><path d="M7.74951 3.75C8.02565 3.75 8.24951 3.97386 8.24951 4.25C8.24951 4.52614 8.02565 4.75 7.74951 4.75H5.74951C4.92108 4.75 4.24951 5.42157 4.24951 6.25V10.25C4.24951 11.0784 4.92108 11.75 5.74951 11.75H9.74951C10.5779 11.75 11.2495 11.0784 11.2495 10.25V8.25C11.2495 7.97386 11.4734 7.75 11.7495 7.75C12.0257 7.75 12.2495 7.97386 12.2495 8.25V10.25C12.2495 11.6307 11.1302 12.75 9.74951 12.75H5.74951C4.3688 12.75 3.24951 11.6307 3.24951 10.25V6.25C3.24951 4.86929 4.3688 3.75 5.74951 3.75H7.74951ZM12.27 3.2627C12.5045 3.31057 12.6888 3.49505 12.7368 3.72949L12.7505 3.84961L12.7495 5.75C12.7493 6.02596 12.5255 6.24994 12.2495 6.25C11.9735 6.24994 11.7497 6.02596 11.7495 5.75V4.95605L7.60303 9.10352C7.40782 9.29849 7.09121 9.29848 6.896 9.10352C6.70104 8.9083 6.70102 8.59169 6.896 8.39648L11.0425 4.24902L10.2495 4.25C9.97345 4.24994 9.74957 4.02606 9.74951 3.75C9.74957 3.47394 9.97345 3.25006 10.2495 3.25H12.1499L12.27 3.2627Z"/></symbol>
  <symbol id="i-chevron-up" viewBox="0 0 16 16"><path d="M5 9.49988L7.92869 6.57097C7.96774 6.53192 8.03144 6.53154 8.07049 6.57059L10.9998 9.49988" fill="none" stroke="currentColor" stroke-linecap="round"/></symbol>
</svg>`;

  const ABOUT_URL = `${ROOT}about.html`;
  const onAbout = location.href.split(/[?#]/)[0] === ABOUT_URL;

  const header = `
<header class="header" data-header>
  <div class="header__blur" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
  <div class="header__inner container">
    <a class="logo" href="${ROOT}index.html" aria-label="Rafael Baptistella — home">
      <img src="${asset("logo.svg")}" alt="" width="57" height="81">
    </a>
    <nav class="nav" aria-label="Main">
      <a class="btn btn--ghost" href="${ABOUT_URL}"${onAbout ? ' aria-current="page"' : ""}>About</a>
      <a class="btn btn--ghost" href="${CONTACT.cv}" ${EXTERNAL}>CV</a>
      <div class="nav__contact">
        <button class="btn btn--primary" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="contact-menu" data-menu-toggle>Contact</button>
        <div class="menu" id="contact-menu" role="menu" aria-label="Contact">
          <a class="menu__item" role="menuitem" href="${CONTACT.whatsapp}" ${EXTERNAL}>WhatsApp</a>
          <a class="menu__item" role="menuitem" href="${CONTACT.linkedin}" ${EXTERNAL}>Linkedin</a>
          <a class="menu__item" role="menuitem" href="${MAILTO}">Gmail</a>
        </div>
      </div>
    </nav>
  </div>
</header>`;

  const footer = `
<footer class="container">
 <div class="footer" data-fade>
  <a class="logo" href="${ROOT}index.html" aria-label="Back to home">
    <img src="${asset("logo-footer.svg")}" alt="" width="57" height="81">
  </a>
  <div class="social">
    <a class="social__link" href="${MAILTO}" aria-label="Email">${icon("mail")}</a>
    <a class="social__link" href="${CONTACT.linkedin}" ${EXTERNAL} aria-label="LinkedIn">${icon("linkedin")}</a>
    <a class="social__link" href="${CONTACT.whatsapp}" ${EXTERNAL} aria-label="WhatsApp">${icon("whatsapp")}</a>
  </div>
 </div>
</footer>`;

  document.body.insertAdjacentHTML("afterbegin", sprite + header);
  document.querySelector("#smooth-content").insertAdjacentHTML("beforeend", footer);
})();
