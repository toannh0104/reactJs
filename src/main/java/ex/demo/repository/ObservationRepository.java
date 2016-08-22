package ex.demo.repository;

import ex.demo.entity.Observation;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by Toan_H on 8/19/2016.
 */
@RepositoryRestResource
public interface ObservationRepository extends PagingAndSortingRepository<Observation, Long> {
    List<Observation> findByStaffID(@Param("staffID") String staffID);
}
