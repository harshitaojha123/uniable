export default function LocationCard({ data, admin, onToggle }) {
  return (
    <div className="border rounded p-4 flex justify-between">
      <div>
        <h4 className="font-semibold">{data.place}</h4>
        <p className="text-sm text-gray-600">
          {data.type} – {data.description}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Reported by: {data.reportedBy}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {admin ? (
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={data.resolved}
              onChange={() => onToggle(data.id)}
            />
            {data.resolved ? "Fixed" : "Pending"}
          </label>
        ) : (
          <span
            className={`text-sm ${
              data.resolved
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {data.resolved ? "Accessible" : "Issue"}
          </span>
        )}
      </div>
    </div>
  );
}
