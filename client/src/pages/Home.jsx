
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
    desc: "Notify administrators during emergencies.",
  },
];

const benefits = [
  "AI-powered accessibility support",
  "Real-time request management",
  "Emergency SOS",
  "Accessible campus navigation",
  "Inclusive student experience",
];

export default function Home() {
  const learnMore = () => {
    document.getElementById("learn-more")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />

        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-400/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur-md">
              Smart Accessibility Platform
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
              Making Every Campus
              <span className="block text-cyan-300">
                Accessible
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-9 text-blue-100 sm:text-xl">
              UniAble empowers students with AI assistance, campus
              accessibility, SOS support, and a streamlined way to
              communicate with university administrators.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-bold text-blue-700 shadow-xl transition hover:scale-105"
              >
                Get Started
                <ArrowRight size={20} />
              </Link>

              <button
                type="button"
                onClick={learnMore}
                className="rounded-2xl border border-white px-8 py-4 text-white transition hover:bg-white hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
              >
                Learn More
              </button>
            </div>

            {/* Statistics */}
            <div className="mt-16 grid grid-cols-3 gap-6 sm:gap-8">
              <div>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  500+
                </h2>
                <p className="text-blue-200">Students</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  50+
                </h2>
                <p className="text-blue-200">Campuses</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  24/7
                </h2>
                <p className="text-blue-200">Support</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="glass w-full max-w-md rounded-3xl p-6 sm:p-10">
              <img
                src="https://www.precisionhcc.com/wp-content/uploads/2024/07/people-with-different-disabilities-waving-hand.png"
                alt="People representing an inclusive and accessible community"
                className="w-full rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learn More Section */}
      <section
        id="learn-more"
        className="scroll-mt-8 bg-white px-6 py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Discover UniAble
            </span>

            <h2 className="mt-6 text-3xl font-black text-gray-900 sm:text-4xl">
              Making Campuses Accessible for Everyone
            </h2>

            <p className="mx-auto mb-12 mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              UniAble is an accessibility platform designed to help
              students navigate campus facilities, use inclusive
              digital tools, report accessibility barriers, and
              access support when they need it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-3">
            {[
              {
                title: "Campus Accessibility",
                description:
                  "Discover campus locations and identify accessibility barriers through location-based reports.",
                color: "bg-blue-50",
                headingColor: "text-blue-700",
              },
              {
                title: "Inclusive Tools",
                description:
                  "Use text-to-speech, speech-to-text, adjustable fonts, and visual settings for a more accessible experience.",
                color: "bg-indigo-50",
                headingColor: "text-indigo-700",
              },
              {
                title: "Support and Safety",
                description:
                  "Access the AI assistant, report campus issues, and use available SOS features for assistance.",
                color: "bg-purple-50",
                headingColor: "text-purple-700",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className={`rounded-2xl p-7 ${item.color}`}
              >
                <h3
                  className={`mb-3 text-xl font-bold ${item.headingColor}`}
                >
                  {item.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <Link
            to="/login"
            className="mt-12 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Explore UniAble
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black sm:text-5xl">
              Everything You Need
            </h2>

            <p className="mt-4 text-lg text-gray-500">
              Built to make campus life inclusive, safe and accessible.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="glass rounded-3xl p-8"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <Icon size={30} />
                  </div>

                  <h3 className="mb-3 text-2xl font-bold">
                    {item.title}
                  </h3>

                  <p className="leading-7 text-gray-600">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose UniAble */}
      <section className="bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-8 text-4xl font-black sm:text-5xl">
                Why Choose UniAble?
              </h2>

              <div className="space-y-5">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle
                      size={24}
                      className="mt-1 shrink-0 text-green-500"
                      aria-hidden="true"
                    />

                    <span className="text-lg text-gray-700">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-8 sm:p-10">
              <h3 className="mb-6 text-3xl font-bold">
                Our Mission
              </h3>

              <p className="leading-8 text-gray-600">
                We believe every student deserves equal access to
                education, infrastructure, and opportunities.
                UniAble aims to bridge the gap between students
                and administrators through technology and inclusive
                design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 px-6 py-12 text-gray-300">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row">
          <div>
            <h2 className="text-3xl font-black text-white">
              UniAble
            </h2>

            <p className="mt-4 max-w-md leading-7 text-gray-400">
              Empowering every student through accessibility,
              technology, and innovation.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-bold text-white">Contact</h3>

            <p>support@uniable.in</p>
            <p className="mt-2">+919555710961</p>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} UniAble. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
