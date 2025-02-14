"use client";

import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-teal-900 text-white py-20 text-center px-4">
        <h1 className="text-4xl font-bold mb-4 font-instSansB">
        ©  JEENEETPULSE 
        
        </h1>
        <p className="text-lg font-medium max-w-3xl mx-auto">
          The ultimate platform  for aspiring students preparing for JEE and
          NEET. Test your skills, practice questions, and watch expert-led
          classes.
        </p>
      </div>

      <section className="py-16 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid  gap-8">
    

            <div className="">
              <h3 className="text-3xl font-bold text-teal-900 mb-4 font-instSansB">
                Who We Are
              </h3>
              <p className="text-gray-900">
                Jeeneetpulse is a leading platform dedicated to helping students
                excel in competitive exams like JEE and NEET. Our mission is to
                provide high-quality resources, expert guidance, and an
                intuitive learning experience and some other stuff.
                Jeeneetpulse is a leading platform dedicated to helping students
                excel in competitive exams like JEE and NEET. Our mission is to
                provide high-quality resources, expert guidance, and an
                intuitive learning experience and some other stuff. 
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold  text-teal-900 mb-4 font-instSansB">
                Our Vision
              </h3>
              <p className="text-gray-900 ">
                Our vision is to transform how students prepare for their exams
                by integrating technology, personalized learning, and expert
                resources. We aspire to be the one-stop solution for all
                academic needs, fostering success and confidence in our
                learners. Jeeneetpulse is a leading platform dedicated to helping students
                excel in competitive exams like JEE and NEET. Our mission is to
                provide high-quality resources, expert guidance, and an
                intuitive learning experience and some other stuff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      {/* <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center font-instSansB">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description:
                  "We are dedicated to providing the highest quality content for your success.",
              },
              {
                title: "Innovation",
                description:
                  "We strive to make learning accessible and engaging through innovative methods.",
              },
              {
                title: "Commitment",
                description:
                  "Our mission is to ensure students achieve their academic dreams.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-b-4 rounded-b-md border-teal-900  p-6 text-center"
              >
                <h3 className="text-xl font-bold text-teal-900 mb-4 font-instSansB">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features  */}
      <section className="py-6 md:py-16 bg-gray-100 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex  mb-8 gap-3 md:gap-6">
            <div className="flex-1 h-[1px] bg-green-900 rounded-full mt-4"></div>
            <h2 className="text-3xl font-bold text-gray-800  font-instSansB">
              What We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3  md:gap-16">
            {[
              {
                image: "/test-prep.svg", // Replace with your image paths
                title: "Test Preparation",
                description:
                  "Prepare for your exams with our extensive question bank, designed to simulate real test conditions. Dive into a wide range of questions across multiple difficulty levels and subjects, tailored to JEE and NEET. Each question is accompanied by detailed solutions to enhance your understanding. Track your performance and pinpoint areas for improvement with advanced analytics.",
              },
              {
                image: "/classes.svg",
                title: "Expert-Led Classes",
                description:
                  "Learn from the best instructors in the field through interactive, on-demand classes. Our videos cover concepts in-depth, making even the most challenging topics easy to grasp. Stay engaged with clear explanations, real-life examples, and tips for exam success. Whether you're studying at your own pace or following a structured plan, our classes are built to support you.",
              },
              {
                image: "/progress.svg",
                title: "Progress Tracking",
                description:
                  "Monitor your academic journey with our comprehensive progress tracking tools. Get detailed insights into your strengths and areas needing improvement. Visualize your growth with performance graphs and compare yourself to peers. Regular feedback and adaptive recommendations ensure that you stay on the path to success.",
              },
            ].map((feature, index) => (
              <div key={index} className=" py-6 text-justify font-instSansN">
                <h3 className="text-xl font-bold text-teal-900 mb-4 font-instSansB">
                  {feature.title}
                </h3>
                <p className="text-gray-900">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="pb-6 md:py-16 bg-gray-100 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex mb-8 gap-2 md:gap-6">
            <h2 className="text-3xl font-bold text-gray-800 font-instSansB">
              How It Works
            </h2>
            <div className="flex-1 h-[1px] bg-green-900 rounded-full mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-16">
            {[
              {
                image: "/register.svg", // Replace with your image paths
                title: "Register",
                description:
                  "Sign up on our platform to gain access to a world of resources. Create a personalized profile and select your target exam to get started.",
              },
              {
                image: "/learn.svg",
                title: "Learn & Practice",
                description:
                  "Dive into expert-led classes, practice questions, and in-depth materials. Track your progress and enhance your understanding through interactive tools.",
              },
              {
                image: "/test.svg",
                title: "Take Tests",
                description:
                  "Simulate real test environments with our adaptive test series. Identify your strengths and work on your weaknesses to stay ahead.",
              },
            ].map((step, index) => (
              <div key={index} className="py-3 md:py-6 text-justify font-instSansN">
                <h3 className="text-xl font-bold text-teal-900 mb-4 font-instSansB">
                  {step.title}
                </h3>
                <p className="text-gray-900">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white font-instSansB px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center fo">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                image: "/boy.png",
                name: "John Doe",
                role: "CEO",
              },
              {
                image: "/boy.png",
                name: "Jane Smith",
                role: "Lead Instructor",
              },
              {
                image: "/boy.png",
                name: "Alice John",
                role: "Content Strategist",
              },
              {
                image: "/boy.png",
                name: "Bob Brown",
                role: "Technical Lead",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 border-b-gray-300 border hover:border-gray-600 transition-all duration-200 hover:shadow-md rounded-2xl p-6 text-center"
              >
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-teal-900">
                  {member.name}
                </h3>
                <p className="text-gray-600 font-jakarta">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-teal-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4 font-instSansB">Join Jeeneetpulse Today!</h2>
        <p className="mb-8">
          Transform your preparation journey with expert guidance and tools.
        </p>
        <Link href={`/`}>
        <button className="py-2 px-4  bg-white text-black font-bold rounded-lg shadow-md ">
          Get Started
        </button>
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;
