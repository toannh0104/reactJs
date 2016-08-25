package ex.demo.configuration;

import ex.demo.entity.Manager;
import ex.demo.entity.UserRole;
import ex.demo.repository.EmployeeRepository;
import ex.demo.repository.ManagerRepository;
import ex.demo.repository.ObservationRepository;
import ex.demo.repository.UserRoleRepository;
import ex.demo.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * Created by Toan_H on 8/24/2016.
 */
@Component
public class CustomFilter extends OncePerRequestFilter {

    @Autowired
    ManagerRepository managerRepository;
    @Autowired
    UserRoleRepository userRoleRepository;

    public CustomFilter() {
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // Retrieve user details
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String username = authentication.getName();
            if (!"anonymousUser".equals(username) && request.getRequestURI().startsWith("/api") &&
                    managerRepository != null && userRoleRepository != null) {
                Manager manager = managerRepository.findByName(username);
                if (manager != null) {
                    boolean isAuthorized = false;
                    isAuthorized = checkRole(manager, request);
                    if (!isAuthorized) {
                        logger.error("Access denied!");
                        throw new AccessDeniedException("Access denied!");
                    }
                }
            }

        }

        // User details are not empty
        logger.debug("Continue with remaining filters");
        filterChain.doFilter(request, response);


        System.out.println(request);
    }

    public boolean checkRole(Manager manager, HttpServletRequest request) {
        String url = request.getRequestURL().toString();
        String method = request.getMethod();
        List<UserRole> userRoles = userRoleRepository.findRoleByStaffId(manager.getId());
        for (UserRole userRole : userRoles) {
            if ("GET".equals(method.toUpperCase())) {
                return userRole.isGeneral() || userRole.isSystemAdministration();
            }
            if ("PUT".equals(method.toUpperCase())) {
                return userRole.isQualityAssurance() || userRole.isSystemAdministration();
            }
            if ("POST".equals(method.toUpperCase())) {
                return userRole.isAddObservation() || userRole.isSystemAdministration();
            }

            return userRole.isSystemAdministration();
        }
        return false;
    }

}
