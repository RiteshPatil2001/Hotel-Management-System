package backend.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import backend.server.models.Rooms;

@Repository
public interface RoomsRepository extends JpaRepository<Rooms, Long> {

    List<Rooms> findByStatus(String status);
    List<Rooms> findAll();

    @Modifying
    @Transactional
    @Query("UPDATE Rooms r SET r.status = :status WHERE r.roomNumber = :roomNumber")
    void updateRoomStatus(@Param("roomNumber") Integer roomNumber, @Param("status") String status);

    @Modifying
    @Transactional
    @Query("UPDATE Rooms r SET r.status = :status, r.maintaince = :reason WHERE r.roomNumber = :roomNumber")
    void updateRoomStatusAndReason(Integer roomNumber, String status, String reason);

    @Query("SELECT r FROM Rooms r WHERE r.roomNumber IN :roomNumbers")
    List<Rooms> findByRoomNumbers(@Param("roomNumbers") List<Integer> roomNumbers);
}