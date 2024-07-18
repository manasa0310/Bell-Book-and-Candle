import Link from 'next/link';

const Footer = () => {
  const cities = [
    'Ahmedabad',
    'Amritsar',
    'Bangalore',
    'Chandigarh',
    'Chennai',
    'Coimbatore',
    'Guwahati',
    'Delhi',
    'Hyderabad',
    'Kolkata',
    'Mumbai',
    'Pune',
  ];

  return (
    <footer className="mt-auto  max-w-screen overflow-hidden">
      <div className="container">
        <div className="grid gap-y-10 gap-x-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-[100px]">
          <div className="relative">
            <ul className="mt-12 flex items-center gap-8">
              <li>
                <Link
                  href="https://www.facebook.com/p/Bell-Book-Candle-100085246628022/"
                  target="_blank">
                  <svg
                    width="10"
                    height="20"
                    viewBox="0 0 10 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition hover:scale-110 hover:text-secondary">
                    <path
                      d="M8.0733 3.29509H9.88498V0.139742C9.57242 0.0967442 8.49748 0 7.2456 0C4.6335 0 2.84415 1.643 2.84415 4.66274V7.44186H-0.0383301V10.9693H2.84415V19.845H6.37821V10.9701H9.1441L9.58317 7.44269H6.37738V5.01251C6.37821 3.99297 6.65273 3.29509 8.0733 3.29509Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/company/bellbookncandle01/?originalSubdomain=in"
                  target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    className="transition hover:scale-110  hover:fill-secondary"
                    fill="#7780A1"
                    viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.instagram.com/bellbookncandle01/"
                  target="_blank">
                  <svg
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition hover:scale-110 hover:text-secondary">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.75995 0H16.0099C19.8063 0 22.8849 3.07862 22.8849 6.875V15.125C22.8849 18.9214 19.8063 22 16.0099 22H7.75995C3.96357 22 0.884949 18.9214 0.884949 15.125V6.875C0.884949 3.07862 3.96357 0 7.75995 0ZM16.0099 19.9375C18.6637 19.9375 20.8224 17.7787 20.8224 15.125V6.875C20.8224 4.22125 18.6637 2.0625 16.0099 2.0625H7.75995C5.1062 2.0625 2.94745 4.22125 2.94745 6.875V15.125C2.94745 17.7787 5.1062 19.9375 7.75995 19.9375H16.0099Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.38495 11C6.38495 7.96263 8.84757 5.5 11.8849 5.5C14.9223 5.5 17.3849 7.96263 17.3849 11C17.3849 14.0374 14.9223 16.5 11.8849 16.5C8.84757 16.5 6.38495 14.0374 6.38495 11ZM8.44745 11C8.44745 12.8948 9.9902 14.4375 11.8849 14.4375C13.7797 14.4375 15.3224 12.8948 15.3224 11C15.3224 9.10388 13.7797 7.5625 11.8849 7.5625C9.9902 7.5625 8.44745 9.10388 8.44745 11Z"
                      fill="currentColor"
                    />
                    <circle
                      cx="17.7975"
                      cy="5.08737"
                      r="0.732875"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-col gap-3 font-bold">
              <li className="mb-3 text-lg font-extrabold text-black ">
                Quick Menu
              </li>
              <li>
                <Link
                  href="/"
                  className="inline-block transition hover:scale-110 hover:text-secondary">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="inline-block transition hover:scale-110 hover:text-secondary">
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/joinus"
                  className="inline-block transition hover:scale-110 hover:text-secondary">
                  Join Us
                </Link>
              </li>
              <li>
                <Link
                  href="/membership"
                  className="inline-block transition hover:scale-110 hover:text-secondary">
                  Membership
                </Link>
              </li>
              <li>
                <Link
                  href="/BOTM"
                  className="inline-block transition hover:scale-110 hover:text-secondary">
                  BOTM
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="inline-block transition hover:scale-110 hover:text-secondary">
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-block transition hover:scale-110 hover:text-secondary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-col gap-3 font-bold">
              <li className="mb-3 text-lg font-extrabold text-black ">
                Active City
              </li>
              {cities.map((city, i) => (
                <p
                  key={i}
                  className="transition-all duration-200 ease-linear hover:scale-110 hover:text-secondary">
                  {city}
                </p>
              ))}
            </ul>
          </div>

          {/* <div>
            <ul className="flex flex-col gap-3 font-bold">
              <li className="mb-3 text-lg font-extrabold text-black ">Legal</li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="inline-block transition hover:scale-110 hover:text-secondary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="inline-block transition hover:scale-110 hover:text-secondary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="inline-block transition hover:scale-110 hover:text-secondary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="inline-block transition hover:scale-110 hover:text-secondary">
                  Blog
                </Link>
              </li>
            </ul>
          </div> */}
          <div>
            <ul className="flex flex-col gap-3 font-bold">
              <li className="mb-3 text-lg font-extrabold text-black ">
                Information
              </li>
              <a className=" hover:text-secondary transition">
                bookstagrams321@gmail.com
              </a>

              <li>
                <a
                  href="tel:+(91) 9216512882"
                  className="inline-block transition hover:scale-110 hover:text-secondary">
                  +(91) 9216512882
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#FCF1F4] to-[#EDFBF9] py-5 ">
        <div className="container">
          <div className="items-center justify-between text-center font-bold md:flex">
            <div>
              Copyright© {new Date().getFullYear() + ' '}
              <Link
                href="/"
                className="hover:text-primary transition text-secondary">
                Bell Book & Candle Pvt. Ltd.
              </Link>
            </div>
            <div>
              Need help? Visit the{' '}
              <Link
                href="/contact"
                className="text-secondary transition hover:text-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
