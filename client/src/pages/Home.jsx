import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Accessibility,
  Bot,
  MapPinned,
  ShieldAlert,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Accessibility,
    title: "Accessibility Requests",
    desc: "Submit and track accessibility issues with ease.",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    desc: "Get instant help using our intelligent accessibility assistant.",
  },
  {
    icon: MapPinned,
    title: "Campus Navigation",
    desc: "Locate accessible paths, ramps, elevators and facilities.",
  },
  {
    icon: ShieldAlert,
    title: "Emergency SOS",
    desc: "Instantly notify administrators during emergencies.",
  },
];

export default function Home() {
  return (
    <div className="bg-slate-50">

      {/* ---------------- Hero ---------------- */}

      <section className="relative overflow-hidden min-h-screen flex items-center">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"></div>

        <div className="absolute -top-25 -left-24 w-96 h-96 rounded-full bg-blue-400/30 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-400/20 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm">
              ♿ Smart Accessibility Platform
            </span>

            <h1 className="mt-6 text-6xl lg:text-7xl font-black text-white leading-tight">
              Making Every Campus
              <span className="block text-cyan-300">
                Accessible
              </span>
            </h1>

            <p className="mt-8 text-xl text-blue-100 leading-9 max-w-xl">
              UniAble empowers differently-abled students with AI assistance,
              campus accessibility, SOS support and a streamlined way to
              communicate with university administrators.
            </p>

            <div className="flex gap-5 mt-10">

              <Link
                to="/login"
                className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition flex items-center gap-2"
              >
                Get Started
                <ArrowRight size={20} />
              </Link>

              <button className="border border-white text-white px-8 py-4 rounded-2xl hover:bg-white hover:text-blue-700 transition">
                Learn More
              </button>

            </div>

            <div className="grid grid-cols-3 gap-8 mt-16">

              <div>
                <h2 className="text-4xl font-bold text-white">500+</h2>
                <p className="text-blue-200">Students</p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-white">50+</h2>
                <p className="text-blue-200">Campuses</p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-white">24/7</h2>
                <p className="text-blue-200">Support</p>
              </div>

            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8 }}
            className="flex justify-center"
          >

            <div className="glass p-10 w-full max-w-md">

              <img
                src="https://www.precisionhcc.com/wp-content/uploads/2024/07/people-with-different-disabilities-waving-hand.png"
                alt="Accessibility"
                className="rounded-xl"
              />

            </div>

          </motion.div>

        </div>

      </section>

      {/* ---------------- Features ---------------- */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-8">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-black">
              Everything You Need
            </h2>

            <p className="text-gray-500 mt-4 text-lg">
              Built to make campus life inclusive, safe and accessible.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="glass p-8 rounded-3xl"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white mb-6">
                    <Icon size={30} />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-600">
                    {item.desc}
                  </p>

                </motion.div>
              );
            })}

          </div>

        </div>

      </section>

      {/* ---------------- Why Choose ---------------- */}

      <section className="py-20 bg-white">

        <div className="max-w-6xl mx-auto px-8">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <h2 className="text-5xl font-black mb-8">
                Why Choose UniAble?
              </h2>

              {[
                "AI-powered accessibility support",
                "Real-time request management",
                "Emergency SOS",
                "Accessible campus navigation",
                "Inclusive student experience",
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-center gap-4 mb-5"
                >
                  <CheckCircle className="text-green-500" />

                  <span className="text-lg">{text}</span>

                </div>
              ))}

            </div>

            <div className="glass p-10 rounded-3xl">

              <h3 className="text-3xl font-bold mb-8">
                Our Mission
              </h3>

              <p className="text-gray-600 leading-8">
                We believe every student deserves equal access to education,
                infrastructure and opportunities. UniAble bridges the gap
                between students and administrators through technology.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ---------------- Footer ---------------- */}

      <footer className="bg-slate-900 text-gray-300 py-12">

        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between gap-10">

          <div>

            <h2 className="text-3xl font-black text-white">
              UniAble
            </h2>

            <p className="mt-4 max-w-md text-gray-400">
              Empowering every student through accessibility, technology
              and innovation.
            </p>

          </div>

          <div>

            <h3 className="font-bold text-white mb-4">
              Contact
            </h3>

            <p>support@uniable.in</p>

            <p>+919555710961</p>

          </div>

        </div>

        <div className="text-center text-gray-500 mt-12">
          © 2026 UniAble. All Rights Reserved.
        </div>

      </footer>

    </div>
  );
}