import GptMovieSuggestions from "./GptMovieSuggestions"
import GptSearchBar from "./GptSearchBar"
import {BACKGROUND} from "../utils/constants"
const GptSearchComponent=()=>{
return(
 <div>
    <div className="fixed -z-10">
    <img className="w-screen h-screen object-cover" src={BACKGROUND} alt="background"/>
    </div>
  <GptSearchBar/>
  <GptMovieSuggestions/>
 </div>
)
}
export default GptSearchComponent