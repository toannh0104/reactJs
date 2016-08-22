package ex.demo.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by Toan_H on 8/16/2016.
 */
@Entity
@Data
public class ReferenceRating {
    @Id
    @GeneratedValue
    private Long id;

    private String rating;
}
