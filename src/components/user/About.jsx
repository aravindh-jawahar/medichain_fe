import React from "react";
import { ArrowDownRight } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { label: "Patients treated with care", value: 300000, suffix: "+" },
  { label: "Positive recovery", value: 99, suffix: "%+" },
  { label: "Certified professionals", value: 630, suffix: "+" },
  { label: "Active support", value: 24, suffix: "/7" },
  { label: "Specialized services", value: 150, suffix: "+" },
  { label: "Years of experience", value: 15, suffix: "+" },
];
const About = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-5 md:py-20 bg-white text-gray-800 max-w-7xl">
      <div className="text-6xl font-extrabold !text-[#057c8b] text-center px-6 py-2">
        About us
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-20 px-4 sm:px-8 lg:px-10 py-16">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/about_us.jpg"
            alt="Medical Team"
            className="rounded-xl shadow-lg w-full max-w-[500px] md:max-w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2">
          <p className="text-xl sm:text-3xl lg:text-4xl font-bold leading-snug text-left">
            We provide comprehensive detailed healthcare solutions from experts
            in Medical support, diagnostics, and patient care run smoothly and
            efficiently and managing tasks & clinical support.
          </p>
        </div>
      </div>

      <div
        ref={ref}
        className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center px-3"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-start text-start border border-gray-200 rounded-lg p-5"
          >
            <ArrowDownRight />
            <p className="text-xl sm:text-2xl font-semibold">
              {inView ? (
                <CountUp
                  end={stat.value}
                  duration={2}
                  separator=","
                  suffix={stat.suffix}
                />
              ) : (
                stat.suffix
              )}
            </p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
