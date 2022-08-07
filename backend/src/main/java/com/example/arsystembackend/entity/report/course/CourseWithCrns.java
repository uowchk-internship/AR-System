package com.example.arsystembackend.entity.report.course;

import java.util.ArrayList;
import java.util.List;

public class CourseWithCrns {
    private String courseTitle;
    private String courseCode;
    private List<String> sectionCrnList;
    private String courseOfferDept;

    public String getCourseTitle() {
        return courseTitle;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public List<String> getSectionCrnList() {
        return sectionCrnList;
    }

    public void setSectionCrnList(List<String> sectionCrnList) {
        this.sectionCrnList = sectionCrnList;
    }

    public String getCourseOfferDept() {
        return courseOfferDept;
    }

    public void setCourseOfferDept(String courseOfferDept) {
        this.courseOfferDept = courseOfferDept;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }
}
