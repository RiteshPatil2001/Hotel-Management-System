package backend.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.server.models.Bookings;

public interface CheckoutRepository extends JpaRepository<Bookings, Long> {
	
}
