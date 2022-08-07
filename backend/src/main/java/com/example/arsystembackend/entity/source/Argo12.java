package com.example.arsystembackend.entity.source;

import javax.persistence.*;

@Entity
public class Argo12 {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "term_code")
    private String termCode;
    @Basic
    @Column(name = "pidm")
    private String pidm;
    @Basic
    @Column(name = "crn")
    private String crn;
    @Basic
    @Column(name = "stud_no")
    private String studNo;
    @Basic
    @Column(name = "student_name")
    private String studentName;
    @Basic
    @Column(name = "gender")
    private String gender;
    @Basic
    @Column(name = "course_code")
    private String courseCode;
    @Basic
    @Column(name = "enrol_status")
    private String enrolStatus;
    @Basic
    @Column(name = "course_offer_dept")
    private String courseOfferDept;
    @Basic
    @Column(name = "course_title")
    private String courseTitle;
    @Basic
    @Column(name = "subj_type")
    private String subjType;
    @Basic
    @Column(name = "prog_code")
    private String progCode;
    @Basic
    @Column(name = "cohort")
    private String cohort;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTermCode() {
        return termCode;
    }

    public void setTermCode(String termCode) {
        this.termCode = termCode;
    }

    public String getPidm() {
        return pidm;
    }

    public void setPidm(String pidm) {
        this.pidm = pidm;
    }

    public String getCrn() {
        return crn;
    }

    public void setCrn(String crn) {
        this.crn = crn;
    }

    public String getStudNo() {
        return studNo;
    }

    public void setStudNo(String studNo) {
        this.studNo = studNo;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getEnrolStatus() {
        return enrolStatus;
    }

    public void setEnrolStatus(String enrolStatus) {
        this.enrolStatus = enrolStatus;
    }

    public String getCourseOfferDept() {
        return courseOfferDept;
    }

    public void setCourseOfferDept(String courseOfferDept) {
        this.courseOfferDept = courseOfferDept;
    }

    public String getCourseTitle() {
        return courseTitle;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public String getSubjType() {
        return subjType;
    }

    public void setSubjType(String subjType) {
        this.subjType = subjType;
    }

    public String getProgCode() {
        return progCode;
    }

    public void setProgCode(String progCode) {
        this.progCode = progCode;
    }

    public String getCohort() {
        return cohort;
    }

    public void setCohort(String cohort) {
        this.cohort = cohort;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Argo12 argo12 = (Argo12) o;

        if (id != argo12.id) return false;
        if (termCode != null ? !termCode.equals(argo12.termCode) : argo12.termCode != null) return false;
        if (pidm != null ? !pidm.equals(argo12.pidm) : argo12.pidm != null) return false;
        if (crn != null ? !crn.equals(argo12.crn) : argo12.crn != null) return false;
        if (studNo != null ? !studNo.equals(argo12.studNo) : argo12.studNo != null) return false;
        if (studentName != null ? !studentName.equals(argo12.studentName) : argo12.studentName != null) return false;
        if (gender != null ? !gender.equals(argo12.gender) : argo12.gender != null) return false;
        if (courseCode != null ? !courseCode.equals(argo12.courseCode) : argo12.courseCode != null) return false;
        if (enrolStatus != null ? !enrolStatus.equals(argo12.enrolStatus) : argo12.enrolStatus != null) return false;
        if (courseOfferDept != null ? !courseOfferDept.equals(argo12.courseOfferDept) : argo12.courseOfferDept != null)
            return false;
        if (courseTitle != null ? !courseTitle.equals(argo12.courseTitle) : argo12.courseTitle != null) return false;
        if (subjType != null ? !subjType.equals(argo12.subjType) : argo12.subjType != null) return false;
        if (progCode != null ? !progCode.equals(argo12.progCode) : argo12.progCode != null) return false;
        if (cohort != null ? !cohort.equals(argo12.cohort) : argo12.cohort != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (termCode != null ? termCode.hashCode() : 0);
        result = 31 * result + (pidm != null ? pidm.hashCode() : 0);
        result = 31 * result + (crn != null ? crn.hashCode() : 0);
        result = 31 * result + (studNo != null ? studNo.hashCode() : 0);
        result = 31 * result + (studentName != null ? studentName.hashCode() : 0);
        result = 31 * result + (gender != null ? gender.hashCode() : 0);
        result = 31 * result + (courseCode != null ? courseCode.hashCode() : 0);
        result = 31 * result + (enrolStatus != null ? enrolStatus.hashCode() : 0);
        result = 31 * result + (courseOfferDept != null ? courseOfferDept.hashCode() : 0);
        result = 31 * result + (courseTitle != null ? courseTitle.hashCode() : 0);
        result = 31 * result + (subjType != null ? subjType.hashCode() : 0);
        result = 31 * result + (progCode != null ? progCode.hashCode() : 0);
        result = 31 * result + (cohort != null ? cohort.hashCode() : 0);
        return result;
    }
}
