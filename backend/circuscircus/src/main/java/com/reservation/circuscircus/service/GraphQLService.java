package com.reservation.circuscircus.service;

import com.google.gson.Gson;
import com.reservation.circuscircus.dto.*;
import com.reservation.circuscircus.mapper.BookingInfoMapper;
import com.reservation.circuscircus.mapper.MinNightlyRateMapper;
import com.reservation.circuscircus.mapper.RoomDetailsMapper;
import com.reservation.circuscircus.models.RoomType;
import com.reservation.circuscircus.queries.GraphQLQueries;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;


@Service
@Transactional
public class GraphQLService {

    private final Logger logger = LoggerFactory.getLogger(GraphQLService.class);
    private final MinNightlyRateMapper minNightlyRateMapper = new MinNightlyRateMapper();
    private final String QUERY = "query";
    private final String GRAPHQLURL = "/graphql";
    private final String PROPERTYID = "propertyId";
    Gson gson = new Gson();
    @Autowired
    private WebClient webClient;
    @Autowired
    private RoomDetailsMapper roomDetailsMapper;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private RoomTypeService roomTypeService;
    @Autowired
    private BookingInfoMapper bookingInfoMapper;
    @Autowired
    private PropertyService propertyService;
    @Autowired
    private BookingInfoService bookingInfoService;

    public String response(String query) {
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put(QUERY, query);
        return gson.toJson(webClient
                .post()
                .uri(GRAPHQLURL)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(HashMap.class)
                .block());
    }

    public MinNightlyRatesDTO getRates(String propertyId) {
        NightlyRatesDataDTO bodyString =
                gson.fromJson(
                        response(String.format(GraphQLQueries.nightlyRatesQuery, propertyId)),
                        NightlyRatesDataDTO.class
                );
        return minNightlyRateMapper.getRates(bodyString);
    }

    public RoomDetailsTaxDTO getRoomDetails(Map<String, String> allParams){
        Map<String, RoomType> roomTypeMap = roomTypeService.findAll();
        RoomDetailsDataDTO bodyString =
                gson.fromJson(
                        response(String.format(GraphQLQueries.roomDetailsQuery, allParams.get(PROPERTYID))),
                        RoomDetailsDataDTO.class
                );
        PromotionsDataDTO promotionsDataDTO =
                gson.fromJson(
                        response(String.format(GraphQLQueries.listPromotions)),
                        PromotionsDataDTO.class
                );
        PropertyRatesDTO propertyRatesDTO = propertyService.getPropertyRates(Long.valueOf(allParams.get(PROPERTYID)));
        return roomDetailsMapper.getRoomDetails(allParams, bodyString, roomTypeMap, propertyRatesDTO, promotionsDataDTO);
    }

    public GraphQlGuestDTO mutateGuestInformation(String guestName) {
        logger.info("GUEST NAME FROM MUTATE GUEST INFO: " + String.valueOf(guestName));

        String res = response(String.format(GraphQLQueries.createGuestMutation, guestName));

        CreateGuestWithDataDto bodyString = gson.fromJson(
                res,
                CreateGuestWithDataDto.class
        );
        logger.info("MUTATED THE GUEST SUCCESSFULLY!");
        return bookingInfoMapper.getGraphQlGuestDTO(bodyString);
    }

    public CreateBookingCountDTO mutateCreateManyBookings(CreateBookingPropsDTO createBookingPropsDTO, Long guest_id) {
        logger.info("mutation query being executed for create many bookings");
        logger.info("GUEST ID: " +guest_id);
//        logger.info(
//                String.format(GraphQLQueries.createBookingMutation,
//                        createBookingPropsDTO.getAdultCount(),
//                        createBookingPropsDTO.getAmountDueAtResort(),
//                        createBookingPropsDTO.getCheckInDate(),
//                        createBookingPropsDTO.getCheckOutDate(),
//                        createBookingPropsDTO.getChildCount(),
//                        guest_id,
//                        createBookingPropsDTO.getPromotionId(),
//                        createBookingPropsDTO.getPropertyId(),
//                        createBookingPropsDTO.getStatusId(),
//                        createBookingPropsDTO.getTotalCost()
//                ));

        String res = response(String.format(GraphQLQueries.createBookingMutation,
                createBookingPropsDTO.getAdultCount(),
                createBookingPropsDTO.getAmountDueAtResort(),
                createBookingPropsDTO.getCheckInDate(),
                createBookingPropsDTO.getCheckOutDate(),
                createBookingPropsDTO.getChildCount(),
                guest_id,
                createBookingPropsDTO.getPromotionId(),
                createBookingPropsDTO.getPropertyId(),
                createBookingPropsDTO.getStatusId(),
                createBookingPropsDTO.getTotalCost()
                ));


        CreateManyBookingsWithDataDTO bodyString = gson.fromJson(
                res,
                CreateManyBookingsWithDataDTO.class
        );

        return bookingInfoMapper.getCreateManyGuestCount(bodyString);
    }

