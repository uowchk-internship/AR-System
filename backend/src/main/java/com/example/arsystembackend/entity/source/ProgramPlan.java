package com.example.arsystembackend.entity.source;

import javax.persistence.*;

@Entity
@Table(name = "program_plan", schema = "ar-source", catalog = "")
public class ProgramPlan {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "course")
    private String course;
    @Basic
    @Column(name = "credit")
    private Integer credit;
    @Basic
    @Column(name = "program")
    private String program;
    @Basic
    @Column(name = "type")
    private String type;
    @Basic
    @Column(name = "year")
    private String year;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public Integer getCredit() {
        return credit;
    }

    public void setCredit(Integer credit) {
        this.credit = credit;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProgramPlan that = (ProgramPlan) o;

        if (id != that.id) return false;
        if (course != null ? !course.equals(that.course) : that.course != null) return false;
        if (credit != null ? !credit.equals(that.credit) : that.credit != null) return false;
        if (program != null ? !program.equals(that.program) : that.program != null) return false;
        if (type != null ? !type.equals(that.type) : that.type != null) return false;
        if (year != null ? !year.equals(that.year) : that.year != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (course != null ? course.hashCode() : 0);
        result = 31 * result + (credit != null ? credit.hashCode() : 0);
        result = 31 * result + (program != null ? program.hashCode() : 0);
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + (year != null ? year.hashCode() : 0);
        return result;
    }
}
