package ex.demo.controller;

import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Toan_H on 8/29/2016.
 */
@RepositoryRestController
public class StaffController {

    @RequestMapping(value = "/staffs/{id}", method = RequestMethod.PUT)
    public void deleteStaff(@PathVariable Long id) {
        System.out.println("staff id  : " +id);
    }
}
