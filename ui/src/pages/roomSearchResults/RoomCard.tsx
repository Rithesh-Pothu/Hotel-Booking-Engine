import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Modal,
  useTheme,
} from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import PackageCard from "../../components/ui/PackageCard";
import Slider from "../../components/ui/Slider";
import "../../index.css";
import AddonTabs from "./AddonTabs";
import { roomType } from "./RoomDetails";
import { PromotionType } from "./RoomDetails";
import { ROOM_IMAGES } from "../../links";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setRoomType, setRoomTypeId } from "../../reducers/RoomsSlice";
import { FeeTax } from "../../reducers/RoomDetailsReducer";

const style = {
  position: "absolute" as "absolute",
  top: "70vh",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  bgcolor: "background.paper",
  boxShadow: 24,
};

function capitalize(title: string) {
  const words: string[] = title.split(" ");

  let capitalizedTitle;

  capitalizedTitle = words
    .map((word: string) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
  return capitalizedTitle;
}
interface Props extends roomType{
  rates: FeeTax
}

export default function MultiActionAreaCard(props: Props) {

  const dispatch = useAppDispatch();

  // const roomState = useAppSelector((state) => state.rooms.room_type_id)

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    dispatch(setRoomTypeId(props.roomTypeId))
    dispatch(setRoomType(props.roomType))
    console.log('SELECTED ROOM TYPE ID', props.roomTypeId)
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const [checked, setChecked] = useState(false);


  const handleClick = () => {
    setChecked(!checked);
  };

  const [images, setImages] = useState(null);

  const fetchImages = () => {
    axios.get(ROOM_IMAGES).then((response) => {
      const { data } = response.data;
      console.log("DATA", data);
      setImages(data);
    });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const title = capitalize(props.roomType.replace("_", " ").toLowerCase());
  const theme = useTheme();
  const currency = useAppSelector((state) => state.currency.value);
  const DOLLARTORUPEE = 79.5;

  return (
    <>
      <Card className="card" sx={{ maxWidth: 330}}>
        <CardActionArea>
          <CardMedia>
            {images && <Slider height={200} images={images[props.roomType]} />}
          </CardMedia>
          <CardContent>
            <Grid container>
              {" "}
              <Typography
                className="title"
                gutterBottom
                variant="h5"
                component="h5"
                sx={{ flexGrow: 1 }}
              >
                {capitalize(props.roomType.replace("_", " ").toLowerCase())}
              </Typography>
              <StarIcon
                fontSize="medium"
                color="primary"
                sx={{ mt: 0.5, mr: 0.3 }}
              />
              <Typography variant="h5">{props.rating}</Typography>
            </Grid>

            <Grid container sx={{ mt: 0.1 }}>
              <LocationOnOutlinedIcon />
              <Typography sx={{ flexGrow: 1 }} variant="body1">
                Near City Center
              </Typography>
              <Typography sx={{ float: "right" }} variant="body1">
                {props.reviews} reviews
              </Typography>
            </Grid>

            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                height: "40px",
                mt: 3,
                width: "45%",
                alignItems: "center",
                marginLeft: "-16px",
              }}
            >
              <Typography variant="h6" sx={{ color: "white", ml: 2, mt: 2 }}>
                Special Deal
              </Typography>
              <div className="triangle"></div>
            </Box>

            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              {props.minPricePromotion.description}
            </Typography>

            <Grid container sx={{ mt: 1 }}>
              {currency === "USD" && (
                <Typography variant="h5">
                  ${props.minPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </Typography>
              )}
              {currency === "INR" && (
                <Typography variant="h5">
                  ₹
                  {(props.minPrice * DOLLARTORUPEE).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </Typography>
              )}

              {currency === "USD" && (
                <Typography
                  variant="subtitle1"
                  sx={{ textDecoration: "line-through", ml: 0.5 }}
                >
                  ${props.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </Typography>
              )}

              {currency === "INR" && (
                <Typography
                  variant="subtitle1"
                  sx={{ textDecoration: "line-through", ml: 0.5 }}
                >
                  ₹{(props.price * DOLLARTORUPEE).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </Typography>
              )}

            </Grid>
            <Typography variant="body1">per night</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Grid container justifyContent="center" sx={{ mb: 0.5 }}>
            <Button
              sx={{ py: 1.5, px: 5 }}
              variant="contained"
              onClick={handleOpen}
            >
              {" "}
              Select Property
            </Button>
          </Grid>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: "scroll" }}
      >
        <Box sx={style}>
          {images && (
            <Slider
              title={capitalize(props.roomType.replace("_", " ").toLowerCase())}
              height={400}
              images={images[props.roomType]}
            />
          )}
          <Grid container direction="row">
            <Grid item md={6}>
              <Grid container direction="row" sx={{ mt: 3, ml: 3 }}>
                <Person2OutlinedIcon sx={{ ml: 3 }} />
                <Typography>1-{props.capacity}</Typography>
                <BedOutlinedIcon sx={{ ml: 3 }} />
                <Typography>
                  {props.doubleBeds} Double Beds, {props.singleBeds} Single Beds
                </Typography>
                <Typography sx={{ ml: 3 }}>
                  {props.area} ft<sup>2</sup>
                </Typography>
                <Typography sx={{ m: 3 }}>{props.description}</Typography>
              </Grid>

              <Grid sx={{ ml: 6 }}>
                <Typography sx={{ fontWeight: "bold" }} variant="h5">
                  Standard Rate
                </Typography>
                <PackageCard rates={props.rates} roomDetails={{ title: title, price: props.price, ratesInRange: props.ratesInRange}} title="Standard Rate" desc="Spend $10 every night you stay and earn $150 in dining credit at the resort. Details" effectivePrice={props.price} />
              </Grid>
              <Grid sx={{ ml: 6, my: 6 }}>
                <Typography sx={{ fontWeight: "bold" }} variant="h5">
                  Deals & Packages
                </Typography>
                <AddonTabs rates={props.rates} roomDetails={{title: title, price: props.price, ratesInRange: props.ratesInRange}} mealDeals={props.mealDeals} promotions={props.promotions} />
              </Grid>
            </Grid>
            <Grid item md={6}>
              <Grid item container justifyContent="center" alignItems="center">
                <Typography sx={{ my: 2 }} variant="h5">
                  Amenities
                </Typography>
              </Grid>

              <Grid
                direction="row"
                container
                justifyContent="space-evenly"
                alignItems="flex-start"
                sx={{ mt: 2 }}
              >
                <Grid item>
                  {props.amenities.map(
                    (amenity: string, index: number) =>
                      index < props.amenities.length / 2 && (
                        <Grid container key={index}>
                          <CheckCircleOutlineRoundedIcon />
                          <Typography sx={{ ml: 1 }}>{amenity}</Typography>
                        </Grid>
                      )
                  )}
                </Grid>
                <Grid item>
                  {props.amenities.map(
                    (amenity: string, index: number) =>
                      index >= props.amenities.length / 2 && (
                        <Grid container key={index}>
                          <CheckCircleOutlineRoundedIcon />
                          <Typography sx={{ ml: 1 }}>{amenity}</Typography>
                        </Grid>
                      )
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
