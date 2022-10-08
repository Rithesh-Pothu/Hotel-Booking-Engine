package com.reservation.circuscircus.service;

import com.reservation.circuscircus.dto.*;
import com.reservation.circuscircus.mapper.BookingInfoMapper;
import com.reservation.circuscircus.models.BookingInfo;
import com.reservation.circuscircus.models.CurrentBookingId;
import com.reservation.circuscircus.models.CurrentBookings;
import com.reservation.circuscircus.models.TravellerInfo;
import com.reservation.circuscircus.repositories.BookingInfoRepository;
import com.reservation.circuscircus.repositories.CurrentBookingsRepository;
import com.reservation.circuscircus.repositories.TravellerInfoRepository;
import org.joda.time.Days;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.*;
import java.util.*;

@Service
public class CheckoutService {

    private final BookingInfoMapper bookingInfoMapper= new BookingInfoMapper();

    private final SimpleDateFormat dateParser = new SimpleDateFormat("yyyy-MM-dd");

    private final Logger logger = LoggerFactory.getLogger(CheckoutService.class);
    @Autowired
    private BookingInfoRepository bookingInfoRepository;
    @Autowired
    private TravellerInfoRepository travellerInfoRepository;
    @Autowired
    private CurrentBookingsRepository currentBookingsRepository;

    @Autowired
    private GraphQLService graphQLService;

    public long getNumberOfDaysBetweenTwoDates(String d1, String d2) {
        org.joda.time.LocalDate date1  = org.joda.time.LocalDate.parse(d1.substring(0, 10));
        org.joda.time.LocalDate date2 = org.joda.time.LocalDate.parse(d2.substring(0, 10));
        long diff = Math.abs(Days.daysBetween(date1, date2).getDays());
        return diff + 1;
    }

    public LocalDate toLocalDate(String date)
    {
        Instant instant = Instant.parse(date);
        // Get ZoneID
        ZoneId zone = ZoneId.of("Asia/Kolkata");

        // Convert Instant to LocalDate using ofInstant method
        return LocalDate.ofInstant(instant, zone);
    }

    public GraphQlGuestDTO createGuestWithGuestName(String name)
    {
       return graphQLService.mutateGuestInformation(name);
    }

    public CreateBookingCountDTO createBooking(BookingInfoDTO bookingInfoDTO, GraphQlGuestDTO graphQlGuestDTO)
    {
        return graphQLService.mutateCreateManyBookings(bookingInfoDTO.getCreateBookingPropsDTO(),
                graphQlGuestDTO.getGuest_id());
    }

    public BookingIdDTO getBookingId(GraphQlGuestDTO graphQlGuestDTO, BookingInfoDTO bookingInfoDTO){
        return graphQLService.listBookingIdByGuestIdAndPropertyId(graphQlGuestDTO.getGuest_id(),
                Math.toIntExact(bookingInfoDTO.getCreateBookingPropsDTO().getPropertyId()));
    }

    public ListRoomAvailabilityDTO getRoomAvailabilities(BookingInfoDTO bookingInfoDTO){
        return graphQLService.listRoomAvailabilities(bookingInfoDTO.getCreateBookingPropsDTO());
    }

    public ListRoomIdDTO getListRoomIdDto(BookingInfoDTO bookingInfoDTO){
        return graphQLService.listRoomIds(bookingInfoDTO.getCreateBookingPropsDTO());
    }

    public boolean hasAvailableNumberOfRooms(List<RoomIdDTO> listOfRoomIds,
                                        BookingInfoDTO bookingInfoDTO,
                                        List<Integer> availableRoomIdsBetweenTwoDates
                                        )
    {
        Long numberOfRoomsRequiredToBook = bookingInfoDTO.getCreateBookingPropsDTO().getRooms();
        int countOfRoomsAvailable = 0;
        for (RoomIdDTO listOfRoomId : listOfRoomIds) {
        Integer curRoomId = listOfRoomId.getRoom_id();
        CountRoomAvailabilitiesDto count = graphQLService.getCountRoomAvailabilityService(bookingInfoDTO.getCreateBookingPropsDTO(), curRoomId);

        //counting if a room is available continously from check in to checkout dates
        if (count.getCountRoomAvailabilities() == getNumberOfDaysBetweenTwoDates(bookingInfoDTO.getCreateBookingPropsDTO().getCheckInDate()
                , bookingInfoDTO.getCreateBookingPropsDTO().getCheckOutDate())) {
            availableRoomIdsBetweenTwoDates.add(curRoomId);

            countOfRoomsAvailable++;
            if(numberOfRoomsRequiredToBook == countOfRoomsAvailable)
            {
               return true;
            }
        }
    }
        return false;
    }

    public void updateTheBookingAvailability(List<Integer> availableRoomIdsBetweenTwoDates,
                                             BookingInfoDTO bookingInfoDTO, BookingIdDTO bookingIdDTO){
        String isoString = "T00:00:00.000Z";

        LocalDate checkOutDate =
                toLocalDate(bookingInfoDTO.getCreateBookingPropsDTO().getCheckOutDate());


        for(Integer roomId : availableRoomIdsBetweenTwoDates)
        {
            for (LocalDate date =
                 toLocalDate(bookingInfoDTO.getCreateBookingPropsDTO().getCheckInDate()); date.isBefore(checkOutDate) || date.isEqual(checkOutDate); date = date.plusDays(1)) {
                ListRoomAvailabilityIDDTO listRoomAvailabilityIDDTO = graphQLService.getRoomAvailabilityIDDtoService(roomId, date.toString()+isoString);
                logger.info("ROOM AVAILABILITY ID USING DATE AND ROOM ID "+String.valueOf(roomId + " " +date.toString()));
                BookingIdDTO res = graphQLService.updateTheRoomAvailability(bookingIdDTO, listRoomAvailabilityIDDTO.getListRoomAvailabilities().get(0));
                logger.info("UPDATED "+ roomId  + " of Date " + date + " with Booking ID " + res.getBooking_id());
            }
        }
    }


