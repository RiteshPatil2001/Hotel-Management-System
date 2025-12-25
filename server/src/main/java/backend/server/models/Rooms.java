package backend.server.models;

import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class Rooms {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "floor_number", nullable = false)
    private int floorNumber;

    @Column(name = "room_number", nullable = false, unique = true)
    private int roomNumber;

    @Column(name = "status", nullable = false)
    private String status; 
    
    @Column(name = "price", nullable = false)
    private double price;
    
    @Column(name = "maintaance_reason", nullable = true)
    private String maintaince;
    
    // Constructors
    public Rooms() {}

    public Rooms(int roomNumber, String status) {
        this.roomNumber = roomNumber;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public int getFloorNumber() { return floorNumber; }
    public void setFloorNumber(int floorNumber) { this.floorNumber = floorNumber; }

    public int getRoomNumber() { return roomNumber; }
    public void setRoomNumber(int roomNumber) { this.roomNumber = roomNumber; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getMaintaince() {
		return maintaince;
	}

	public void setMaintaince(String maintaince) {
		this.maintaince = maintaince;
	}
	
	
    
    
}
