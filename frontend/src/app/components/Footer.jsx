export default function Footer() {
  return (
    <footer className="py-10 w-full sm:h-[40vh] bg-gray-50 font-jakarta">
      <div className="max-w-6xl mx-auto mt-6 px-6 sm:px-8 flex flex-col sm:flex-row gap-8 w-full text-gray-900">
        
        {/* Left Section */}
        <div className="sm:w-[30%] relative space-y-2 justify-between flex sm:flex-col">
          <div>
          <div className="mb-6 ">
          <img src="/logo.svg" className="h-[15px] mr-1 " alt="Logo" />
        </div>
          <p className="mt-1">+91 92031129421</p>
          <p className="mt-1">admin@jeeneetpulse.com</p>
          </div>

          <div className="flex flex-col sm:hidden absolute right-10 -top-2 sm:right-20">
          <div className="flex-col flex gap-6 ">
            <a href="#" aria-label="Instagram">
              <img src="/Instagram.svg" alt="Instagram" className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Facebook">
              <img src="/Facebook.svg" alt="Facebook" className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Twitter">
              <img src="/Twitter.svg" alt="Twitter" className="h-6 w-6" />
            </a>
          </div>
        </div>
       
        </div>

<div className="sm:w-[70%]  flex flex-col-reverse sm:flex-row gap-4 justify-between sm:justify-evenly -mt-1 ">
        <div>
        <h4 className="font-bold hidden sm:block  mb-2 text-lg">Links</h4>
        <ul className="sm:space-y-2 gap-3  sm:gap-6 flex sm:block font-jakarta">
            <li>Contact</li>
            <li>About Us</li>
            <li>Featured</li>
            <li>Courses</li>
          </ul>
        </div>

        {/* Links Section */}
        <div className="">
          <h4 className="font-bold hidden sm:block mb-2 text-lg">Links</h4>
          <ul className="sm:space-y-2 gap-3 flex sm:block">
            <li>Home</li>
            <li>Profile</li>
            <li>Log Out</li>
          </ul>
        </div>

        {/* Social Section */}
        <div className="hidden sm:block">
          <h4 className="font-bold mb-2 text-lg ">Social</h4>
          <div className="flex space-x-4 mt-2">
            <a href="#" aria-label="Instagram">
              <img src="/Instagram.svg" alt="Instagram" className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Facebook">
              <img src="/Facebook.svg" alt="Facebook" className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Twitter">
              <img src="/Twitter.svg" alt="Twitter" className="h-6 w-6" />
            </a>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}
