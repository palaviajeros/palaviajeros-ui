import Services from "./components/Home/Services/Services";
import Header from "./components/Home/Header/Header";
import Bestsellers from "./components/Home/Bestsellers/Bestsellers";

export default function Home() {
  return (
    <>
      <Header />
      <Bestsellers />
      <Services />
    </>
  );
}
