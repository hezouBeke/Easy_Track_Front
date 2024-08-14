
import Header from "./Header";
import Firstsection from "./Firstsection";
import Secondsection from "./Secondsection";
import Footer from "./Footer";
import Headsection from "./Headsection";
import Socialproof from "./Socialproof";
import Ctagraph from "./Ctagraph";
import SlogDesc  from "./SlogDesc";
 function Home (){
    return(
      <div>
        
        <Header /> 

        <Firstsection />

        <SlogDesc />
        
        <Secondsection /> 

        <Headsection />
        
        <Ctagraph /> 

        <Socialproof />
      
        <Footer />
        
        
      </div>
    );
}
export default Home;

