package com.reservation.circuscircus.mapper;

import com.reservation.circuscircus.dto.*;
import com.reservation.circuscircus.models.*;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Data
@Component
public class BookingInfoMapper {

    private final Logger logger = LoggerFactory.getLogger(BookingInfoMapper.class);

    public BookingInfo toBookingInfo(BookingInfoDTO bookingInfoDTO, GraphQlGuestDTO graphQlGuestDTO, BookingIdDTO bookingIdDTO) {
        return BookingInfo.builder()
                .bookingId(bookingIdDTO.getBooking_id())
                .travellerInfo(toTravellerInfo(bookingInfoDTO.getTravellerInfoDTO(), graphQlGuestDTO))
                .billingInfo(toBillingInfo(bookingInfoDTO.getBillingInfoDTO()))
                .paymentInfo(toPaymentInfo(bookingInfoDTO.getPaymentInfoDTO()))
                .build();
    }

    public TravellerInfo toTravellerInfo(TravellerInfoDTO travellerInfoDTO, GraphQlGuestDTO graphQlGuestDTO) {
        Long travellerId = graphQlGuestDTO.getGuest_id();
        return TravellerInfo.builder()
                .travellerId(travellerId)
                .firstName(travellerInfoDTO.getFirstName())
                .lastName(travellerInfoDTO.getLastName())
                .phone(travellerInfoDTO.getPhone())
                .email(travellerInfoDTO.getEmail())
                .build();
    }

    public TravellerInfoDTO toTravellerInfoDTO(TravellerInfo travellerInfo) {
        return TravellerInfoDTO.builder()

                .firstName(travellerInfo.getFirstName())
                .lastName(travellerInfo.getLastName())
                .phone(travellerInfo.getPhone())
                .email(travellerInfo.getEmail())

                .build();
    }


    public BillingInfo toBillingInfo(BillingInfoDTO billingInfoDTO) {
        return BillingInfo.builder()
                .firstName(billingInfoDTO.getFirstName())
                .lastName(billingInfoDTO.getLastName())
                .mailingAddress1(billingInfoDTO.getMailingAddress1())
                .mailingAddress2(billingInfoDTO.getMailingAddress2())
                .country(billingInfoDTO.getCountry())
                .city(billingInfoDTO.getCity())
                .state(billingInfoDTO.getState())
                .zip(billingInfoDTO.getZip())
                .phone(billingInfoDTO.getPhone())
                .email(billingInfoDTO.getEmail())
                .build();
    }

    public BillingInfoDTO toBillingInfoDTO(BillingInfo billingInfo) {
        return BillingInfoDTO.builder()
                .firstName(billingInfo.getFirstName())
                .lastName(billingInfo.getLastName())
                .mailingAddress1(billingInfo.getMailingAddress1())
                .mailingAddress2(billingInfo.getMailingAddress2())
                .country(billingInfo.getCountry())
                .city(billingInfo.getCity())
                .state(billingInfo.getState())
                .zip(billingInfo.getZip())
                .phone(billingInfo.getPhone())
                .email(billingInfo.getEmail())
                .build();
    }

    public PaymentInfo toPaymentInfo(PaymentInfoDTO paymentInfoDTO) {
        return PaymentInfo.builder()
                .cardNumber(convertCardNumberToMasked(paymentInfoDTO.getCardNumber()))
                .expiryMonth(paymentInfoDTO.getExpiryMonth())
                .expiryYear(paymentInfoDTO.getExpiryYear())
                .build();
    }



    public CreateBookingPropsDTO toCreateBookingPropsDto(QlGetBookingDTO qlGetBookingDTO,
                                                         QlRoomTypeNameDTO qlRoomTypeNameDTO){
        return CreateBookingPropsDTO.builder()
                .checkInDate(qlGetBookingDTO.getGetBooking().getCheck_in_date())
                .checkOutDate(qlGetBookingDTO.getGetBooking().getCheck_out_date())
                .amountDueAtResort(qlGetBookingDTO.getGetBooking().getAmount_due_at_resort())
                .adultCount(qlGetBookingDTO.getGetBooking().getAdult_count())
                .childCount(qlGetBookingDTO.getGetBooking().getChild_count())
                .promotionId(qlGetBookingDTO.getGetBooking().getPromotion_id())
                .propertyId(qlGetBookingDTO.getGetBooking().getProperty_id())
                .totalCost(qlGetBookingDTO.getGetBooking().getTotal_cost())
                .roomTypeId(Long.valueOf(qlGetBookingDTO.getGetBooking().getRoom_booked().get(0).getRoom().getRoom_type_id()))
                .roomType(qlRoomTypeNameDTO.getRoom_type_name())
//                .rooms(qlGetBookingDTO.getGetBooking().)
                .build();
    }

    public PaymentInfoDTO toPaymentInfoDTO(PaymentInfo paymentInfo) {
        return PaymentInfoDTO.builder()
                .cardNumber((paymentInfo.getCardNumber()))
                .expiryMonth(paymentInfo.getExpiryMonth())
                .expiryYear(paymentInfo.getExpiryYear())
                .build();
    }

