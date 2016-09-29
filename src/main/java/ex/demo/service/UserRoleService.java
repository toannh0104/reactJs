package ex.demo.service;

import ex.demo.repository.ManagerRepository;
import ex.demo.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Toan_H on 8/24/2016.
 */

@Service
public class UserRoleService {
    @Autowired
    ManagerRepository managerRepository;
    @Autowired
    UserRoleRepository userRoleRepository;
}
