import React from 'react';
import SignupCard from '../CTA/SingUpCard';

type ReferralData = {
  referredAmount: number;
  referralsCount: number;
  totalEarned: number;
};

const referralData: ReferralData = {
  referredAmount: 5,  
  referralsCount: 12,  
  totalEarned: 60,     
};

const ReferAndEarn: React.FC = () => {
  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-left texct-black mb-12">
          <h2 className="text-4xl font-semibold">Refer & Earn</h2>
          <p className="mt-2 text-lg">Earn rewards by sharing your referral link.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl border-4 border-primary shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Your Referral Stats</h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center text-lg text-gray-700">
                <span>Referrals Made:</span>
                <span className="font-bold text-blue-500">{referralData.referralsCount}</span>
              </div>
              <div className="flex justify-between items-center text-lg text-gray-700">
                <span>Amount Earned:</span>
                <span className="font-bold text-green-500">${referralData.totalEarned}</span>
              </div>
              <div className="flex justify-between items-center text-lg text-gray-700">
                <span>Amount per Referral:</span>
                <span className="font-bold text-yellow-500">${referralData.referredAmount}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-xl border-4 border-primary">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 ">Referral Link</h3>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value="https://yourapp.com/referral/12345"
                readOnly
                className="flex-1 p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none"
              />
              <button
                className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
                onClick={() => navigator.clipboard.writeText("https://yourapp.com/referral/12345")}
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white p-8 rounded-xl border-4 border-primary shadow-xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">How It Works</h3>
          <div className="space-y-5">
            <div className="flex items-start space-x-4">
              <div className="text-2xl font-bold text-blue-500">1</div>
              <div>
                <p className="text-gray-700">
                  Share your referral link with your friends and family.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl font-bold text-blue-500">2</div>
              <div>
                <p className="text-gray-700">
                  Once they sign up using your link, you get rewarded.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl font-bold text-blue-500">3</div>
              <div>
                <p className="text-gray-700">
                  The more people you refer, the more you earn!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    <SignupCard/>
    </div>
  );
};

export default ReferAndEarn;
