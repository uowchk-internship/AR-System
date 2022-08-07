package com.example.arsystembackend.entity.report.grade;

import java.util.List;

public class GradeTemp {
    int noProgramPlanCount;
    int noArgo10RecordCount;
    int normalCount;
    List<String> noProgramPlanId;
    List<String> noArgo10Id;

    public int getNoProgramPlanCount() {
        return noProgramPlanCount;
    }

    public void setNoProgramPlanCount(int noProgramPlanCount) {
        this.noProgramPlanCount = noProgramPlanCount;
    }

    public int getNoArgo10RecordCount() {
        return noArgo10RecordCount;
    }

    public void setNoArgo10RecordCount(int noArgo10RecordCount) {
        this.noArgo10RecordCount = noArgo10RecordCount;
    }

    public int getNormalCount() {
        return normalCount;
    }

    public void setNormalCount(int normalCount) {
        this.normalCount = normalCount;
    }

    public List<String> getNoProgramPlanId() {
        return noProgramPlanId;
    }

    public void setNoProgramPlanId(List<String> noProgramPlanId) {
        this.noProgramPlanId = noProgramPlanId;
    }

    public List<String> getNoArgo10Id() {
        return noArgo10Id;
    }

    public void setNoArgo10Id(List<String> noArgo10Id) {
        this.noArgo10Id = noArgo10Id;
    }

    @Override
    public String toString() {
        return "GradeTemp{" +
                "noProgramPlanCount=" + noProgramPlanCount +
                ", noArgo10RecordCount=" + noArgo10RecordCount +
                ", normalCount=" + normalCount +
                ", noProgramPlanId=" + noProgramPlanId +
                ", noArgo10Id=" + noArgo10Id +
                '}';
    }
}
