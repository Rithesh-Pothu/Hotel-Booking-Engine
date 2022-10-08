import { Box } from "@mui/material"
import Countdown from "react-countdown"
import { useNavigate } from "react-router-dom"
import { LANDING_PAGE } from '../../links';
import { useAppSelector } from '../../redux/hooks';

interface checkOutDetails {
    timeOutValue: number,
    supportPhone: string,
    supportHours: string,
    emailMarketingSignupText: string,
    checkoutSuperTerms: string
}

const Timer = () => {
  console.log('in Timer');
  const navigate = useNavigate();
  const checkOutDetails = useAppSelector((state) => state.checkOutDetails);
  const timer = useAppSelector((state) => state.isTimerCompleted);
  console.log((new Date(timer?.checkOutTime).getTime()) + parseInt(checkOutDetails.timeOutValue)*60*1000)
  // const timer = new getApi({autoStart: false, date: Date.now()+500000, renderer:({hours, minutes, seconds, completed, total})=>{<></>}});
  return (
    <Box sx={{ py: 2.5, mb: 7, textAlign:"center", fontSize: 23, position: "fixed", bottom: 0, bgcolor:"#9794B7", width: "100%", color:"#FFFFFF"}}>
      
      <Countdown onComplete={
          ()=>{
            localStorage.setItem("redux","");
            // dispatch(changeCompleted());
            navigate(LANDING_PAGE);
            navigate(0);
          }
        } 
        date={(new Date(timer?.checkOutTime).getTime()) + parseInt(checkOutDetails.timeOutValue)*60*1000}
        renderer={({minutes, seconds})=><span>{minutes} Minutes {seconds} Seconds left to complete checkout!</span>}
        >
        <></>
      </Countdown>
    </Box>
  )
}

export default Timer