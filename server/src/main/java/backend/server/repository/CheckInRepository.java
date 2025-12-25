package backend.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import backend.server.models.Bookings;

@Repository
public interface CheckInRepository extends JpaRepository<Bookings, Long>{
	Optional<Bookings> findByCustomerId(String customerId);
}
