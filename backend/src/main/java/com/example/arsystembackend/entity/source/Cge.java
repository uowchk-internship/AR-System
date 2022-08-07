package com.example.arsystembackend.entity.source;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Cge {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "code")
    private String code;
    @Basic
    @Column(name = "title")
    private String title;
    @Basic
    @Column(name = "domain")
    private String domain;
    @Basic
    @Column(name = "lvl")
    private Integer lvl;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public Integer getLvl() {
        return lvl;
    }

    public void setLvl(Integer lvl) {
        this.lvl = lvl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cge cge = (Cge) o;
        return id == cge.id && Objects.equals(code, cge.code) && Objects.equals(title, cge.title) && Objects.equals(domain, cge.domain) && Objects.equals(lvl, cge.lvl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, code, title, domain, lvl);
    }
}
