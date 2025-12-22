import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-400 to-indigo-300 text-white">
        <main className="flex flex-col items-center justify-center px-6 text-center min-h-[100vh]">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Welcome to UniAble
          </h1>

          <p className="mb-10 text-lg max-w-2xl text-blue-100">
            UniAble mainly builded for handdicapped students that helps to raise accessibility requests and problems that admins
            will manage and resolve them efficiently.
          </p>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-white text-blue-600 px-7 py-3 rounded-xl font-semibold hover:bg-blue-100 transition"
            >
              Get Started
            </Link>

            <Link
              to="/about"
              className="border border-white px-7 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Learn More
            </Link>
          </div>
        </main>
      </section>

      {/* WHY UNIABLE */}
      <section className="bg-gradient-to-r from-blue-300 to-indigo-400 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
            Why UniAble?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-14">
            Built with accessibility, simplicity, and campus inclusivity at its core.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-10 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition">
              <div className="text-4xl mb-4">♿</div>
              <h3 className="text-xl font-semibold mb-2">Inclusive Design</h3>
              <p className="text-gray-600">
                Designed specifically for students with diverse accessibility needs.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Fast Resolution</h3>
              <p className="text-gray-600">
                Admins can quickly review and resolve accessibility requests.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition">
              <div className="text-4xl mb-4">🏫</div>
              <h3 className="text-xl font-semibold mb-2">Campus-Friendly</h3>
              <p className="text-gray-600">
                Seamlessly integrates with existing university systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SMOOTH DIVIDER */}
     

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <h2 className="text-2xl font-bold text-white mb-3">UniAble</h2>
            <p className="text-sm text-gray-400">
              Empowering accessibility and inclusion for every student.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
              <li><Link to="/help" className="hover:text-blue-400">Help</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <p className="text-sm">📧 support@uniable.in</p>
            <p className="text-sm">📞 +91 98765 43210</p>
          </div>
        </div>

        <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
          © 2025 UniAble. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
