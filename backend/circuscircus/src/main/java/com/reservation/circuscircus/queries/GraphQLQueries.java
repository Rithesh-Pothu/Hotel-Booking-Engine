package com.reservation.circuscircus.queries;

public interface GraphQLQueries {
    String nightlyRatesQuery =
            "query MyQuery {\n" +
                    "  listRooms(where: {property_id: {equals: %s}}) {\n" +
                    "    room_type {\n" +
                    "      room_rates {\n" +
                    "        room_rate {\n" +
                    "          basic_nightly_rate\n" +
                    "          date\n" +
                    "        }\n" +
                    "      }\n" +
                    "    }\n" +
                    "  }\n" +
                    "}";
    String roomDetailsQuery =
            "query MyQuery {\n" +
                    "  listRoomTypes(where: {property_id: {equals: 3}}) {\n" +
                    "    room_type_id \n"+
                    "    area_in_square_feet\n" +
                    "    double_bed\n" +
                    "    max_capacity\n" +
                    "    room_type_name\n" +
                    "    single_bed\n" +
                    "    room_rates {\n" +
                    "      room_rate {\n" +
                    "        basic_nightly_rate\n" +
                    "        date\n" +
                    "      }\n" +
                    "    }\n" +
                    "  }\n" +
                    "}";

    String createGuestMutation =
            "\n" +
                    "mutation MyMutation($guest_name: String = \"%s\") {\n" +
                    "  createGuest(data: {guest_name: $guest_name}) {\n" +
                    "    guest_id\n" +
                    "    guest_name\n" +
                    "  }\n" +
                    "}\n";

    String listPromotions =
            "query MyQuery {\n" +
            "  listPromotions {\n" +
            "    is_deactivated\n" +
            "    minimum_days_of_stay\n" +
            "    price_factor\n" +
            "    promotion_description\n" +
            "    promotion_id\n" +
            "    promotion_title\n" +
            "  }\n" +
            "}";

    String getPromotion =
            "query MyQuery {\n" +
                    "  getPromotion(where: {promotion_id: %s}) {\n" +
                    "    promotion_title\n" +
                    "    promotion_id\n" +
                    "    promotion_description\n" +
                    "    price_factor\n" +
                    "  }\n" +
                    "}\n";

    String createBookingMutation =
            "mutation MyMutation($adult_count: Int = %s, $amount_due_at_resort: Int = %s, $check_in_date: AWSDateTime = \"%s\", $check_out_date: AWSDateTime = \"%s\", $child_count: Int = %s, $guest_id: Int = %s, $promotion_id: Int = %s, $property_id: Int = %s, $status_id: Int = %s, $total_cost: Int = %s) {\n" +
                    "createBooking(data: {total_cost: $total_cost, status_id: $status_id, property_id: $property_id, promotion_id: $promotion_id, guest_id: $guest_id, check_out_date: $check_out_date, child_count: $child_count, check_in_date: $check_in_date, amount_due_at_resort: $amount_due_at_resort, adult_count: $adult_count}) {\n" +
                    "    booking_id\n" +
                    "  }" +
                    "}\n";


    String getBookingIdByGuestIdAndPropertyId = "query MyQuery($equals1: Int = %s, $equals2: Int = %s) {\n" +
            "  listBookings(where: {guest_id: {equals: $equals1}, property_id: {equals: $equals2}}) {\n" +
            "    booking_id\n" +
            "  }\n" +
            "}\n";

    String listRoomAvailabilitiesQuery = "query MyQuery($equals: Int = 0, $equals1: Int = %s, $equals2: Int = %s, $gte: AWSDateTime = \"%s\", $lte: AWSDateTime = \"%s\") {\n" +
            "  listRoomAvailabilities(where: {booking_id: {equals: $equals}, property_id: {equals: $equals1}, room: {room_type_id: {equals: $equals2}}, date: {gte: $gte, lte: $lte}}, orderBy: {room_id: ASC}) {\n" +
            "    availability_id\n" +
            "    booking_id\n" +
            "    date\n" +
            "    property_id\n" +
            "    room_id\n" +
            "  }\n" +
            "}\n";

    String getRoomNumberAndTypeIdByRoomId = "query MyQuery($property_id: Int = %s, $room_id: Int = %s) {\n" +
            "  getRoom(where: {property_id: $property_id, room_id: $room_id}) {\n" +
            "    room_number\n" +
            "    room_type_id\n" +
            "  }\n" +
            "}\n";

    String getListOfRoomsForRoomType = "query MyQuery($equals: Int = %s, $equals1: Int = %s) {\n" +
            "  listRooms(where: {room_type_id: {equals: $equals}, property_id: {equals: $equals1}}, orderBy: {room_id: ASC}) {\n" +
            "    room_id\n" +
            "    room_number\n" +
            "  }\n" +
            "}\n";

    String countRoomAvailabilitiesQuery ="query MyQuery($gte: AWSDateTime = \"%s\", $lte: AWSDateTime = \"%s\", $equals: Int = 0, $equals1: Int = %s, $equals2: Int = %s) {\n" +
            "  countRoomAvailabilities(where: {booking_id: {equals: $equals}, property_id: {equals: $equals1}, room_id: {equals: $equals2}, date: {gte: $gte, lte: $lte}})\n" +
            "}\n";
    String getRoomAvailabilityIdWithRoomIdAndDate = "query MyQuery($equals: AWSDateTime = \"%s\", $equals1: Int = %s) {\n" +
            "  listRoomAvailabilities(where: {room_id: {equals: $equals1}, date: {equals: $equals}}) {\n" +
            "    availability_id\n" +
            "  }\n" +
            "}\n";

    String updateRoomAvailabilityQuery = "mutation MyMutation($availability_id: Int = %s, $booking_id: Int = %s) {\n" +
            "  updateRoomAvailability(data: {booking_id: $booking_id}, where: {availability_id: $availability_id}) {\n" +
            "    booking_id\n" +
            "  }\n" +
            "}\n";


    String getBookingDetailsByBookingId = "query MyQuery($booking_id: Int = %s) {\n" +
            "  getBooking(where: {booking_id: $booking_id}) {\n" +
            "    adult_count\n" +
            "    amount_due_at_resort\n" +
            "    booking_id\n" +
            "    check_in_date\n" +
            "    check_out_date\n" +
            "    child_count\n" +
            "    guest_id\n" +
            "    promotion_id\n" +
            "    property_id\n" +
            "    status_id\n" +
            "    total_cost\n" +
            "    room_booked {\n" +
            "      room {\n" +
            "        room_type_id\n" +
            "      }\n" +
            "    }\n" +
            "  }\n" +
            "}\n";


    String getRoomTypeNameById = "query MyQuery($room_type_id: Int = %s) {\n" +
            "  getRoomType(where: {room_type_id: $room_type_id}) {\n" +
            "    room_type_name\n" +
            "  }\n" +
            "}\n";

    String deleteRoomAvailabilitiesByBookingId = "mutation MyMutation {\n" +
            "  deleteManyRoomAvailabilities(where: {booking_id: {equals: %s}}) {\n" +
            "    count\n" +
            "  }\n" +
            "}";
}
