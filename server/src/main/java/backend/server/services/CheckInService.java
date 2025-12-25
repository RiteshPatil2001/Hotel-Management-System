package backend.server.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.server.models.Bookings;
import backend.server.repository.CheckInRepository;

@Service
public class CheckInService {
	@Autowired
	private CheckInRepository checkInRepository;
	
	@Autowired
	private RoomsService roomService;

	public Bookings checkIn(Bookings checkInData) {
	    String roomNumbersStr = checkInData.getRoomNumbers();

	    // Split comma-separated room numbers into list
	    List<Integer> roomNumbers = Arrays.stream(roomNumbersStr.split(","))
	            .map(String::trim)
	            .map(Integer::parseInt)
	            .collect(Collectors.toList());

	    // Update status of each room
	    for (Integer room : roomNumbers) {
	        roomService.updateStatusToBookedOfRoom(room);
	    }

	    // Calculate per-day bill
	    double totalPerDayBill = roomService.calculateTotalPrice(roomNumbers);
	    checkInData.setPerDayBill(totalPerDayBill);

	    LocalDate checkInDate = checkInData.getCheckInDate().toLocalDate(); // convert LocalDateTime → LocalDate
	    LocalDate today = LocalDate.now();
	    int totalDays = (int) ChronoUnit.DAYS.between(checkInDate, today);
	    if (totalDays == 0) {
	        totalDays = 1;
	    }
	    checkInData.setTotalDays(totalDays);
	    checkInData.setTotalBill(totalDays * totalPerDayBill);
	    return checkInRepository.save(checkInData);
	}

}
