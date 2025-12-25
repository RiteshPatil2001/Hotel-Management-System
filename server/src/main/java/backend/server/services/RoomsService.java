package backend.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.server.models.Rooms;
import backend.server.repository.RoomsRepository;
import backend.server.types.MaintenanceRequest;
import jakarta.transaction.Transactional;

@Service
public class RoomsService {

    @Autowired
    private RoomsRepository roomsRepository;

    // Fetch all rooms with status 'available'
    public List<Rooms> getAllAvailableRooms() {
        return roomsRepository.findByStatus("available");
    }
    
    // Fetch all rooms with status 'blocked'
    public List<Rooms> getBlockedRooms() {
        return roomsRepository.findByStatus("blocked");
    }
    
    public List<Rooms> getAllRooms(){
    	return roomsRepository.findAll();
    }

    public void updateStatusToBookedOfRoom(Integer roomNumber) {
        roomsRepository.updateRoomStatus(roomNumber, "booked");
    }
    
    public void updateStatusToAvailableOfRoom(Integer roomNumber) {
        roomsRepository.updateRoomStatus(roomNumber, "available");
    }
    
    public double calculateTotalPrice(List<Integer> roomNumbers) {
        List<Rooms> selectedRooms = roomsRepository.findByRoomNumbers(roomNumbers);

        return selectedRooms.stream()
                .mapToDouble(Rooms::getPrice)
                .sum();
    }
	
    @Transactional
    public int blockRoom(MaintenanceRequest request) {
        roomsRepository.updateRoomStatusAndReason(request.getRoomNumber(), "blocked", request.getReason());
        return 200;
    }

    @Transactional
	public int unBlockRoom(int roomNumber) {
		roomsRepository.updateRoomStatusAndReason(roomNumber, "available", "");
		return 200;
	}

    
    
}
