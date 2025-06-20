import React from "react";
import {
  ArrowDownRight,
  HeartHandshake,
  Microscope,
  Plus,
  Activity,
} from "lucide-react";
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
            We offer end-to-end AI-powered healthcare solutions, combining
            technology and human expertise to deliver seamless medical support.
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

      {/* Benefits Grid Section */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-3">
        <div className="flex flex-col items-start gap-3 p-6 rounded-xl border border-gray-200 shadow-sm bg-white">
          <div className="w-10 h-10 bg-[#057c8b] text-white rounded-lg flex items-center justify-center shadow">
            <HeartHandshake className="text-white" />
          </div>
          <h3 className="text-lg font-semibold">Support & care</h3>
          <p className="text-sm text-gray-600">
            Personalized healthcare services delivered with empathy & dedication
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 p-6 rounded-xl border border-gray-200 shadow-sm bg-white">
          <div className="w-10 h-10 bg-[#057c8b] text-white rounded-lg flex items-center justify-center shadow">
            <Microscope className="text-white" />
          </div>
          <h3 className="text-lg font-semibold">Cutting-edge innovation</h3>
          <p className="text-sm text-gray-600">
            Advanced treatments powered by modern technology and experts
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 p-6 rounded-xl border border-gray-200 shadow-sm bg-white">
          <div className="w-10 h-10 bg-[#057c8b] text-white rounded-lg flex items-center justify-center shadow">
            <Plus className="text-white" />
          </div>
          <h3 className="text-lg font-semibold">Reliable expertise</h3>
          <p className="text-sm text-gray-600">
            Work with qualified specialists who understand your healthcare
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 p-6 rounded-xl border border-gray-200 shadow-sm bg-white">
          <div className="w-10 h-10 bg-[#057c8b] text-white rounded-lg flex items-center justify-center shadow">
            <Activity className="text-white" />
          </div>
          <h3 className="text-lg font-semibold">Seamless support</h3>
          <p className="text-sm text-gray-600">
            First visit to follow-up care, we make every step smooth and
            stress-free
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
