import { Helmet } from "react-helmet";
import AnalysisComponent from "../../AnalysisComponent/AnalysisComponent";
import AnalysisFlow from "../../AnalysisComponent/AnalysisFlow";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import AnalysisCards from "./AnalysisCards";

const AnalysisPage = () => {
  return (
    <>
      <Helmet>
        <title>AI-Powered Trading Analytics Dashboard - Unlock Actionable Insights</title>
        <meta
          name="description"
          content="Unlock actionable insights into your trading strategy with the AI-Powered Trading Analytics Dashboard. Leveraging advanced AI, this tool analyzes your trading history to identify patterns, evaluate risk exposure, and uncover opportunities for performance improvement."
        />
        <meta name="author" content="Likhith Reddy" />
        <meta name="keywords" content="AI-powered trading, Trading analytics, Trading strategy, Trading insights, Risk exposure, Performance improvement, Trading patterns, AI trading tools, Trading history analysis, Trading optimization, AI trading software, Investment performance, Risk management, AI-driven trading, Financial analysis, Algorithmic trading, Trading decision-making, Trading data analysis, Stock market analysis, Cryptocurrency trading, Trading dashboard, Financial technology, Machine learning trading, Big data in trading, Trading signals, AI for financial markets, Quantitative trading, Portfolio optimization, Automated trading, Trading algorithms, Trading risk management, Real-time trading analytics, Market prediction tools, Crypto trading strategies, Trading system development, Stock trading analysis, Trading portfolio management, Trading strategies, Backtesting trading strategies, Financial data analysis, Financial modeling, Trading patterns recognition, Artificial intelligence finance, Technical analysis, Trading bot technology, Stock market forecasting, Trading performance evaluation, Trading efficiency, Trading data visualization, Sentiment analysis for trading, Predictive analytics in trading" />
        <meta property="og:title" content="AI-Powered Trading Analytics Dashboard - Unlock Actionable Insights" />
        <meta property="og:description" content="Unlock actionable insights into your trading strategy with the AI-Powered Trading Analytics Dashboard. Leveraging advanced AI, this tool analyzes your trading history to identify patterns, evaluate risk exposure, and uncover opportunities for performance improvement." />
        <meta property="og:image" content="URL_TO_IMAGE" />
        <meta property="og:url" content="https://www.taxate.com/ai-analysis" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@taxate" />
        <meta name="twitter:title" content="AI-Powered Trading Analytics Dashboard - Unlock Actionable Insights" />
        <meta name="twitter:description" content="Unlock actionable insights into your trading strategy with the AI-Powered Trading Analytics Dashboard. Leveraging advanced AI, this tool analyzes your trading history to identify patterns, evaluate risk exposure, and uncover opportunities for performance improvement." />
        <meta name="twitter:image" content="URL_TO_IMAGE" />
      </Helmet>
      <Navbar />
      <AnalysisComponent />
      <AnalysisCards />
      <AnalysisFlow />
      <Footer />
    </>
  );
};

export default AnalysisPage;
