import BannerImage from "../../assets/images/banner-image.png";
import HorizontalLabelPositionBelowStepper from "../../components/ui/Stepper";
import OutlinedCard from '../../components/ui/SearchCard';
import { useEffect } from "react";


var sectionStyle = {
    width: "100%",
    height: "80vh",
    backgroundImage: `url(${BannerImage})`,
    top: 0,
    position: "absolute" as "absolute"
};



const LandingPage = () => {
    return (
        <section style={sectionStyle} >
            <HorizontalLabelPositionBelowStepper step={0 as number} />
            <OutlinedCard />
        </section>
    )
}

export default LandingPage;
