package ex.demo.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by Toan_H on 8/16/2016.
 */
@Data
@Entity
public class UserRole {
    @Id
    @GeneratedValue
    private Long id;
    private long staffId;
    private boolean general;
    private boolean addObservation;
    private boolean systemAdministration;

}
