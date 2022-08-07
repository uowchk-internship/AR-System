package com.example.arsystembackend.entity.source;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Argo10 {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "cohort")
    private String cohort;
    @Basic
    @Column(name = "internal_id")
    private String internalId;
    @Basic
    @Column(name = "student_id")
    private String studentId;
    @Basic
    @Column(name = "last_name")
    private String lastName;
    @Basic
    @Column(name = "first_name")
    private String firstName;
    @Basic
    @Column(name = "middle_name")
    private String middleName;
    @Basic
    @Column(name = "enrol_year_term")
    private String enrolYearTerm;
    @Basic
    @Column(name = "prog_code")
    private String progCode;
    @Basic
    @Column(name = "stud_status")
    private String studStatus;
    @Basic
    @Column(name = "dept_code")
    private String deptCode;
    @Basic
    @Column(name = "block_code")
    private String blockCode;
    @Basic
    @Column(name = "shrtckn_term_code")
    private String shrtcknTermCode;
    @Basic
    @Column(name = "shrtckn_subj_code")
    private String shrtcknSubjCode;
    @Basic
    @Column(name = "shrtckn_crse_numb")
    private String shrtcknCrseNumb;
    @Basic
    @Column(name = "shrtckn_crse_title")
    private String shrtcknCrseTitle;
    @Basic
    @Column(name = "shrtckg_credit_hours")
    private Integer shrtckgCreditHours;
    @Basic
    @Column(name = "shrtckg_hours_attempted")
    private Integer shrtckgHoursAttempted;
    @Basic
    @Column(name = "shrtckg_grde_code_final")
    private String shrtckgGrdeCodeFinal;
    @Basic
    @Column(name = "exclude_subject")
    private String excludeSubject;
    @Basic
    @Column(name = "grade_point")
    private Integer gradePoint;
    @Basic
    @Column(name = "count_gpa_ind")
    private String countGpaInd;
    @Basic
    @Column(name = "inst_name")
    private String instName;
    @Basic
    @Column(name = "attempted_ind")
    private String attemptedInd;
    @Basic
    @Column(name = "passed_ind")
    private String passedInd;
    @Basic
    @Column(name = "completed_ind")
    private String completedInd;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCohort() {
        return cohort;
    }

    public void setCohort(String cohort) {
        this.cohort = cohort;
    }

    public String getInternalId() {
        return internalId;
    }

    public void setInternalId(String internalId) {
        this.internalId = internalId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getEnrolYearTerm() {
        return enrolYearTerm;
    }

    public void setEnrolYearTerm(String enrolYearTerm) {
        this.enrolYearTerm = enrolYearTerm;
    }

    public String getProgCode() {
        return progCode;
    }

    public void setProgCode(String progCode) {
        this.progCode = progCode;
    }

    public String getStudStatus() {
        return studStatus;
    }

    public void setStudStatus(String studStatus) {
        this.studStatus = studStatus;
    }

    public String getDeptCode() {
        return deptCode;
    }

    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getBlockCode() {
        return blockCode;
    }

    public void setBlockCode(String blockCode) {
        this.blockCode = blockCode;
    }

    public String getShrtcknTermCode() {
        return shrtcknTermCode;
    }

    public void setShrtcknTermCode(String shrtcknTermCode) {
        this.shrtcknTermCode = shrtcknTermCode;
    }

    public String getShrtcknSubjCode() {
        return shrtcknSubjCode;
    }

    public void setShrtcknSubjCode(String shrtcknSubjCode) {
        this.shrtcknSubjCode = shrtcknSubjCode;
    }

    public String getShrtcknCrseNumb() {
        return shrtcknCrseNumb;
    }

    public void setShrtcknCrseNumb(String shrtcknCrseNumb) {
        this.shrtcknCrseNumb = shrtcknCrseNumb;
    }

    public String getShrtcknCrseTitle() {
        return shrtcknCrseTitle;
    }

    public void setShrtcknCrseTitle(String shrtcknCrseTitle) {
        this.shrtcknCrseTitle = shrtcknCrseTitle;
    }

    public Integer getShrtckgCreditHours() {
        return shrtckgCreditHours;
    }

    public void setShrtckgCreditHours(Integer shrtckgCreditHours) {
        this.shrtckgCreditHours = shrtckgCreditHours;
    }

    public Integer getShrtckgHoursAttempted() {
        return shrtckgHoursAttempted;
    }

    public void setShrtckgHoursAttempted(Integer shrtckgHoursAttempted) {
        this.shrtckgHoursAttempted = shrtckgHoursAttempted;
    }

    public String getShrtckgGrdeCodeFinal() {
        return shrtckgGrdeCodeFinal;
    }

    public void setShrtckgGrdeCodeFinal(String shrtckgGrdeCodeFinal) {
        this.shrtckgGrdeCodeFinal = shrtckgGrdeCodeFinal;
    }

    public String getExcludeSubject() {
        return excludeSubject;
    }

    public void setExcludeSubject(String excludeSubject) {
        this.excludeSubject = excludeSubject;
    }

    public Integer getGradePoint() {
        return gradePoint;
    }

    public void setGradePoint(Integer gradePoint) {
        this.gradePoint = gradePoint;
    }

    public String getCountGpaInd() {
        return countGpaInd;
    }

    public void setCountGpaInd(String countGpaInd) {
        this.countGpaInd = countGpaInd;
    }

    public String getInstName() {
        return instName;
    }

    public void setInstName(String instName) {
        this.instName = instName;
    }

    public String getAttemptedInd() {
        return attemptedInd;
    }

    public void setAttemptedInd(String attemptedInd) {
        this.attemptedInd = attemptedInd;
    }

    public String getPassedInd() {
        return passedInd;
    }

    public void setPassedInd(String passedInd) {
        this.passedInd = passedInd;
    }

    public String getCompletedInd() {
        return completedInd;
    }

    public void setCompletedInd(String completedInd) {
        this.completedInd = completedInd;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Argo10 argo10 = (Argo10) o;
        return id == argo10.id && Objects.equals(cohort, argo10.cohort) && Objects.equals(internalId, argo10.internalId) && Objects.equals(studentId, argo10.studentId) && Objects.equals(lastName, argo10.lastName) && Objects.equals(firstName, argo10.firstName) && Objects.equals(middleName, argo10.middleName) && Objects.equals(enrolYearTerm, argo10.enrolYearTerm) && Objects.equals(progCode, argo10.progCode) && Objects.equals(studStatus, argo10.studStatus) && Objects.equals(deptCode, argo10.deptCode) && Objects.equals(blockCode, argo10.blockCode) && Objects.equals(shrtcknTermCode, argo10.shrtcknTermCode) && Objects.equals(shrtcknSubjCode, argo10.shrtcknSubjCode) && Objects.equals(shrtcknCrseNumb, argo10.shrtcknCrseNumb) && Objects.equals(shrtcknCrseTitle, argo10.shrtcknCrseTitle) && Objects.equals(shrtckgCreditHours, argo10.shrtckgCreditHours) && Objects.equals(shrtckgHoursAttempted, argo10.shrtckgHoursAttempted) && Objects.equals(shrtckgGrdeCodeFinal, argo10.shrtckgGrdeCodeFinal) && Objects.equals(excludeSubject, argo10.excludeSubject) && Objects.equals(gradePoint, argo10.gradePoint) && Objects.equals(countGpaInd, argo10.countGpaInd) && Objects.equals(instName, argo10.instName) && Objects.equals(attemptedInd, argo10.attemptedInd) && Objects.equals(passedInd, argo10.passedInd) && Objects.equals(completedInd, argo10.completedInd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, cohort, internalId, studentId, lastName, firstName, middleName, enrolYearTerm, progCode, studStatus, deptCode, blockCode, shrtcknTermCode, shrtcknSubjCode, shrtcknCrseNumb, shrtcknCrseTitle, shrtckgCreditHours, shrtckgHoursAttempted, shrtckgGrdeCodeFinal, excludeSubject, gradePoint, countGpaInd, instName, attemptedInd, passedInd, completedInd);
    }

    @Override
    public String toString() {
        return "Argo10{" +
                "id=" + id +
                ", cohort='" + cohort + '\'' +
                ", internalId='" + internalId + '\'' +
                ", studentId='" + studentId + '\'' +
                ", lastName='" + lastName + '\'' +
                ", firstName='" + firstName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", enrolYearTerm='" + enrolYearTerm + '\'' +
                ", progCode='" + progCode + '\'' +
                ", studStatus='" + studStatus + '\'' +
                ", deptCode='" + deptCode + '\'' +
                ", blockCode='" + blockCode + '\'' +
                ", shrtcknTermCode='" + shrtcknTermCode + '\'' +
                ", shrtcknSubjCode='" + shrtcknSubjCode + '\'' +
                ", shrtcknCrseNumb='" + shrtcknCrseNumb + '\'' +
                ", shrtcknCrseTitle='" + shrtcknCrseTitle + '\'' +
                ", shrtckgCreditHours=" + shrtckgCreditHours +
                ", shrtckgHoursAttempted=" + shrtckgHoursAttempted +
                ", shrtckgGrdeCodeFinal='" + shrtckgGrdeCodeFinal + '\'' +
                ", excludeSubject='" + excludeSubject + '\'' +
                ", gradePoint=" + gradePoint +
                ", countGpaInd='" + countGpaInd + '\'' +
                ", instName='" + instName + '\'' +
                ", attemptedInd='" + attemptedInd + '\'' +
                ", passedInd='" + passedInd + '\'' +
                ", completedInd='" + completedInd + '\'' +
                '}';
    }
}
