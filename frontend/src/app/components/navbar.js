"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";


const Navbar = () => {
  const pathname = usePathname();
  const [user_id, setUserId] = useState(null);
  const { isAuthenticated, userDetails } = useAuthentication();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isRotated, setIsRotated] = useState(false);
  const navbarRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    gsap.from(navbarRef.current, {
      y: -60,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
    });

    gsap.from(linksRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
    });
  }, []);

  const menuRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);

    if (menuRef.current) {
      gsap.set(menuRef.current, {
        opacity: 0,
        y: -20,
        maxHeight: 0,
        visibility: "hidden",
      });

      if (menuOpen) {
        gsap.to(menuRef.current, {
          opacity: 1,
          y: 0,
          maxHeight: 600,
          visibility: "visible",
          duration: 0.2,
          ease: "power3.out",
        });
      } else {
        gsap.to(menuRef.current, {
          opacity: 0,
          y: -20,
          maxHeight: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(menuRef.current, { visibility: "hidden" });
          },
        });
      }
    }
  }, [menuOpen]);



  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user_id");
      setUserId(storedUserId);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
  };

  const isTestPage = pathname.startsWith("/tests/custom/exams/");

  if (isTestPage) return null;

  return (
    <>
      <nav
        ref={navbarRef}
        className="font-jakarta border-b sticky top-0 border-b-gray-400 shadow-sm backdrop-blur-2xl z-50 bg-opacity-5 transition-all duration-300 font-medium items-center pt-4 mx-auto py-5 bg-white w-screen"
      >
        <div className="flex flex-row max-w-7xl px-3 pr-5 md:px-6 items-center justify-between gap-14 mx-auto">
          <div
            className="basis-auto flex lg:hidden mr-4"
            onClick={() => {
              setMenuOpen(!menuOpen);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img src="/menu.png" className="h-[25px]" alt="Menu" />
          </div>

          <div className="flex">
            <img src="/logo.svg" className="h-[12px] mr-5  mt-2" alt="Logo" />
          </div>

          <div className="hidden text-sm uppercase font-instSansB text-black lg:flex gap-4 items-center mt-2">
            {[
              "Home",
              "Student Portal",
              "Courses",
              "Featured",
              "About",
              "Contact",
            ].map((text, index) => (
              <Link
                key={index}
                href={`/${text
                  .toLowerCase()
                  .replace(/\s/g, "-")
                  .replace(/home/g, "/")}`}
                passHref
              >
                <div
                  ref={(el) => (linksRef.current[index] = el)}
                  className="hover:text-teal-800 px-3 p-1 rounded-full"
                >
                  {text}
                </div>
              </Link>
            ))}

            <div
              className="flex items-center space-x-4 font-semibold"
              ref={(el) => (linksRef.current[6] = el)}
            >
              {!isAuthenticated ? (
                <Link href="/signin" passHref>
                  <button className="border border-black font-instSansB py-2 px-4 uppercase rounded-md hover:rounded-2xl transition-all duration-300">
                    Sign In
                  </button>
                </Link>
              ) : (
                <div className="relative">
                  <div
                    className="flex items-center gap-2 bg py-2 font-instSansB  cursor-pointer transition-transform duration-150 ease-in-out active:scale-95"
                    onClick={() => {
                      setDropdownOpen(!dropdownOpen);
                      setIsRotated(!isRotated);
                    }}
                  >
                    {userDetails?.name}
                    <span
                      className={`transform ${isRotated ? "rotate-180" : ""}`}
                    >
                      {/* Down arrow icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        className="transition-transform duration-300"
                      >
                        <path
                          d="M7 10l5 5 5-5z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </span>
                  </div>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-10"
                      ref={dropdownRef}
                    >
                      <ul className="text-sm text-gray-800">
                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                          <Link href={`/profile/${user_id}`}>Profile</Link>
                        </li>
                        <Link href={`/`}>
                        <button
                          onClick={() => {
                            handleLogout();
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          SIGN OUT
                        </button>
                      </Link>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isMounted && menuOpen && (
        <div
          ref={menuRef}
          className="transition-all lg:hidden bg-teal-900 duration-300 ease-in-out overflow-hidden"
        >
          <div className="text-white pt-2 font-inter">
            <ul className="flex flex-col text-lg font-instSansB pl-6 uppercase font-bold">
              <li className="border-b mb-4 hover:translate-x-4 transition-all py-1 mt-4">
                <a href="/">Home</a>
              </li>
              <li className="border-b mb-4 hover:translate-x-4 transition-all py-1">
                <a href="/student-portal">Student Portal</a>
              </li>
              <li className="border-b mb-4 hover:translate-x-4 transition-all py-1">
                <a href="/courses">Courses</a>
              </li>
              <li className="border-b mb-4 hover:translate-x-4 transition-all py-1">
                <a href="/featured">Featured</a>
              </li>
              <li className="border-b mb-4 hover:translate-x-4 transition-all py-1">
                <a href="/about">About</a>
              </li>
              <li className="border-b mb-4 hover:translate-x-4 transition-all py-1">
                <a href="/contact">Contact</a>
              </li>
              <li className="border-b mb-4 hover:translate-x-4 transition-all py-1">
                <a href="/signin">Sign In</a>
              </li>
              <li className="border-b mb-4 hover:translate-x-4 transition-all py-1">
                <a href="/signup">Register</a>
              </li>
              <li className="pb-2 mb-4">
                <a href="/profile">Profile</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
