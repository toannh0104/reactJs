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

import ex.demo.entity.*;
import ex.demo.repository.*;
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
    private final UserRoleRepository userRoleRepository;
    private final PhotoRepository photoRepository;

    @Autowired
    public DatabaseLoader(EmployeeRepository employeeRepository,
                          ManagerRepository managerRepository,
                          ObservationRepository observationRepository,
                          UserRoleRepository userRoleRepository,
                          PhotoRepository photoRepository) {

        this.employees = employeeRepository;
        this.managers = managerRepository;
        this.observationRepository = observationRepository;
        this.userRoleRepository = userRoleRepository;
        this.photoRepository = photoRepository;
    }

    @Override
    public void run(String... strings) throws Exception {

        Manager greg = this.managers.save(new Manager("greg", "turnquist",
                new String[]{"ROLE_MANAGER", "ROLE_ADMIN"}));
        Manager oliver = this.managers.save(new Manager("oliver", "gierke",
                new String[]{"ROLE_MANAGER", "ROLE_ADMIN"}));

        Manager viewer = this.managers.save(new Manager("viewer", "viewer",
                "ROLE_MANAGER"));
        Manager editor = this.managers.save(new Manager("editor", "editor",
                "ROLE_MANAGER"));
        Manager creator = this.managers.save(new Manager("creator", "creator",
                "ROLE_MANAGER"));

        UserRole userRole001 = new UserRole(oliver.getId(), true, true, true, true);

        UserRole userRoleViewer = new UserRole(viewer.getId(), true, false, false, false);
        UserRole userRoleEditor = new UserRole(editor.getId(), true, true, false, false);
        UserRole userRoleCreator = new UserRole(creator.getId(), true, false, true, false);

//        UserRole userRole005 = new UserRole(oliver.getId(), true, true, true, false);

        userRoleRepository.save(userRole001);
        userRoleRepository.save(userRoleViewer);
        userRoleRepository.save(userRoleEditor);
        userRoleRepository.save(userRoleCreator);


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

        Observation obs11 = new Observation(1L, "1", "React Study", "Beginer", new Date(), "Some note....");
        Observation obs12 = new Observation(2L, "1", "React Study", "Element", new Date(), "Some note....");
        Observation obs13 = new Observation(3L, "1", "React Study", "Professional", new Date(), "Some note....");

        Observation obs21 = new Observation(4L, "2", "React Study", "Beginer", new Date(), "Some note....");
        Observation obs22 = new Observation(5L, "2", "React Study", "Element", new Date(), "Some note....");
        Observation obs31 = new Observation(6L, "3", "React Study", "Professional", new Date(), "Some note....");

        this.observationRepository.save(obs11);
        this.observationRepository.save(obs12);
        this.observationRepository.save(obs13);

        this.observationRepository.save(obs21);
        this.observationRepository.save(obs22);

        this.observationRepository.save(obs31);

        Photo p1 = new Photo("Title 001",1, "https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12552326_495932673919321_1443393332_n.jpg");
        Photo p2 = new Photo("Title 002", 11, "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12407344_1283694208323785_735653395_n.jpg");
        Photo p3 = new Photo("Title 003",  111,"https://scontent.cdninstagram.com/hphotos-xpf1/t51.2885-15/e35/923995_1704188643150533_1383710275_n.jpg");
        Photo p4 = new Photo("Title 004",2,  "https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12407480_1654828594805097_152207166_n.jpg");
        Photo p5 = new Photo("Title 005",22,  "https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/11875511_1562439187344831_813588280_n.jpg");
        Photo p6 = new Photo("Title 006", 222, "https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/e35/11917950_927755223968499_1198055371_n.jpg");

        photoRepository.save(p1);
        photoRepository.save(p2);
        photoRepository.save(p3);
        photoRepository.save(p4);
        photoRepository.save(p5);
        photoRepository.save(p6);
        SecurityContextHolder.clearContext();
    }
}