package ex.demo.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Time;
import java.util.Date;

/**
 * Created by Toan_H on 8/16/2016.
 */

@Data
@Entity
public class Observation {
    @Id
    @GeneratedValue
    private Long id;
    private Date observationDate;
    private Time observationTime;
    private String staffID;
    private long primaryObsStaffId;
    private long secondObsStaffId;
    private String courseName;
    private int courseLevel;
    private String programme;
    private int programmeLevel;
    private int registerNoLearned;
    private int startNoLearn;
    private int lateNoLearn;
    private int totalLearn;
    private String campusLocation;
    private String department;
    private String sessionContext;
    private String note;
    private String refRatingId;
    private String ratingSummaryEval;
    private String strengthsToShare;
    private String additionalCommends;
    private int isModerated;
    private long moderateId;
    private long learningCoachStaffId;
    private long lineManagerStaffId;
    private long hodStaffId;

    public Observation() {
    }

    public Observation(Long id, String staffID,  String courseName, String programme, Date observationDate, String note) {
        this.id = id;
        this.staffID = staffID;
        this.courseName = courseName;
        this.programme = programme;
        this.observationDate = observationDate;
        this.note = note;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getObservationDate() {
        return observationDate;
    }

    public void setObservationDate(Date observationDate) {
        this.observationDate = observationDate;
    }

    public Time getObservationTime() {
        return observationTime;
    }

    public void setObservationTime(Time observationTime) {
        this.observationTime = observationTime;
    }

    public String getStaffID() {
        return staffID;
    }

    public void setStaffID(String staffID) {
        this.staffID = staffID;
    }

    public long getPrimaryObsStaffId() {
        return primaryObsStaffId;
    }

    public void setPrimaryObsStaffId(long primaryObsStaffId) {
        this.primaryObsStaffId = primaryObsStaffId;
    }

    public long getSecondObsStaffId() {
        return secondObsStaffId;
    }

    public void setSecondObsStaffId(long secondObsStaffId) {
        this.secondObsStaffId = secondObsStaffId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public int getCourseLevel() {
        return courseLevel;
    }

    public void setCourseLevel(int courseLevel) {
        this.courseLevel = courseLevel;
    }

    public String getProgramme() {
        return programme;
    }

    public void setProgramme(String programme) {
        this.programme = programme;
    }

    public int getProgrammeLevel() {
        return programmeLevel;
    }

    public void setProgrammeLevel(int programmeLevel) {
        this.programmeLevel = programmeLevel;
    }

    public int getRegisterNoLearned() {
        return registerNoLearned;
    }

    public void setRegisterNoLearned(int registerNoLearned) {
        this.registerNoLearned = registerNoLearned;
    }

    public int getStartNoLearn() {
        return startNoLearn;
    }

    public void setStartNoLearn(int startNoLearn) {
        this.startNoLearn = startNoLearn;
    }

    public int getLateNoLearn() {
        return lateNoLearn;
    }

    public void setLateNoLearn(int lateNoLearn) {
        this.lateNoLearn = lateNoLearn;
    }

    public int getTotalLearn() {
        return totalLearn;
    }

    public void setTotalLearn(int totalLearn) {
        this.totalLearn = totalLearn;
    }

    public String getCampusLocation() {
        return campusLocation;
    }

    public void setCampusLocation(String campusLocation) {
        this.campusLocation = campusLocation;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getSessionContext() {
        return sessionContext;
    }

    public void setSessionContext(String sessionContext) {
        this.sessionContext = sessionContext;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getRefRatingId() {
        return refRatingId;
    }

    public void setRefRatingId(String refRatingId) {
        this.refRatingId = refRatingId;
    }

    public String getRatingSummaryEval() {
        return ratingSummaryEval;
    }

    public void setRatingSummaryEval(String ratingSummaryEval) {
        this.ratingSummaryEval = ratingSummaryEval;
    }

    public String getStrengthsToShare() {
        return strengthsToShare;
    }

    public void setStrengthsToShare(String strengthsToShare) {
        this.strengthsToShare = strengthsToShare;
    }

    public String getAdditionalCommends() {
        return additionalCommends;
    }

    public void setAdditionalCommends(String additionalCommends) {
        this.additionalCommends = additionalCommends;
    }

    public int getIsModerated() {
        return isModerated;
    }

    public void setIsModerated(int isModerated) {
        this.isModerated = isModerated;
    }

    public long getModerateId() {
        return moderateId;
    }

    public void setModerateId(long moderateId) {
        this.moderateId = moderateId;
    }

    public long getLearningCoachStaffId() {
        return learningCoachStaffId;
    }

    public void setLearningCoachStaffId(long learningCoachStaffId) {
        this.learningCoachStaffId = learningCoachStaffId;
    }

    public long getLineManagerStaffId() {
        return lineManagerStaffId;
    }

    public void setLineManagerStaffId(long lineManagerStaffId) {
        this.lineManagerStaffId = lineManagerStaffId;
    }

    public long getHodStaffId() {
        return hodStaffId;
    }

    public void setHodStaffId(long hodStaffId) {
        this.hodStaffId = hodStaffId;
    }
}