    public BookingInfoDTO convertToBookingInfoDTO(BookingInfo bookingInfo,
                                                  QlGetBookingDTO qlGetBookingDTO,
                                                  QlRoomTypeNameDTO qlRoomTypeNameDTO,
                                                  Promotion promotion,
                                                  RoomSummaryDTO roomSummaryDTO) {
        return BookingInfoDTO.builder()
                .travellerInfoDTO(toTravellerInfoDTO(bookingInfo.getTravellerInfo()))
                .billingInfoDTO(toBillingInfoDTO(bookingInfo.getBillingInfo()))
                .paymentInfoDTO(toPaymentInfoDTO(bookingInfo.getPaymentInfo()))
                .createBookingPropsDTO(toCreateBookingPropsDto(qlGetBookingDTO, qlRoomTypeNameDTO))
                .promotionDTO(toPromotionDto(promotion))
                .roomSummaryDTO(roomSummaryDTO)
                .build();
    }

    private PromotionDTO toPromotionDto(Promotion promotion) {
        return PromotionDTO.builder()
                .title(promotion.getPromotion_title())
                .description(promotion.getPromotion_description())
                .effectivePrice(promotion.getPrice_factor())
                .build();
    }

    public BookingIdDTO convertToBookingIdDto(BookingInfo bookingInfo)
    {
        return BookingIdDTO.builder()
                .booking_id(bookingInfo.getBookingId())
                .build();
    }



    public String convertCvvToMasked(String str) {
        int length = str.length();
        return "X".repeat(length);
    }

    public String convertCardNumberToMasked(String str) {
        int length = str.length();
        int n = length - 4;
        return "X".repeat(n) + str.substring(length - 4);
    }

    public GraphQlGuestDTO getGraphQlGuestDTO(CreateGuestWithDataDto createGuestWithDataDto) {
        logger.info("GET GRAPHQL GUEST DTO CALLED");
        return createGuestWithDataDto.getData().getCreateGuest();
    }

    public CreateBookingCountDTO getCreateManyGuestCount
            (CreateManyBookingsWithDataDTO createManyBookingsWithDataDTO) {
        logger.info("CREATE MANY BOOKINGS MAPPER CALLED");
        return createManyBookingsWithDataDTO.getData().getCreateBooking();
    }

    public BookingIdDTO getBookingIdFromListBookingsDataDto(ListBookingsDataDTO listBookingsDataDTO) {
        return BookingIdDTO
                .builder()
                .booking_id(listBookingsDataDTO
                        .getData()
                        .getListBookings().get(0).getBooking_id())
                .build();
    }

    public ListRoomAvailabilityDTO getListRoomAvailabilityDTOs
            (ListRoomAvailabilityDataDTO listRoomAvailabilityDataDTO) {
        return listRoomAvailabilityDataDTO.getData();
    }

    public ListRoomIdDTO getListRoomIdDTOs(ListRoomIdDataDTO listRoomIdDataDTO) {
        return listRoomIdDataDTO.getData();
    }

    public CountRoomAvailabilitiesDto getCountOfRoomAvailabilities(CountRoomAvlDataDto countRoomAvlDataDto) {
        return countRoomAvlDataDto.getData();
    }

    public ListRoomAvailabilityIDDTO getRoomAvailabilityIDDto(ListRoomAvlIdDataDTO listRoomAvlIdDataDTO) {
        return listRoomAvlIdDataDTO.getData();
    }

    public BookingIdDTO getBookingIdAfterUpdatingRoomAvl(UpdateRoomAvlDataDto updateRoomAvlDataDto) {
        return updateRoomAvlDataDto.getData().getUpdateRoomAvailability();
    }

    public QlGetBookingDTO getBookingDTOFromData(QlGetBookingDataDTO qlGetBookingDataDTO){
        return qlGetBookingDataDTO.getData();
    }

    public QlRoomTypeNameDTO getRoomTypeFromData(QlDataGetRoomTypeDTO qlDataGetRoomTypeDTO){
        return qlDataGetRoomTypeDTO.getData().getGetRoomType();
    }

    public BookingInfoDTO convertToBookingInfoDTO(BookingInfo bookingInfo)
    {
        return BookingInfoDTO.builder()
                .bookingId(bookingInfo.getBookingId())
                .travellerInfoDTO(toTravellerInfoDTO(bookingInfo.getTravellerInfo()))

                .build();
    }

    public BookingIdDTO convertToBookingIdDto(CreateBookingCountDTO getBookingId) {
        return  BookingIdDTO.builder()
                .booking_id(getBookingId.getBooking_id())
                .build();
    }

//    public ListDTO<MyBookingsDTO> convertToBookingInfoDTO(List<MyBookingsDTO> all) {
//
//        List<BookingInfoDTO> list = new ArrayList<>();
//        for(BookingInfo bookingInfo: all)
//        {
//            logger.info(String.valueOf(bookingInfo));
//            list.add(convertToBookingInfoDTO(bookingInfo));
//        }
//
//        return new ListDTO<>(list);
//    }
//
//    public ListDTO<BookingInfoDTO> convertToBookingInfoDTO(List<MyBookingsDTO> myBookings) {
//
//
//    }
}
