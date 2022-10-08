package com.reservation.circuscircus.service;

import com.google.gson.Gson;
import com.reservation.circuscircus.dto.*;
import com.reservation.circuscircus.mapper.BookingInfoMapper;
import com.reservation.circuscircus.models.BookingInfo;
import com.reservation.circuscircus.models.Promotion;
import com.reservation.circuscircus.queries.GraphQLQueries;
import com.reservation.circuscircus.repositories.BookingInfoRepository;
import com.reservation.circuscircus.repositories.PromotionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ConfirmationService {
    private final Logger logger = LoggerFactory.getLogger(ConfirmationService.class);

    Gson gson = new Gson();
    @Autowired
    private BookingInfoMapper bookingInfoMapper;
    @Autowired
    private BookingInfoRepository bookingInfoRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private GraphQLService graphQLService;

    @Autowired
    private CheckoutService checkoutService;


    private RoomSummaryDTO getRoomSummary(PropertyRatesDTO propertyRatesDTO, QlGetBookingDTO qlGetBookingDTO)
    {
        Long lengthOfStay = checkoutService.getNumberOfDaysBetweenTwoDates
                (qlGetBookingDTO.getGetBooking().getCheck_out_date() ,
                        qlGetBookingDTO.getGetBooking().getCheck_in_date());
        RoomSummaryDTO roomSummaryDTO = new RoomSummaryDTO();
        roomSummaryDTO.setVat(propertyRatesDTO.getVat());
        roomSummaryDTO.setTotalForStay(qlGetBookingDTO.getGetBooking().getTotal_cost());
        roomSummaryDTO.setTaxesSurchargesFees(propertyRatesDTO.getFees().get(0).getAmount() + (propertyRatesDTO.getTaxes().get(0).getPercent()/100)*qlGetBookingDTO.getGetBooking().getTotal_cost());
        roomSummaryDTO.setSubtotal(roomSummaryDTO.getTotalForStay() - roomSummaryDTO.getTaxesSurchargesFees() - roomSummaryDTO.getVat());
        roomSummaryDTO.setNightlyRate(roomSummaryDTO.getSubtotal()/lengthOfStay);
        roomSummaryDTO.setPerNightTotal(Double.valueOf(qlGetBookingDTO.getGetBooking().getTotal_cost())/lengthOfStay);
        return roomSummaryDTO;
    }

    public BookingInfoDTO getBookingDetailsByBookingId(Long bookingId){
        logger.info("confirmation service called for getting booking details");

        QlGetBookingDTO qlGetBookingDTO = graphQLService.getBookingDetailsByBookingId(bookingId);
        logger.info(String.valueOf(qlGetBookingDTO.getGetBooking()));

        Integer roomTypeId =
                qlGetBookingDTO.getGetBooking().getRoom_booked().get(0).getRoom().getRoom_type_id();
        logger.info("Room Type Id " +String.valueOf(roomTypeId));

        Promotion promotion =
                gson.fromJson(
                        graphQLService.response(String.format(GraphQLQueries.getPromotion,
                                qlGetBookingDTO.getGetBooking().getPromotion_id()
                        )),
                        PromotionDataDTO.class
                ).getData().getGetPromotion();
        logger.info(String.valueOf(promotion));

        QlRoomTypeNameDTO qlRoomTypeNameDTO = graphQLService.getRoomTypeName(roomTypeId);

        Optional<BookingInfo> res =
                bookingInfoRepository.findById(bookingId);

        PropertyRatesDTO propertyRatesDTO =
                propertyService.getPropertyRates(qlGetBookingDTO.getGetBooking().getProperty_id());

        logger.info("PROPERTY RATES DTO " +String.valueOf(propertyRatesDTO));

        RoomSummaryDTO roomSummaryDTO = getRoomSummary(propertyRatesDTO, qlGetBookingDTO);
        logger.info("ROOM SUMMARY DTO " +String.valueOf(roomSummaryDTO));

        return res.map(bookingInfo -> bookingInfoMapper.convertToBookingInfoDTO(bookingInfo,
                qlGetBookingDTO, qlRoomTypeNameDTO, promotion, roomSummaryDTO)).orElse(null);
    }


}
