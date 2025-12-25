package backend.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.server.models.Bookings;
import backend.server.services.CheckInService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/actions")
public class CheckInController {
	@Autowired
	private CheckInService checkInService;
	
	@PostMapping("/checkin")
	public Bookings customerCheckIn(@RequestBody Bookings checkInData) {
		return checkInService.checkIn(checkInData);
	}
	

}
