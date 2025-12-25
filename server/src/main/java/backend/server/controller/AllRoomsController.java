package backend.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.server.models.Bookings;
import backend.server.models.Rooms;
import backend.server.services.RoomsService;
import backend.server.types.MaintenanceRequest;

@RestController
@RequestMapping("/api/rooms")
public class AllRoomsController {

    @Autowired
    private RoomsService roomsService;

    @GetMapping("/available")
    public List<Rooms> getAvailableRooms() {
        return roomsService.getAllAvailableRooms();
    }
    
    @GetMapping("/all")
    public List<Rooms> getAllRooms() {
        return roomsService.getAllRooms();
    }
    
    @GetMapping("/blocked")
    public List<Rooms> getBlockedRooms() {
        return roomsService.getBlockedRooms();
    }
    
    @PostMapping("/addroomtomaintainace")
    public int addRoomToMaintainace(@RequestBody MaintenanceRequest request) {
        return roomsService.blockRoom(request);
    }
    
    @PostMapping("/removeroomtomaintainace")
    public int removeRoomToMaintainace(@RequestBody int roomNumber) {
        return roomsService.unBlockRoom(roomNumber);
    }
}
