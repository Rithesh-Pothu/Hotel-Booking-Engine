import HorizontalSearchForm from "./HorizontalSearchForm";
import HorizontalLabelPositionBelowStepper from "../../components/ui/Stepper";
import PaginatedItems from "./PaginatedItems";

const RoomSearchResults = () => {
    return (
        <>
            <HorizontalLabelPositionBelowStepper step={1 as number} />
            <HorizontalSearchForm />
        </>
    );
};
export default RoomSearchResults;
