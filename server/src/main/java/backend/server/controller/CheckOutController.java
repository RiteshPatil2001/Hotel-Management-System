package backend.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.server.models.Bookings;
import backend.server.services.CheckOutService;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/actions")
public class CheckOutController {
	@Autowired
	private CheckOutService checkOutService;

    @PutMapping("/checkout")
    public Bookings checkout(@RequestBody Bookings request) {
        return checkOutService.checkOut(request);
    }
	

}

