import MarketSummaryCard from "../../CoinSets/Topiccards/MarketSummaryCard";
import SentimentCard from "../../CoinSets/Topiccards/RiskProfileCard";
import RiskProfileCard from "../../CoinSets/Topiccards/SentimentCard";
import ContentContainer from "../../Layout/ContentContainer/ContentContainer";

const Summary = () => {
  return (
    <ContentContainer>
      <div className="flex flex-col  py-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <SentimentCard />
          <RiskProfileCard />
          <MarketSummaryCard />
        </div>
      </div>
    </ContentContainer>
  );
};

export default Summary;
