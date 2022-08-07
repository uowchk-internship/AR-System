package com.example.arsystembackend.entity.source;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
public class Argo16 {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "term")
    private String term;
    @Basic
    @Column(name = "pidm")
    private String pidm;
    @Basic
    @Column(name = "stud_id")
    private String studId;
    @Basic
    @Column(name = "last_name")
    private String lastName;
    @Basic
    @Column(name = "first_name")
    private String firstName;
    @Basic
    @Column(name = "faculty")
    private String faculty;
    @Basic
    @Column(name = "programme")
    private String programme;
    @Basic
    @Column(name = "level")
    private String level;
    @Basic
    @Column(name = "attemp_hr")
    private Integer attempHr;
    @Basic
    @Column(name = "earn_hr")
    private Integer earnHr;
    @Basic
    @Column(name = "pass_hr")
    private Integer passHr;
    @Basic
    @Column(name = "gpa_hr")
    private Integer gpaHr;
    @Basic
    @Column(name = "qual_pts")
    private BigDecimal qualPts;
    @Basic
    @Column(name = "sgpa")
    private BigDecimal sgpa;
    @Basic
    @Column(name = "cgpa")
    private BigDecimal cgpa;
    @Basic
    @Column(name = "stud_status")
    private String studStatus;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public String getPidm() {
        return pidm;
    }

    public void setPidm(String pidm) {
        this.pidm = pidm;
    }

    public String getStudId() {
        return studId;
    }

    public void setStudId(String studId) {
        this.studId = studId;
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

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public String getProgramme() {
        return programme;
    }

    public void setProgramme(String programme) {
        this.programme = programme;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public Integer getAttempHr() {
        return attempHr;
    }

    public void setAttempHr(Integer attempHr) {
        this.attempHr = attempHr;
    }

    public Integer getEarnHr() {
        return earnHr;
    }

    public void setEarnHr(Integer earnHr) {
        this.earnHr = earnHr;
    }

    public Integer getPassHr() {
        return passHr;
    }

    public void setPassHr(Integer passHr) {
        this.passHr = passHr;
    }

    public Integer getGpaHr() {
        return gpaHr;
    }

    public void setGpaHr(Integer gpaHr) {
        this.gpaHr = gpaHr;
    }

    public BigDecimal getQualPts() {
        return qualPts;
    }

    public void setQualPts(BigDecimal qualPts) {
        this.qualPts = qualPts;
    }

    public BigDecimal getSgpa() {
        return sgpa;
    }

    public void setSgpa(BigDecimal sgpa) {
        this.sgpa = sgpa;
    }

    public BigDecimal getCgpa() {
        return cgpa;
    }

    public void setCgpa(BigDecimal cgpa) {
        this.cgpa = cgpa;
    }

    public String getStudStatus() {
        return studStatus;
    }

    public void setStudStatus(String studStatus) {
        this.studStatus = studStatus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Argo16 argo16 = (Argo16) o;
        return id == argo16.id && Objects.equals(term, argo16.term) && Objects.equals(pidm, argo16.pidm) && Objects.equals(studId, argo16.studId) && Objects.equals(lastName, argo16.lastName) && Objects.equals(firstName, argo16.firstName) && Objects.equals(faculty, argo16.faculty) && Objects.equals(programme, argo16.programme) && Objects.equals(level, argo16.level) && Objects.equals(attempHr, argo16.attempHr) && Objects.equals(earnHr, argo16.earnHr) && Objects.equals(passHr, argo16.passHr) && Objects.equals(gpaHr, argo16.gpaHr) && Objects.equals(qualPts, argo16.qualPts) && Objects.equals(sgpa, argo16.sgpa) && Objects.equals(cgpa, argo16.cgpa) && Objects.equals(studStatus, argo16.studStatus);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, term, pidm, studId, lastName, firstName, faculty, programme, level, attempHr, earnHr, passHr, gpaHr, qualPts, sgpa, cgpa, studStatus);
    }
}