    public BookingIdDTO saveBookingInfo(BookingInfoDTO bookingInfoDTO) {

        //get the details from booking info dto which is populated from front end user forms
        String checkInDate = bookingInfoDTO.getCreateBookingPropsDTO().getCheckInDate();
        String checkOutDate = bookingInfoDTO.getCreateBookingPropsDTO().getCheckOutDate();

        Long roomTypeId = bookingInfoDTO.getCreateBookingPropsDTO().getRoomTypeId();

        Date checkIn,checkOut;
        LocalDate first, last;

        while(true) {
            try {
                logger.info("entering booking");
                checkIn = dateParser.parse(checkInDate);
                checkOut = dateParser.parse(checkOutDate);
                first = checkIn.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                last = checkOut.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                for (; first.isBefore(last); first = first.plusDays(1)) {
                    logger.info("adding a date");
//                    CurrentBookings b = new CurrentBookings();
//                    b.setDate(first);
//                    b.setRoomTypeId(roomTypeId);
//                    currentBookingsRepository.save(b);
                    currentBookingsRepository.insertNewRecord(first, roomTypeId);
                }
                break;
            } catch (Exception e) {
                logger.info("already in use");
                try {
                    Integer sleepFor = new Random().nextInt(2)+3;
                    System.out.println(sleepFor);
                    Thread.sleep(3000);
                } catch (InterruptedException ex) {
                    throw new RuntimeException(ex);
                }
            }
        }

        //create guest with guest name
        GraphQlGuestDTO graphQlGuestDTO =
                createGuestWithGuestName(bookingInfoDTO.getTravellerInfoDTO().getFirstName() +" "+bookingInfoDTO.getTravellerInfoDTO().getLastName());

        //get the list of room ids
        ListRoomIdDTO listRoomIdDTO = getListRoomIdDto(bookingInfoDTO);
        List<RoomIdDTO> listOfRoomIds = listRoomIdDTO.getListRooms();


        List<Integer> availableRoomIdsBetweenTwoDates = new ArrayList<>();

        //get count of rooms available and store the room ids of them



        //if insufficient number of rooms return null
        if(!hasAvailableNumberOfRooms(listOfRoomIds, bookingInfoDTO,
                availableRoomIdsBetweenTwoDates))
        {
            removeId(checkInDate, checkOutDate, roomTypeId);
            return null;
        }




        //create booking if rooms available
        //get booking id by guest id and property id
        CreateBookingCountDTO getBookingId = createBooking(bookingInfoDTO, graphQlGuestDTO);
        logger.info(String.valueOf(getBookingId));
        BookingIdDTO bookingIdDTO = bookingInfoMapper.convertToBookingIdDto(getBookingId);
        logger.info(String.valueOf(graphQlGuestDTO));


        //write update mutation here
        updateTheBookingAvailability(availableRoomIdsBetweenTwoDates, bookingInfoDTO, bookingIdDTO);

        removeId(checkInDate, checkOutDate, roomTypeId);
        //map and save the booking info in rds
        BookingInfo bookingInfo = bookingInfoMapper.toBookingInfo(bookingInfoDTO, graphQlGuestDTO, bookingIdDTO);
        BookingInfo info = bookingInfoRepository.save(bookingInfo);

        return bookingInfoMapper.convertToBookingIdDto(info);
    }

    public void removeId(String checkInDate, String checkOutDate, Long roomTypeId){
        Date checkIn,checkOut;
        LocalDate first, last;
        try{
            checkIn = dateParser.parse(checkInDate);
            checkOut = dateParser.parse(checkOutDate);
            first = checkIn.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            last = checkOut.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            for(; first.isBefore(last); first = first.plusDays(1)){
                currentBookingsRepository.delete(new CurrentBookings(roomTypeId, first));
            }
            notify();
        }catch(Exception e){}
        logger.info("exit booking");
    }

    public ListDTO<BookingInfoDTO> findByEmail(String email){
//        String email = emailDTO.getEmail();
//        logger.info(String.valueOf(bookingInfoRepository.getAllBookingInfoByEmail(email)));

        List<BookingInfoDTO> allBookingInfos = new ArrayList<>();

        List<TravellerInfo> travellerInfos = travellerInfoRepository.getTravellerInfoByEmail(email);
        logger.info(String.valueOf(travellerInfos));

        for(TravellerInfo travellerInfo: travellerInfos){
            allBookingInfos.add(toBookingInfoDTO(getBookingInfoByTravellerId(travellerInfo)));
        }

        return new ListDTO<>(allBookingInfos);
    }

    private BookingInfo getBookingInfoByTravellerId(TravellerInfo travellerInfo){
        return bookingInfoRepository.findByTravellerInfo(travellerInfo);
    }

    private BookingInfoDTO toBookingInfoDTO(BookingInfo bookingInfo) {
        return BookingInfoDTO.builder()
                .bookingId(bookingInfo.getBookingId())
                .travellerInfoDTO(bookingInfoMapper.toTravellerInfoDTO(bookingInfo.getTravellerInfo()))
                .billingInfoDTO(bookingInfoMapper.toBillingInfoDTO(bookingInfo.getBillingInfo()))
                .paymentInfoDTO(bookingInfoMapper.toPaymentInfoDTO(bookingInfo.getPaymentInfo()))
                .build();
    }
}
