import React from 'react';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Football Dashboard</h1>
        <p className="text-gray-700 text-lg leading-relaxed text-center mb-6">
          Welcome to the Football Dashboard! Stay updated with the latest news, match schedules, and player performances.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 transition">
            <h2 className="text-xl font-semibold">Upcoming Matches</h2>
            <p className="text-sm">Check out the schedule for the next big matches and never miss a game!</p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-lg shadow hover:bg-red-600 transition">
            <h2 className="text-xl font-semibold">Team News</h2>
            <p className="text-sm">Get the latest updates and news about your favorite teams.</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow hover:bg-yellow-600 transition">
            <h2 className="text-xl font-semibold">Player Stats</h2>
            <p className="text-sm">View detailed statistics of your favorite players and their recent performances.</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow hover:bg-green-600 transition">
            <h2 className="text-xl font-semibold">League Standings</h2>
            <p className="text-sm">Check the latest standings and see how your team ranks in the league.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
