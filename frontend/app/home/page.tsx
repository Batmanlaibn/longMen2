import Header from "../components/header";
import Cards from "../cards/main_card"
import Footer from "../components/footer";
import TrendingNow from "../components/TrendingNow";



export default function HomePage() {
  return (
    <div className="">
      <TrendingNow />
      <Header />
      <Cards />
      <Footer />
    </div>
  );
}
