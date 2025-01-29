import React, { useEffect, useState } from "react";
import styles from "./squigglyLine.module.css";


const Sections = () => {
  const data = [
    { count: 2000, label: "Video Classes" },
    { count: 80000, label: "Questions" },
    { count: 2000, label: "Quizzes" },
    { count: 3000, label: "Study Materials" },
  ];

  return (
    <section className="z-20 relative pb-10 md:py-10 -mt-20 sm:-mt-[16vh] md:-mt-[22vh] text-white w-[100vw] font-instSansB">
      <section className={`w-full h-[15vh] md:h-[24vh] md:-mb-10 -mb-2 relative z-10 ${styles.topSquiggly}`} />
      <div className="bg-gradient-to-r relative z-20 bg-[#009A80] to-[#FFF5EF]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 px-6 py-8 pt-4 gap-3 lg:gap-6 text-center">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-1 relative text-xl lg:text-2xl bg-white px-1 lg:px-4 bg-opacity-65 shadow-md rounded-2xl py-8 text-gray-900"
            >
              <div className="mb">
                <Counter count={item.count} />
                <p className="">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Counter = ({ count }) => {
  const [displayCount, setDisplayCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.querySelector("#counter-" + count);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [count]);

  useEffect(() => {
    if (isVisible) {
      let currentCount = 0;
      const increment = Math.ceil(count / 50);

      const interval = setInterval(() => {
        currentCount += increment;
        if (currentCount >= count) {
          setDisplayCount(count);
          clearInterval(interval);
        } else {
          setDisplayCount(currentCount);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isVisible, count]);

  return (
    <h2 id={`counter-${count}`} className="text-3xl font-bold">
      {displayCount}+
    </h2>
  );
};

export default Sections;



      {/* <div
        className={`w-full h-[15vh] -mt-24 relative z-20  translate-y-3 ${styles.bottomSquiggly}`}
      /> */}