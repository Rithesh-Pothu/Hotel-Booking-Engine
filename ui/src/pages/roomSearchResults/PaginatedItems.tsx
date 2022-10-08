import { CircularProgress, useTheme } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../../index.css";
import { FeeTax } from "../../reducers/RoomDetailsReducer";
import { useAppSelector } from "../../redux/hooks";
import RoomDetails from "./RoomDetails";



var sectionStyle = {
    width: 500,
    position: "absolute" as "absolute",
    top: "30vh",
    left: "35vw",
};

interface Props {
    rates: FeeTax
    itemsPerPage: number;
    roomDetails: never[]
    fetcher: () => void;
}

const PaginatedItems = ({ rates, itemsPerPage, roomDetails, fetcher }: Props) => {

    const theme = useTheme();

    const [loading, setLoading] = useState(true);
    // const [open, setOpen] = useState(true);

    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState<number>(0);


    const checked = useAppSelector((state) => state.isAccessible.value);
    const beds = useAppSelector((state) => state.beds.value);
    const adults = useAppSelector((state) => state.guests.adultsCount);
    const teens = useAppSelector((state) => state.guests.teensCount);
    const kids = useAppSelector((state) => state.guests.kidsCount);
    const property_name = useAppSelector((state) => state.propertyName.value);
    const property_id = property_name.split(" ")[1];
    const promo_code_value = useAppSelector((state) => state.promoCode.value);
    const rooms = useAppSelector((state) => state.rooms.value);
    const guests = useAppSelector((state) => state.guests);
    const range = useAppSelector((state) => state.daterange);

    const handleClose = () => {
        setLoading(false);
    };

    // Invoke when user click to request another page.
    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % roomDetails.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    //fetch the data only once
    useEffect(() => {
        fetcher();
    }, []);


    const updateCurrentItems = () => {
        setLoading(true);
        const endOffset: number = itemOffset + itemsPerPage;
        setCurrentItems(roomDetails.slice(itemOffset, endOffset));
        setLoading(false)
    }

    useEffect(() => {
        updateCurrentItems();
        setPageCount(Math.ceil(roomDetails.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    useEffect(() => {
        updateCurrentItems();
    }, [roomDetails]);

    return loading ? (

        <Backdrop
            sx={{ color: theme.palette.primary.main, zIndex: (mytheme) => mytheme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" disableShrink />
        </Backdrop>


    ) : (
        <>
            {currentItems.length > 0 && <RoomDetails rates={rates} roomDetails={currentItems} />}
            {currentItems.length > 0 && (
                <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    activeClassName="active"
                    disabledClassName="disabled"
                    initialPage={1}
                    previousLabel="<<Previous"
                    nextLabel="Next>>"
                    breakLabel="..."
                    breakClassName="break-me"
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={1}
                    className="pages pagination"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                />
            )}
        </>
    );
};

export default PaginatedItems;
