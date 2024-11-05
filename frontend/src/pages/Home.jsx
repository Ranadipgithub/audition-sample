import { motion } from "framer-motion";
import { CircuitBoard } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <main className="min-h-screen gradient-bg  flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <div className="flex items-center justify-center mb-8">
                    <CircuitBoard className="w-16 h-16 text-white animate-float" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    IEEE SB NIT DURGAPUR
                </h1>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                    IEEE is the world's largest professional association dedicated to advancing technological innovation and excellence for the benefit of humanity.
                </p>
                <Link
                    to="/audition"
                    className="glass-card px-8 py-4 text-lg font-semibold text-white rounded-full 
                   hover:bg-white hover:text-blue-600 transition-all duration-300
                   shadow-lg hover:shadow-xl"
                >
                    Register Now
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute bottom-8 text-blue-100 text-sm"
            >
                © {new Date().getFullYear()} IEEE Student Branch. All rights reserved.
            </motion.div>
        </main>
    );
}
