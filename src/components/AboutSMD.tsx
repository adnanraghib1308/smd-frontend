import { motion } from "framer-motion";

export default function AboutSuprMommyDaddy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-3xl mt-5 mx-auto bg-gradient-to-r from-pink-50 to-purple-100 shadow-xl rounded-3xl p-4 text-gray-900"
    >
      {/* Who We Are */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center text-pink-600 mb-4"
      >
        🌟 Who We Are
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="text-md text-gray-700 text-left leading-relaxed"
      >
        <strong>Supr Mommy Daddy</strong> is a **community** where parents can celebrate and nurture their little ones. We provide **expert-backed
        parenting tips**, fun activities, exciting contests, and a **supportive network** of parents sharing their experiences.
      </motion.p>

      {/* Our Mission */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-8 p-6 bg-white shadow-md rounded-xl"
      >
        <h3 className="text-xl font-semibold text-purple-700">🎯 Our Mission</h3>
        <p className="text-gray-700 text-left mt-2">
          We empower parents to **celebrate parenthood** through **informative content, interactive challenges, and baby contests.** Every child is
          unique, and we ensure every milestone is **extra special.** 💕
        </p>
      </motion.div>

      {/* What We Offer */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-8 p-6 bg-white shadow-md rounded-xl"
      >
        <h3 className="text-xl font-semibold text-pink-600 text-center">💡 What We Offer</h3>
        <ul className="mt-4 space-y-3 text-gray-700 text-left">
          <li>
            ✅ <strong>Parenting Insights:</strong> Expert advice on baby care, development & hacks.
          </li>
          <li>
            ✅ <strong>Fun & Learning:</strong> DIY activities & early learning techniques.
          </li>
          <li>
            ✅ <strong>Exciting Contests:</strong> Show off your baby’s charm & win prizes. 🏆
          </li>
          <li>
            ✅ <strong>Community Support:</strong> A safe space for parents to share & connect.
          </li>
          <li>
            ✅ <strong>Bedtime Stories:</strong> Heartwarming tales for magical bedtime moments. ✨
          </li>
        </ul>
      </motion.div>

      {/* Our Baby Contests */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-8 p-6 bg-white shadow-md rounded-xl"
      >
        <h3 className="text-xl font-semibold text-yellow-600 text-center">🏆 Our Baby Contests</h3>
        <p className="text-gray-700 text-left mt-2">
          We’ve completed **multiple successful seasons** of our **Online Baby Contest** with overwhelming participation! It’s not just about
          prizes—it’s about **capturing precious memories** & celebrating your baby’s uniqueness. 👶🎉
        </p>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 flex flex-col items-center"
      >
        <p className="text-gray-800 font-semibold text-lg text-center">📢 Join our parenting community today!</p>
        <div className="mt-3 flex gap-4">
          <a
            href="https://instagram.com/suprmommydaddy"
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full shadow-lg text-md font-semibold transition-transform transform hover:scale-105"
          >
            📷 Instagram
          </a>
          <a
            href="https://facebook.com/suprmommydaddy"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-lg text-md font-semibold transition-transform transform hover:scale-105"
          >
            👍 Facebook
          </a>
        </div>
      </motion.div>

      {/* Hashtags */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center text-gray-600 text-sm mt-6"
      >
        #ParentingWithLove #SuprMommyDaddy #HappyParenting
      </motion.p>
    </motion.div>
  );
}
