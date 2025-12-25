package backend.server.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "bookings")
public class Bookings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "customer_id", nullable = false, unique = true)
    private String customerId;

    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "is_foreign_client", nullable = false)
    private boolean isForeignClient;

    @Column(name = "total_bookings", nullable = false)
    private int totalBookings;

    @Column(name = "member_name", nullable = false)
    private String otherMembers;

    @Column(name = "full_address", nullable = false)
    private String fullAddress;

    @Column(name = "idType", nullable = false)
    private String idType;
    
    @Column(name = "idDetails", nullable = false)
    private String idDetails;

    @Column(name = "rooms_count", nullable = false)
    private int roomsCount;

    @Column(name = "room_numbers", nullable = false)
    private String roomNumbers;
    
    @Column(name = "per_day_bill", nullable = false)
    private Double perDayBill;
    
    @Column(name = "total_days", nullable = false)
    private int totalDays;

    @Column(name = "total_bill", nullable = false)
    private Double totalBill;

    @Column(name = "paymentMethod", nullable = true)
    private String paymentMethod;
    
    @Column(name = "paymentDateTime", nullable = true)
    private LocalDateTime paymentDateTime;

    @Column(name = "checkInDate", nullable = false)
    private LocalDateTime checkInDate;
    
    @Column(name = "checkOutDate", nullable = true)
    private LocalDateTime checkOutDate;
    
    @Column(name = "checkout", nullable = false)
    private boolean checkout;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public boolean isForeignClient() {
		return isForeignClient;
	}

	public void setForeignClient(boolean isForeignClient) {
		this.isForeignClient = isForeignClient;
	}

	public int getTotalBookings() {
		return totalBookings;
	}

	public void setTotalBookings(int totalBookings) {
		this.totalBookings = totalBookings;
	}

	public String getOtherMembers() {
		return otherMembers;
	}

	public void setOtherMembers(String otherMembers) {
		this.otherMembers = otherMembers;
	}

	public String getFullAddress() {
		return fullAddress;
	}

	public void setFullAddress(String fullAddress) {
		this.fullAddress = fullAddress;
	}

	public String getIdType() {
		return idType;
	}

	public void setIdType(String idType) {
		this.idType = idType;
	}

	public String getIdDetails() {
		return idDetails;
	}

	public void setIdDetails(String idDetails) {
		this.idDetails = idDetails;
	}

	public int getRoomsCount() {
		return roomsCount;
	}

	public void setRoomsCount(int roomsCount) {
		this.roomsCount = roomsCount;
	}

	public String getRoomNumbers() {
		return roomNumbers;
	}

	public void setRoomNumbers(String roomNumbers) {
		this.roomNumbers = roomNumbers;
	}

	public Double getPerDayBill() {
		return perDayBill;
	}

	public void setPerDayBill(Double perDayBill) {
		this.perDayBill = perDayBill;
	}

	public int getTotalDays() {
		return totalDays;
	}

	public void setTotalDays(int totalDays) {
		this.totalDays = totalDays;
	}

	public Double getTotalBill() {
		return totalBill;
	}

	public void setTotalBill(Double totalBill) {
		this.totalBill = totalBill;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public LocalDateTime getPaymentDateTime() {
		return paymentDateTime;
	}

	public void setPaymentDateTime(LocalDateTime paymentDateTime) {
		this.paymentDateTime = paymentDateTime;
	}

	public LocalDateTime getCheckInDate() {
		return checkInDate;
	}

	public void setCheckInDate(LocalDateTime checkInDate) {
		this.checkInDate = checkInDate;
	}

	public LocalDateTime getCheckOutDate() {
		return checkOutDate;
	}

	public void setCheckOutDate(LocalDateTime checkOutDate) {
		this.checkOutDate = checkOutDate;
	}

	public boolean getCheckout() {
		return checkout;
	}

	public void setCheckout(boolean checkout) {
		this.checkout = checkout;
	}	
}
