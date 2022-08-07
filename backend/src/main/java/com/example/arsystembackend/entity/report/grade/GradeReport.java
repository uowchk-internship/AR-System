package com.example.arsystembackend.entity.report.grade;


import java.util.List;
import java.util.Map;

public class GradeReport {
    //Report head
    private String name;
    private String sid;
    private String email;
    private String program;
    private String cohort;
    private String status;

    private List<GradeReportItem> core;
    private List<GradeReportItem> language;
    private List<GradeReportItem> cge;
    private List<GradeReportItem> e1;
    private List<GradeReportItem> e2;
    private List<GradeReportItem> e3;
    private List<GradeReportItem> s1;
    private List<GradeReportItem> s2;
    private List<GradeReportItem> s3;
    private List<GradeReportItem> cgeOthers;
    private Map<String, Integer> creditsRequired;
    private Map<String, String> CGPA;
    private Map<String, String> semesterStatus;

    private String remarks;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public String getCohort() {
        return cohort;
    }

    public void setCohort(String cohort) {
        this.cohort = cohort;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<GradeReportItem> getCore() {
        return core;
    }

    public void setCore(List<GradeReportItem> core) {
        this.core = core;
    }

    public List<GradeReportItem> getLanguage() {
        return language;
    }

    public void setLanguage(List<GradeReportItem> language) {
        this.language = language;
    }

    public List<GradeReportItem> getCge() {
        return cge;
    }

    public void setCge(List<GradeReportItem> cge) {
        this.cge = cge;
    }

    public List<GradeReportItem> getE1() {
        return e1;
    }

    public void setE1(List<GradeReportItem> e1) {
        this.e1 = e1;
    }

    public List<GradeReportItem> getE2() {
        return e2;
    }

    public void setE2(List<GradeReportItem> e2) {
        this.e2 = e2;
    }

    public List<GradeReportItem> getE3() {
        return e3;
    }

    public void setE3(List<GradeReportItem> e3) {
        this.e3 = e3;
    }

    public List<GradeReportItem> getS1() {
        return s1;
    }

    public void setS1(List<GradeReportItem> s1) {
        this.s1 = s1;
    }

    public List<GradeReportItem> getS2() {
        return s2;
    }

    public void setS2(List<GradeReportItem> s2) {
        this.s2 = s2;
    }

    public List<GradeReportItem> getS3() {
        return s3;
    }

    public void setS3(List<GradeReportItem> s3) {
        this.s3 = s3;
    }

    public List<GradeReportItem> getCgeOthers() {
        return cgeOthers;
    }

    public void setCgeOthers(List<GradeReportItem> cgeOthers) {
        this.cgeOthers = cgeOthers;
    }

    public Map<String, Integer> getCreditsRequired() {
        return creditsRequired;
    }

    public void setCreditsRequired(Map<String, Integer> creditsRequired) {
        this.creditsRequired = creditsRequired;
    }

    public Map<String, String> getCGPA() {
        return CGPA;
    }

    public void setCGPA(Map<String, String> CGPA) {
        this.CGPA = CGPA;
    }

    public Map<String, String> getSemesterStatus() {
        return semesterStatus;
    }

    public void setSemesterStatus(Map<String, String> semesterStatus) {
        this.semesterStatus = semesterStatus;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
