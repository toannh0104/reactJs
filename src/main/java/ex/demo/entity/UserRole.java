package ex.demo.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by Toan_H on 8/16/2016.
 */
@Entity
public class UserRole {

    public static final String GENERAL_ROLE = "1";
    public static final String QUANLITY_ASSURANCE_ROLE = "2";
    public static final String ADD_OBSERVATION_ROLE = "3";
    public static final String SYSTEM_ADMIN_ROLE = "4";

    @Id
    @GeneratedValue
    private Long id;
    private long staffId;
    private boolean general;
    private boolean qualityAssurance;
    private boolean addObservation;
    private boolean systemAdministration;

    public UserRole() {
    }

    public UserRole(long staffId,
                    boolean general,
                    boolean qualityAssurance,
                    boolean addObservation,
                    boolean systemAdministration) {
        this.staffId = staffId;
        this.general = general;
        this.qualityAssurance = qualityAssurance;
        this.addObservation = addObservation;
        this.systemAdministration = systemAdministration;
    }

    public Long getId() {
        return id;
    }

    public long getStaffId() {
        return staffId;
    }

    public void setStaffId(long staffId) {
        this.staffId = staffId;
    }

    public boolean isGeneral() {
        return general;
    }

    public void setGeneral(boolean general) {
        this.general = general;
    }

    public boolean isQualityAssurance() {
        return qualityAssurance;
    }

    public void setQualityAssurance(boolean qualityAssurance) {
        this.qualityAssurance = qualityAssurance;
    }

    public boolean isAddObservation() {
        return addObservation;
    }

    public void setAddObservation(boolean addObservation) {
        this.addObservation = addObservation;
    }

    public boolean isSystemAdministration() {
        return systemAdministration;
    }

    public void setSystemAdministration(boolean systemAdministration) {
        this.systemAdministration = systemAdministration;
    }
}
