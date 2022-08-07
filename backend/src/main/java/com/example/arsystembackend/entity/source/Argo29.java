package com.example.arsystembackend.entity.source;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Argo29 {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "spriden_id")
    private String spridenId;
    @Basic
    @Column(name = "shrttrm_pidm")
    private String shrttrmPidm;
    @Basic
    @Column(name = "shrttrm_term_code")
    private String shrttrmTermCode;
    @Basic
    @Column(name = "stvastd_desc")
    private String stvastdDesc;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSpridenId() {
        return spridenId;
    }

    public void setSpridenId(String spridenId) {
        this.spridenId = spridenId;
    }

    public String getShrttrmPidm() {
        return shrttrmPidm;
    }

    public void setShrttrmPidm(String shrttrmPidm) {
        this.shrttrmPidm = shrttrmPidm;
    }

    public String getShrttrmTermCode() {
        return shrttrmTermCode;
    }

    public void setShrttrmTermCode(String shrttrmTermCode) {
        this.shrttrmTermCode = shrttrmTermCode;
    }

    public String getStvastdDesc() {
        return stvastdDesc;
    }

    public void setStvastdDesc(String stvastdDesc) {
        this.stvastdDesc = stvastdDesc;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Argo29 argo29 = (Argo29) o;
        return id == argo29.id && Objects.equals(spridenId, argo29.spridenId) && Objects.equals(shrttrmPidm, argo29.shrttrmPidm) && Objects.equals(shrttrmTermCode, argo29.shrttrmTermCode) && Objects.equals(stvastdDesc, argo29.stvastdDesc);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, spridenId, shrttrmPidm, shrttrmTermCode, stvastdDesc);
    }
}
