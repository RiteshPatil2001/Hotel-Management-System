package backend.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.server.models.Bookings;
import backend.server.repository.BookingsRepository;

@Service
public class BookingsServices {
	@Autowired
	private BookingsRepository bookingsRepository;
	
	public List<Bookings> getAllBookings(){
		return bookingsRepository.findAll();
	}
		
	public List<Bookings> getAllActiveBookings(){
		return bookingsRepository.findByCheckout(false);
	}
	
	public List<Bookings> getAllHistoryBookings(){
		return bookingsRepository.findByCheckout(true);
	}

}
