
import Header from "./Header";
import Firstsection from "./Firstsection";
import Secondsection from "./Secondsection";
import Footer from "./Footer";
import Headsection from "./Headsection";
import Socialproof from "./Socialproof";
import Ctagraph from "./Ctagraph";
import Faq from "./Faq";
import Pricing from "./Pricing";
 function Home (){
    return(
      <div>
        <Header /> 
        <Firstsection />
        <Secondsection /> 
        <Faq />  
        <Headsection />
        <Ctagraph /> 
        <Socialproof />
        <Pricing /> 
        <Footer />
      </div>
    );
}
export default Home;

