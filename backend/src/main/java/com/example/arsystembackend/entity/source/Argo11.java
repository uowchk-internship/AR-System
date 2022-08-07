package com.example.arsystembackend.entity.source;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Argo11 {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
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
    @Column(name = "chinese_name")
    private String chineseName;
    @Basic
    @Column(name = "hkid")
    private String hkid;
    @Basic
    @Column(name = "student_pay_no")
    private String studentPayNo;
    @Basic
    @Column(name = "gender")
    private String gender;
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
    @Column(name = "programme_title")
    private String programmeTitle;
    @Basic
    @Column(name = "campus")
    private String campus;
    @Basic
    @Column(name = "campus_email")
    private String campusEmail;
    @Basic
    @Column(name = "personal_email")
    private String personalEmail;
    @Basic
    @Column(name = "address")
    private String address;
    @Basic
    @Column(name = "mobile")
    private String mobile;
    @Basic
    @Column(name = "perm_phone")
    private String permPhone;
    @Basic
    @Column(name = "cohort")
    private String cohort;
    @Basic
    @Column(name = "cur_enrol_status_code")
    private String curEnrolStatusCode;
    @Basic
    @Column(name = "current_enrol_status")
    private String currentEnrolStatus;
    @Basic
    @Column(name = "last_enrol_term")
    private String lastEnrolTerm;
    @Basic
    @Column(name = "last_enrol_term_status")
    private String lastEnrolTermStatus;
    @Basic
    @Column(name = "acad_status_code")
    private String acadStatusCode;
    @Basic
    @Column(name = "acad_status_desc")
    private String acadStatusDesc;
    @Basic
    @Column(name = "award_class")
    private String awardClass;
    @Basic
    @Column(name = "rate_code")
    private String rateCode;
    @Basic
    @Column(name = "level")
    private String level;
    @Basic
    @Column(name = "grad_term")
    private String gradTerm;
    @Basic
    @Column(name = "passport")
    private String passport;
    @Basic
    @Column(name = "mrid")
    private String mrid;
    @Basic
    @Column(name = "student_comment")
    private String studentComment;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getChineseName() {
        return chineseName;
    }

    public void setChineseName(String chineseName) {
        this.chineseName = chineseName;
    }

    public String getHkid() {
        return hkid;
    }

    public void setHkid(String hkid) {
        this.hkid = hkid;
    }

    public String getStudentPayNo() {
        return studentPayNo;
    }

    public void setStudentPayNo(String studentPayNo) {
        this.studentPayNo = studentPayNo;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
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

    public String getProgrammeTitle() {
        return programmeTitle;
    }

    public void setProgrammeTitle(String programmeTitle) {
        this.programmeTitle = programmeTitle;
    }

    public String getCampus() {
        return campus;
    }

    public void setCampus(String campus) {
        this.campus = campus;
    }

    public String getCampusEmail() {
        return campusEmail;
    }

    public void setCampusEmail(String campusEmail) {
        this.campusEmail = campusEmail;
    }

    public String getPersonalEmail() {
        return personalEmail;
    }

    public void setPersonalEmail(String personalEmail) {
        this.personalEmail = personalEmail;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getPermPhone() {
        return permPhone;
    }

    public void setPermPhone(String permPhone) {
        this.permPhone = permPhone;
    }

    public String getCohort() {
        return cohort;
    }

    public void setCohort(String cohort) {
        this.cohort = cohort;
    }

    public String getCurEnrolStatusCode() {
        return curEnrolStatusCode;
    }

    public void setCurEnrolStatusCode(String curEnrolStatusCode) {
        this.curEnrolStatusCode = curEnrolStatusCode;
    }

    public String getCurrentEnrolStatus() {
        return currentEnrolStatus;
    }

    public void setCurrentEnrolStatus(String currentEnrolStatus) {
        this.currentEnrolStatus = currentEnrolStatus;
    }

    public String getLastEnrolTerm() {
        return lastEnrolTerm;
    }

    public void setLastEnrolTerm(String lastEnrolTerm) {
        this.lastEnrolTerm = lastEnrolTerm;
    }

    public String getLastEnrolTermStatus() {
        return lastEnrolTermStatus;
    }

    public void setLastEnrolTermStatus(String lastEnrolTermStatus) {
        this.lastEnrolTermStatus = lastEnrolTermStatus;
    }

    public String getAcadStatusCode() {
        return acadStatusCode;
    }

    public void setAcadStatusCode(String acadStatusCode) {
        this.acadStatusCode = acadStatusCode;
    }

    public String getAcadStatusDesc() {
        return acadStatusDesc;
    }

    public void setAcadStatusDesc(String acadStatusDesc) {
        this.acadStatusDesc = acadStatusDesc;
    }

    public String getAwardClass() {
        return awardClass;
    }

    public void setAwardClass(String awardClass) {
        this.awardClass = awardClass;
    }

    public String getRateCode() {
        return rateCode;
    }

    public void setRateCode(String rateCode) {
        this.rateCode = rateCode;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getGradTerm() {
        return gradTerm;
    }

    public void setGradTerm(String gradTerm) {
        this.gradTerm = gradTerm;
    }

    public String getPassport() {
        return passport;
    }

    public void setPassport(String passport) {
        this.passport = passport;
    }

    public String getMrid() {
        return mrid;
    }

    public void setMrid(String mrid) {
        this.mrid = mrid;
    }

    public String getStudentComment() {
        return studentComment;
    }

    public void setStudentComment(String studentComment) {
        this.studentComment = studentComment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Argo11 argo11 = (Argo11) o;
        return id == argo11.id && Objects.equals(internalId, argo11.internalId) && Objects.equals(studentId, argo11.studentId) && Objects.equals(lastName, argo11.lastName) && Objects.equals(firstName, argo11.firstName) && Objects.equals(middleName, argo11.middleName) && Objects.equals(chineseName, argo11.chineseName) && Objects.equals(hkid, argo11.hkid) && Objects.equals(studentPayNo, argo11.studentPayNo) && Objects.equals(gender, argo11.gender) && Objects.equals(enrolYearTerm, argo11.enrolYearTerm) && Objects.equals(progCode, argo11.progCode) && Objects.equals(studStatus, argo11.studStatus) && Objects.equals(deptCode, argo11.deptCode) && Objects.equals(blockCode, argo11.blockCode) && Objects.equals(programmeTitle, argo11.programmeTitle) && Objects.equals(campus, argo11.campus) && Objects.equals(campusEmail, argo11.campusEmail) && Objects.equals(personalEmail, argo11.personalEmail) && Objects.equals(address, argo11.address) && Objects.equals(mobile, argo11.mobile) && Objects.equals(permPhone, argo11.permPhone) && Objects.equals(cohort, argo11.cohort) && Objects.equals(curEnrolStatusCode, argo11.curEnrolStatusCode) && Objects.equals(currentEnrolStatus, argo11.currentEnrolStatus) && Objects.equals(lastEnrolTerm, argo11.lastEnrolTerm) && Objects.equals(lastEnrolTermStatus, argo11.lastEnrolTermStatus) && Objects.equals(acadStatusCode, argo11.acadStatusCode) && Objects.equals(acadStatusDesc, argo11.acadStatusDesc) && Objects.equals(awardClass, argo11.awardClass) && Objects.equals(rateCode, argo11.rateCode) && Objects.equals(level, argo11.level) && Objects.equals(gradTerm, argo11.gradTerm) && Objects.equals(passport, argo11.passport) && Objects.equals(mrid, argo11.mrid) && Objects.equals(studentComment, argo11.studentComment);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, internalId, studentId, lastName, firstName, middleName, chineseName, hkid, studentPayNo, gender, enrolYearTerm, progCode, studStatus, deptCode, blockCode, programmeTitle, campus, campusEmail, personalEmail, address, mobile, permPhone, cohort, curEnrolStatusCode, currentEnrolStatus, lastEnrolTerm, lastEnrolTermStatus, acadStatusCode, acadStatusDesc, awardClass, rateCode, level, gradTerm, passport, mrid, studentComment);
    }

    @Override
    public String toString() {
        return "Argo11{" +
                "id=" + id +
                ", internalId='" + internalId + '\'' +
                ", studentId='" + studentId + '\'' +
                ", lastName='" + lastName + '\'' +
                ", firstName='" + firstName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", chineseName='" + chineseName + '\'' +
                ", hkid='" + hkid + '\'' +
                ", studentPayNo='" + studentPayNo + '\'' +
                ", gender='" + gender + '\'' +
                ", enrolYearTerm='" + enrolYearTerm + '\'' +
                ", progCode='" + progCode + '\'' +
                ", studStatus='" + studStatus + '\'' +
                ", deptCode='" + deptCode + '\'' +
                ", blockCode='" + blockCode + '\'' +
                ", programmeTitle='" + programmeTitle + '\'' +
                ", campus='" + campus + '\'' +
                ", campusEmail='" + campusEmail + '\'' +
                ", personalEmail='" + personalEmail + '\'' +
                ", address='" + address + '\'' +
                ", mobile='" + mobile + '\'' +
                ", permPhone='" + permPhone + '\'' +
                ", cohort='" + cohort + '\'' +
                ", curEnrolStatusCode='" + curEnrolStatusCode + '\'' +
                ", currentEnrolStatus='" + currentEnrolStatus + '\'' +
                ", lastEnrolTerm='" + lastEnrolTerm + '\'' +
                ", lastEnrolTermStatus='" + lastEnrolTermStatus + '\'' +
                ", acadStatusCode='" + acadStatusCode + '\'' +
                ", acadStatusDesc='" + acadStatusDesc + '\'' +
                ", awardClass='" + awardClass + '\'' +
                ", rateCode='" + rateCode + '\'' +
                ", level='" + level + '\'' +
                ", gradTerm='" + gradTerm + '\'' +
                ", passport='" + passport + '\'' +
                ", mrid='" + mrid + '\'' +
                ", studentComment='" + studentComment + '\'' +
                '}';
    }
}
