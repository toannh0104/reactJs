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
public class AssessStrengthImprovement {

    @Id
    @GeneratedValue
    private Long id;
    private long observationId;
    private long refStrengthImproveId;
    private boolean strength;
    private boolean improvement;
    private String evidence;

}
