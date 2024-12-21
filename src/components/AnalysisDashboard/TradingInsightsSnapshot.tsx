// @ts-nocheck

const TradingInsightsSnapshot = () => {
  return (
    <div className="p-6 space-y-4">
      {/* Emotional Control */}
      <div className="bg-white p-4 border rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-red-500">Emotional Control (Reactive Trading)</h3>
        <p className="mt-2 text-gray-700">
          <strong>Key Issue:</strong> You're trading reactively, especially after losses, which is often driven by emotions like fear or frustration. 
        </p>
        <p className="mt-2 text-gray-700">
          <strong>Why it's Crucial:</strong> Reactive trading leads to impulsive decisions, increased risks, and bigger losses.
        </p>
        <p className="mt-2 text-gray-700">
          <strong>What to Do:</strong> Develop strategies to manage your emotions, like taking breaks after losses and sticking to a pre-defined trading plan.
        </p>
      </div>

      {/* Risk Management */}
      <div className="bg-white p-4 border rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-orange-500">Risk Management (Stop Loss and Leverage)</h3>
        <p className="mt-2 text-gray-700">
          <strong>Key Issue:</strong> You often ignore stop losses and use high leverage, creating excessive risk exposure.
        </p>
        <p className="mt-2 text-gray-700">
          <strong>Why it's Crucial:</strong> Ignoring stop losses and using excessive leverage can lead to catastrophic losses.
        </p>
        <p className="mt-2 text-gray-700">
          <strong>What to Do:</strong> Implement strict stop-loss strategies and adjust leverage to align with your risk tolerance to protect your capital.
        </p>
      </div>

      {/* Lack of a Trading Plan */}
      <div className="bg-white p-4 border rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-yellow-500">Lack of a Trading Plan (Discipline)</h3>
        <p className="mt-2 text-gray-700">
          <strong>Key Issue:</strong> Your emotional trading and poor risk management indicate a lack of a clear trading plan.
        </p>
        <p className="mt-2 text-gray-700">
          <strong>Why it's Crucial:</strong> A well-defined trading plan provides structure and helps reduce emotional decisions.
        </p>
        <p className="mt-2 text-gray-700">
          <strong>What to Do:</strong> Create a solid trading plan that includes strategy, risk management rules, and emotional control practices.
        </p>
      </div>

      {/* Overtrading */}
      <div className="bg-white p-4 border rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-green-500">Overtrading (Frequency and Volatility)</h3>
        <p className="mt-2 text-gray-700">
          <strong>Key Issue:</strong> You're making too many trades, especially during volatile periods, increasing transaction costs and risk.
        </p>
        <p className="mt-2 text-gray-700">
          <strong>Why it's Crucial:</strong> Overtrading leads to higher costs, increased risk exposure, and mental fatigue.
        </p>
        <p className="mt-2 text-gray-700">
          <strong>What to Do:</strong> Focus on high-quality trades and be selective, avoiding impulsive decisions during high volatility.
        </p>
      </div>
    </div>
  );
};

export default TradingInsightsSnapshot;
