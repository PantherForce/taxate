import { Helmet } from 'react-helmet';
import GameComponent from "../../Game/GameComponent";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const GameBoard = () => {
  return (
    <>
      <Helmet>
        <title>Crypto Transaction Games</title>
        <meta name="description" content="Play exciting crypto transaction games and learn about blockchain technology while enjoying interactive gameplay." />
        <meta name="keywords" content="crypto, blockchain, transaction games, blockchain games, cryptocurrency, learn crypto" />
        <meta property="og:title" content="Crypto Transaction Games" />
        <meta property="og:description" content="Play exciting crypto transaction games and learn about blockchain technology while enjoying interactive gameplay." />
        <meta property="og:image" content="link_to_image.jpg" />
        <meta property="og:url" content="www.taxate.in/gameboard" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Crypto Transaction Games" />
        <meta name="twitter:description" content="Play exciting crypto transaction games and learn about blockchain technology while enjoying interactive gameplay." />
      </Helmet>
      <Navbar />
      <GameComponent />
      <Footer />
    </>
  );
};

export default GameBoard;