    public BookingIdDTO listBookingIdByGuestIdAndPropertyId(Long guestId, Integer propertyId){

        ListBookingsDataDTO bodyString =
                gson.fromJson(
                        response(String.format(GraphQLQueries.getBookingIdByGuestIdAndPropertyId,
                                guestId, propertyId
                                )),
                        ListBookingsDataDTO.class
                );
        return bookingInfoMapper.getBookingIdFromListBookingsDataDto(bodyString);
    }


    public ListRoomAvailabilityDTO listRoomAvailabilities(CreateBookingPropsDTO createBookingPropsDTO){

        ListRoomAvailabilityDataDTO bodyString =
                gson.fromJson(
                        response(String.format(GraphQLQueries.listRoomAvailabilitiesQuery,
                                createBookingPropsDTO.getPropertyId(),
                                createBookingPropsDTO.getRoomTypeId(),
                                createBookingPropsDTO.getCheckInDate(),
                                createBookingPropsDTO.getCheckOutDate()
                        )),
                        ListRoomAvailabilityDataDTO.class
                );

        return bookingInfoMapper.getListRoomAvailabilityDTOs(bodyString);

    }

    public ListRoomIdDTO listRoomIds(CreateBookingPropsDTO createBookingPropsDTO){

        ListRoomIdDataDTO bodyString =
                gson.fromJson(
                        response(String.format(GraphQLQueries.getListOfRoomsForRoomType,
                                createBookingPropsDTO.getRoomTypeId(),
                                createBookingPropsDTO.getPropertyId()
                        )),
                        ListRoomIdDataDTO.class
                );

        return bookingInfoMapper.getListRoomIdDTOs(bodyString);
    }

    public CountRoomAvailabilitiesDto getCountRoomAvailabilityService(CreateBookingPropsDTO createBookingPropsDTO, Integer roomId)
    {
        CountRoomAvlDataDto bodyString =
                gson.fromJson(
                        response(String.format(GraphQLQueries.countRoomAvailabilitiesQuery,
                                createBookingPropsDTO.getCheckInDate(),
                                createBookingPropsDTO.getCheckOutDate(),
                                createBookingPropsDTO.getPropertyId(),
                                roomId
                        )),
                        CountRoomAvlDataDto.class
                );

        return bookingInfoMapper.getCountOfRoomAvailabilities(bodyString);
    }


    public ListRoomAvailabilityIDDTO getRoomAvailabilityIDDtoService(Integer roomId, String date)
    {
        ListRoomAvlIdDataDTO bodyString =
                gson.fromJson(
                        response(String.format(GraphQLQueries.getRoomAvailabilityIdWithRoomIdAndDate,
                                date,
                                roomId
                        )),
                        ListRoomAvlIdDataDTO.class
                );

        return bookingInfoMapper.getRoomAvailabilityIDDto(bodyString);
    }

    public BookingIdDTO updateTheRoomAvailability(BookingIdDTO bookingIdDTO, AvailabilityIdDto availabilityIdDto){
        UpdateRoomAvlDataDto bodyString =
                gson.fromJson(
                        response(String.format(GraphQLQueries.updateRoomAvailabilityQuery,
                           availabilityIdDto.getAvailability_id(),
                           bookingIdDTO.getBooking_id()
                        )),
                        UpdateRoomAvlDataDto.class
                );

        return bookingInfoMapper.getBookingIdAfterUpdatingRoomAvl(bodyString);
    }


    public QlGetBookingDTO getBookingDetailsByBookingId(Long bookingId){
        QlGetBookingDataDTO bodyString = gson.fromJson(
                response(String.format(GraphQLQueries.getBookingDetailsByBookingId,
                        bookingId
                )),
                QlGetBookingDataDTO.class
        );

        return bookingInfoMapper.getBookingDTOFromData(bodyString);
    }


    public QlRoomTypeNameDTO getRoomTypeName(Integer roomTypeId)
    {
        QlDataGetRoomTypeDTO bodyString = gson.fromJson(
                response(String.format(GraphQLQueries.getRoomTypeNameById,
                        roomTypeId
                )),
                QlDataGetRoomTypeDTO.class
        );
        logger.info("Bodystring " +String.valueOf(bodyString));
        return bookingInfoMapper.getRoomTypeFromData(bodyString);
    }

    public Integer deleteAvailabilitiesByBookingId(Long bookingId) {
        DeleteRoomAvailabilitiesDataDTO res = gson.fromJson(
                response(
                        String.format(
                                GraphQLQueries.deleteRoomAvailabilitiesByBookingId,
                                bookingId
                        )
                ), DeleteRoomAvailabilitiesDataDTO.class);
        return res.getData().getDeleteManyRoomAvailabilities().getCount();
    }

    public String cancelBooking(Long bookingId){
        try {
            bookingInfoService.cancelBooking(bookingId);
            Integer count = deleteAvailabilitiesByBookingId(bookingId);
            logger.info("deleted bookingInfo and "+ count +" no. of room availabilities");
            return "booking cancelled!";
        }catch(Exception e){
            return "No such booking exist!";
        }
    }

}
