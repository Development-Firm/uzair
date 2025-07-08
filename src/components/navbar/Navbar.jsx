import Link from "next/link";
import { useState } from "react";
import CloseIcon from "@/Icons/CloseIcon";
import MenuIcon from "@/Icons/MenuIcon";

const Navbar = ({ active, setActive }) => {
  const [toggle, setToggle] = useState(false);

  const navLinks = [
    { id: "home", title: "Home" },
    { id: "configurator", title: "Configurator" },
    { id: "visualization", title: "Visualization" },
    { id: "animation", title: "Animation" },
    { id: "contact", title: "Contact" },
  ];

  const handleSmoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className={`w-full flex items-center py-3 fixed z-30 ${
        active === "home" ? "bg-transparent" : "bg-black/80 backdrop-blur-md"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-4">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src="/assets/images/devfum/logo.png"
            alt="logo"
            className="object-contain w-28 md:w-32"
            id="Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.id ? "text-white underline" : "text-gradient"
              } hover:text-white text-[14px] font-medium cursor-pointer`}
              onClick={() => {
                setActive(nav.id);
                handleSmoothScroll(nav.id);
              }}
            >
              <a>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <div
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <CloseIcon /> : <MenuIcon />}
          </div>
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl card-gradient`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4 cursor-pointer">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins text-center font-medium cursor-pointer text-[16px] ${
                    active === nav.id ? "text-gradient" : "text-primary-foreground"
                  }`}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.id);
                    handleSmoothScroll(nav.id);
                  }}
                >
                  <a>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
