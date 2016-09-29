package ex.demo.repository;

import ex.demo.entity.Observation;
import ex.demo.entity.UserRole;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by Toan_H on 8/24/2016.
 */
@RepositoryRestResource
public interface UserRoleRepository extends PagingAndSortingRepository<UserRole, Long> {
    List<UserRole> findRoleByStaffId(@Param("staffId") long staffId);

}
