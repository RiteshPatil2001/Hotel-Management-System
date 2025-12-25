package backend.server.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.server.models.Bookings;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings, Long> {
	List<Bookings> findAll();
	
	List<Bookings> findByCheckout(boolean checkout);
}
