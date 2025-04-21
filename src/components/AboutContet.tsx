import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function BabyContestCard({ contestId, contestName }) {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 text-gray-800">
      <h2 className="text-3xl font-bold text-pink-600">🌟 Supr Mommy Daddy Presents</h2>
      <h3 className="text-2xl font-semibold text-purple-700 mt-2">The Ultimate Online Baby Contest - Season 5! 🎉</h3>

      <p className="text-md text-gray-700 mt-4">
        After three heartwarming and successful seasons, we’re back with an even bigger and more exciting <strong>Season 5!</strong> ✨👶 Your little
        star now has another chance to shine and win amazing prizes! 🎁
      </p>

      {/* Important Dates */}
      <div className="mt-6 p-4 bg-pink-100 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold text-purple-700">📅 Important Dates</h4>
        <ul className="text-gray-700 mt-2 space-y-1 text-left">
          <li>
            📌 <strong>Registration Opens:</strong> 21st April, 8 AM ⏳
          </li>
          <li>
            📌 <strong>Registration Closes:</strong> 25th April, 8 PM ❌
          </li>
          <li>
            📌 <strong>Voting Begins:</strong> 25th April, 8 PM 🗳️
          </li>
          <li>
            📌 <strong>Voting Ends:</strong> 27th April, 8 PM 🚨
          </li>
          <li>
            📌 <strong>Results Announcement:</strong> 28th April 🎊
          </li>
        </ul>
      </div>

      {/* How to Participate */}
      <div className="mt-6 p-4 bg-pink-100 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold text-pink-600">✅ How to Participate?</h4>
        <ol className="list-decimal list-inside text-gray-700 mt-2 space-y-1 text-left">
          <li>Tap on “Join Contest” button to visit the participation form.</li>
          <li>Upload the cutest photo of your little star. 🌟</li>
          <li>Fill in the required details and submit your entry.</li>
          <li>Share your baby’s voting link with friends & family once voting begins.</li>
          <li>Post it on social media to gather maximum votes! 📢</li>
          <li>The more you share, the higher your chances of winning! 🏆</li>
        </ol>
      </div>

      {/* Social Media & CTA */}
      <div className="mt-6">
        <p className="text-gray-800 font-semibold text-md">For details or clarification, DM us on Instagram!</p>
        <a href="https://instagram.com/suprmommydaddy" className="mt-2 text-pink-600 hover:text-pink-700 font-semibold block">
          📷 Follow us on Instagram: @suprmommydaddy
        </a>
      </div>

      {/* Call to Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-4">
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full shadow-lg text-lg w-full md:w-auto"
          onClick={() => {
            if (!contestId || !contestName) {
              toast.error("No ongoing contest right now. Check previous contest!!");
              return;
            }
            navigate(`/submit?contestId=${contestId}&contestName=${contestName}`);
          }}
        >
          Participate Now
        </button>
      </div>

      <p className="text-gray-600 text-sm mt-6">#BabyContest #CutestBaby #WinExcitingPrizes #SuprMommyDaddy</p>
    </div>
  );
}
