/*
 * Copyright 2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package ex.demo.configuration;

import ex.demo.entity.Manager;
import ex.demo.entity.Observation;
import ex.demo.entity.Staff;
import ex.demo.repository.EmployeeRepository;
import ex.demo.repository.ManagerRepository;
import ex.demo.repository.ObservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @author Greg Turnquist
 */
@Component
public class DatabaseLoader implements CommandLineRunner {

    private final EmployeeRepository employees;
    private final ManagerRepository managers;
    private final ObservationRepository observationRepository;

    @Autowired
    public DatabaseLoader(EmployeeRepository employeeRepository,
                          ManagerRepository managerRepository,
                          ObservationRepository observationRepository) {

        this.employees = employeeRepository;
        this.managers = managerRepository;
        this.observationRepository = observationRepository;
    }

    @Override
    public void run(String... strings) throws Exception {

        Manager greg = this.managers.save(new Manager("greg", "turnquist",
                "ROLE_MANAGER"));
        Manager oliver = this.managers.save(new Manager("oliver", "gierke",
                "ROLE_MANAGER"));

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("greg", "doesn't matter",
                        AuthorityUtils.createAuthorityList("ROLE_MANAGER")));

        this.employees.save(new Staff("Frodo", "Baggins", "ring bearer", greg));
        this.employees.save(new Staff("Bilbo", "Baggins", "burglar", greg));
        this.employees.save(new Staff("Gandalf", "the Grey", "wizard", greg));

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("oliver", "doesn't matter",
                        AuthorityUtils.createAuthorityList("ROLE_MANAGER")));

        this.employees.save(new Staff("Samwise", "Gamgee", "gardener", oliver));
        this.employees.save(new Staff("Merry", "Brandybuck", "pony rider", oliver));
        this.employees.save(new Staff("Peregrin", "Took", "pipe smoker", oliver));

        Observation obs1 = new Observation(1L, "1", "React Study", "Beginer", new Date(), "Some note....");
        Observation obs2 = new Observation(2L, "1", "React Study", "Element", new Date(), "Some note....");
        Observation obs3 = new Observation(3L, "1", "React Study", "Professional", new Date(), "Some note....");

        this.observationRepository.save(obs1);
        this.observationRepository.save(obs2);
        this.observationRepository.save(obs3);
        SecurityContextHolder.clearContext();
    }
}