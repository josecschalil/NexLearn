import React from 'react';
import Link from 'next/link';

const InfoCard = ({ title, description, icon, buttonText, link }) => {
  return (
    <Link href={link}>
    <div
      className={`flex transition-all duration-100 hover:shadow hover:border-gray-500 rounded-2xl items-center justify-between p-4 border border-gray-300 mb-4`}
    >
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 bg-none flex items-center justify-center rounded-full">
          <span role="img" aria-label="icon" className="text-2xl">
            {icon}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-bold font-inter text-gray-800">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
     
          <button className="px-4 hidden sm:block py-2 w-20 border border-teal-900 transition-all duration-100 rounded-full hover:bg-teal-800 hover:text-white text-sm">
            {buttonText}
          </button>
       
      </div>
    </div>
    </Link>
  );
};

export default InfoCard;