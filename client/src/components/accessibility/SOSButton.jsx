import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";

export default function SOSButton({ onClick }) {
  return (
    <div className="flex justify-center">

      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 0px rgba(239,68,68,0.5)",
            "0 0 25px rgba(239,68,68,0.8)",
            "0 0 0px rgba(239,68,68,0.5)",
          ],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-red-700 px-10 py-5 text-white shadow-2xl"
      >
        {/* Shimmer Effect */}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2.5s_infinite]" />

        <div className="relative flex items-center gap-4">

          <div className="rounded-full bg-white/20 p-3">
            <ShieldAlert size={30} />
          </div>

          <div className="text-left">

            <p className="text-xs uppercase tracking-widest opacity-90">
              Emergency
            </p>

            <h2 className="text-xl font-black">
              SEND SOS ALERT
            </h2>

          </div>

        </div>
      </motion.button>

    </div>
  );
}