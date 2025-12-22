import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* CONTENT */}
      <div className="flex-grow p-6 max-w-7xl mx-auto w-full">

        {/* Welcome Section */}
        <div className="mb-10 rounded-2xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Student Dashboard
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Welcome to <span className="font-semibold text-blue-600">UniAble</span>.  
            This space is designed to support you in navigating campus life with
            confidence. Customize your accessibility settings, request help when
            needed, and stay informed about your support status—all in one place.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-3">

          {/* Accessibility Settings */}
          <div className="rounded-2xl bg-white p-8 shadow hover:shadow-xl transition">
            <h2 className="mb-3 text-xl font-semibold text-gray-800">
              Accessibility Settings
            </h2>
            <p className="text-gray-600 mb-5">
              Personalize your experience to match your accessibility needs and
              preferences.
            </p>
            <ul className="text-sm text-gray-500 space-y-2 list-disc list-inside">
              <li>Adjust text size and color contrast</li>
              <li>Enable speech-to-text and text-to-speech</li>
              <li>Use dyslexia-friendly reading options</li>
            </ul>
          </div>

          {/* Request Help */}
          <div className="rounded-2xl bg-white p-8 shadow hover:shadow-xl transition">
            <h2 className="mb-3 text-xl font-semibold text-gray-800">
              Request Help
            </h2>
            <p className="text-gray-600 mb-5">
              Raise a request whenever you need academic or physical assistance
              on campus.
            </p>
            <ul className="text-sm text-gray-500 space-y-2 list-disc list-inside">
              <li>Wheelchair and mobility support</li>
              <li>Reader or note-taking assistance</li>
              <li>Short-term or emergency accessibility help</li>
            </ul>
          </div>

          {/* Support & Guidance */}
          <div className="rounded-2xl bg-white p-8 shadow hover:shadow-xl transition">
            <h2 className="mb-3 text-xl font-semibold text-gray-800">
              Support & Guidance
            </h2>
            <p className="text-gray-600 mb-5">
              Stay informed and get guidance throughout your journey at the
              university.
            </p>
            <ul className="text-sm text-gray-500 space-y-2 list-disc list-inside">
              <li>Chat with the AI Assistant for quick help</li>
              <li>Track submitted requests and their status</li>
              <li>View resolved and pending support actions</li>
            </ul>
          </div>

        </div>

        {/* Info / Tip Section */}
        <div className="mt-12 rounded-2xl bg-blue-50 p-6 text-blue-800">
          <p className="font-semibold mb-1">💡 Helpful Tip</p>
          <p className="text-sm">
            If you ever feel stuck or need immediate assistance, use the
            <span className="font-medium"> Emergency Accessibility Mode</span>.
            Your alert will be instantly sent to the admin team for quick action.
          </p>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold text-lg">UniAble</h3>
            <p className="text-sm">
              Building inclusive and accessible campus experiences.
            </p>
          </div>

          <div className="text-sm text-center md:text-right">
            © 2025 UniAble. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
