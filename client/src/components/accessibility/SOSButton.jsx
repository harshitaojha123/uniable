export default function SOSButton({ onClick }) {
  return (
    <div className="mt-6 text-center">
      <button
        onClick={onClick}
        className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700"
      >
        🚨 EMERGENCY SOS
      </button>
    </div>
  );
}
