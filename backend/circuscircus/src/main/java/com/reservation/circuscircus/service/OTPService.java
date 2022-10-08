package com.reservation.circuscircus.service;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import com.reservation.circuscircus.dto.OTPVerificationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.google.common.cache.LoadingCache;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;

@Service
public class OTPService {

    @Autowired
    private EmailService emailService;
    @Autowired
    private GraphQLService graphQLService;

    private static final Integer EXPIRE_MINS = 5;
    private final LoadingCache otpCache;
    public OTPService(){
        super();
        otpCache = CacheBuilder.newBuilder().
                expireAfterWrite(EXPIRE_MINS, TimeUnit.MINUTES)
                .build(new CacheLoader() {
                    @Override
                    public Object load(Object o) throws Exception {
                        return 0;
                    }
                });
    }

    public Integer generateOTP(String key){
        Random random = new Random();
        Integer otp = 100000 + random.nextInt(900000);
        otpCache.put(key, otp);
        return otp;
    }

    public Integer getOtp(String key){
        try{
            return (Integer) otpCache.get(key);
        }catch (Exception e){
            return 0;
        }
    }

    public void clearOTP(String key){
        otpCache.invalidate(key);
    }

    public void sendOtpMail(String receipient, String bookingId){
        Integer otp = generateOTP(bookingId);
        emailService.sendOtpMessage(receipient, otp, bookingId);
    }

    public OTPVerificationDTO validateOtp(Map<String, String> otpDetails){
        Integer currentOtp = getOtp(otpDetails.get("bookingId"));
        Integer receivedOtp = Integer.parseInt(otpDetails.get("otp"));
        OTPVerificationDTO response = null;
        if(currentOtp.equals(receivedOtp)){
            response = new OTPVerificationDTO(true, "Verified and Cancelled the Booking!");
            graphQLService.cancelBooking(Long.valueOf(otpDetails.get("bookingId")));
        }
        else {
            response = new OTPVerificationDTO(false, "Not Verified!");
        }
        return response;
    }

}