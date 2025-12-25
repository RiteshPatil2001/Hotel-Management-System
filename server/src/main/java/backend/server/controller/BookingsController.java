package backend.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.server.models.Bookings;
import backend.server.services.BookingsServices;

@RestController
@RequestMapping("/api/bookings")
public class BookingsController {
	@Autowired
	private BookingsServices bookingServices;
	
	@GetMapping("/all")
	public List<Bookings> getAllBookings(){
		return bookingServices.getAllBookings();
	}
	
	@GetMapping("/history") 
	public List<Bookings> getAllHistoryBookings(){
		return bookingServices.getAllHistoryBookings();
	}
	
	@GetMapping("/active")
	public List<Bookings> getAllActiveBookings(){
		return bookingServices.getAllActiveBookings();
	}
}
