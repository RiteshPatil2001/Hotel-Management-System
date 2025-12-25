package backend.server.services;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.server.models.Bookings;
import backend.server.repository.CheckInRepository;

@Service
public class CheckOutService {
	@Autowired
	private CheckInRepository checkInRepository;
	
	@Autowired
	private RoomsService roomService;

    public Bookings checkOut(Bookings checkOutData) {
        Bookings booking = checkInRepository.findByCustomerId(checkOutData.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setPaymentMethod(checkOutData.getPaymentMethod());
        booking.setPaymentDateTime(checkOutData.getPaymentDateTime());
        booking.setCheckOutDate(checkOutData.getCheckOutDate());
        booking.setCheckout(checkOutData.getCheckout());
        booking.setTotalBill(checkOutData.getTotalBill());
        booking.setTotalDays(checkOutData.getTotalDays());
        String roomNumbersStr = checkOutData.getRoomNumbers();
		List<Integer> roomNumbers = Arrays.stream(roomNumbersStr.split(","))
		                                  .map(String::trim)
		                                  .map(Integer::parseInt)
		                                  .collect(Collectors.toList());
		for (Integer room : roomNumbers) {
			roomService.updateStatusToAvailableOfRoom(room);
		}
        return checkInRepository.save(booking);
    }

}
