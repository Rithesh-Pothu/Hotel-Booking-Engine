package com.reservation.circuscircus.mapper;

import com.reservation.circuscircus.dto.*;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.LinkedHashMap;
import java.util.Map;

public class MinNightlyRateMapper {

    private final SimpleDateFormat dateParser = new SimpleDateFormat("dd-MM-yyyy");

    public MinNightlyRatesDTO getRates(NightlyRatesDataDTO bodyString){
        Map<String, Integer> minRates = new LinkedHashMap<>();
        ListRoomsDTO data = bodyString.getData();
        for(RoomTypeDTO roomType: data.getListRooms()){
            RoomRatesDTO roomRates = roomType.getRoom_type();
            for(RoomRateDTO roomRate: roomRates.getRoom_rates()){
                RateDateDTO rateDate = roomRate.getRoom_rate();
                String date = dateParser.format(rateDate.getDate());
                Integer basicNightlyRate = rateDate.getBasic_nightly_rate();
                if(!minRates.containsKey(date))
                    minRates.put(date, basicNightlyRate);
                else
                    minRates.compute(date, (key, curr) -> Math.min(basicNightlyRate, curr));
            }
        }
        return new MinNightlyRatesDTO(minRates);
    }
}
