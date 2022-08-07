package com.example.arsystembackend.service.convert;

import com.example.arsystembackend.entity.report.grade.GradeReport;
import com.example.arsystembackend.entity.report.grade.GradeReportItem;
import com.example.arsystembackend.entity.report.grade.GradeTemp;
import com.example.arsystembackend.entity.source.*;
import com.example.arsystembackend.service.source.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class GradeReportConvertService {
    private Argo10Services argo10Services;
    private Argo11Services argo11Services;
    private Argo16Services argo16Services;
    private Argo29Services argo29Services;
    private ProgramPlanServices programPlanServices;
    private CgeServices cgeServices;
    private Map<String, String> courseGradeConvert = new HashMap<>();

    //Get related information from db
    Map<String, List<Argo10>> argo10Map = new HashMap<>();
    Map<String, Argo11> argo11Map = new HashMap<>();
    Map<String, List<Argo16>> argo16Map = new HashMap<>();
    Map<String, List<Argo29>> argo29Map = new HashMap<>();
    Map<String, List<ProgramPlan>> programPlanMap = new HashMap<>();
    Map<String, Cge> cgeMap = new HashMap<>();

    //Complete course list with name
    Map<String, String> fullCourseList = new HashMap<>();

    //Required credits
    Map<String, Integer> creditRequiredMap = new HashMap<>();


    @Autowired
    public GradeReportConvertService(Argo10Services argo10Services, Argo11Services argo11Services, Argo16Services argo16Services, Argo29Services argo29Services, ProgramPlanServices programPlanServices, CgeServices cgeServices) {
        this.argo10Services = argo10Services;
        this.argo11Services = argo11Services;
        this.argo16Services = argo16Services;
        this.argo29Services = argo29Services;
        this.programPlanServices = programPlanServices;
        this.cgeServices = cgeServices;

        this.courseGradeConvert.put("A+", "4.3");
        this.courseGradeConvert.put("A", "4");
        this.courseGradeConvert.put("A-", "3.7");
        this.courseGradeConvert.put("B+", "3.3");
        this.courseGradeConvert.put("B", "3");
        this.courseGradeConvert.put("B-", "2.7");
        this.courseGradeConvert.put("C+", "2.3");
        this.courseGradeConvert.put("C", "2");
        this.courseGradeConvert.put("C-", "1.7");
        this.courseGradeConvert.put("D", "1");

        updateHashmap();
    }

    //Prepare the data and return the results
    public GradeTemp getTempResult(List<String> idList) {
        List<Argo11> allStudents = argo11Services.getByIdList(idList);

        int normal = 0;
        List<String> noProgram = new ArrayList<>();
        List<String> noArgo10 = new ArrayList<>();
        String resultString = "";

        for (Argo11 argo11 : allStudents) {
            if (programPlanMap.get(argo11.getProgCode() + "-" + argo11.getCohort()) != null && argo10Map.get(argo11.getStudentId()) != null) {
                normal++;
            } else if (programPlanMap.get(argo11.getProgCode() + "-" + argo11.getCohort()) == null) {
                noProgram.add(argo11.getStudentId() + ": (" + argo11.getProgCode() + ")");
            } else if (argo10Map.get(argo11.getStudentId()) == null) {
                System.out.println("No argo10");
                System.out.println(argo11);
                noArgo10.add(argo11.getStudentId() + " (" + argo11.getLastName() + " " + argo11.getFirstName() + ")");
            }
        }

        GradeTemp gradeTemp = new GradeTemp();
        gradeTemp.setNoProgramPlanCount((int) noProgram.stream().count());
        gradeTemp.setNoArgo10RecordCount((int) noArgo10.stream().count());
        gradeTemp.setNormalCount(normal);
        gradeTemp.setNoProgramPlanId(noProgram);
        gradeTemp.setNoArgo10Id(noArgo10);

        System.out.println(gradeTemp);

        return gradeTemp;
    }

    public List<GradeReport> getResultByIdList(List<String> idList) {
        List<GradeReport> gradeReports = new ArrayList<>();

        List<Argo11> allStudents = argo11Services.getByIdList(idList);

        int noProgram = 0;
        int noArgo10 = 0;
        for (Argo11 argo11 : allStudents) {
            if (programPlanMap.get(argo11.getProgCode() + "-" + argo11.getCohort()) != null && argo10Map.get(argo11.getStudentId()) != null) {
                gradeReports.add(getSingleStudent(argo11.getStudentId(), true));
            } else if (programPlanMap.get(argo11.getProgCode() + "-" + argo11.getCohort()) == null) {
                noProgram++;
            } else if (argo10Map.get(argo11.getStudentId()) == null) {
                if (noArgo10 == 0) {
                    System.out.println(argo11.getStudentId());
                }
                noArgo10++;
            }
        }
        System.out.println("noProgram: " + noProgram + ", noArgo11: " + noArgo10);
//        System.out.println('{"val1":"val1","val2":"val2"}');
        return gradeReports;
    }

    //Update the Argos data
    public void updateHashmap() {
        //Reset hashmap
        argo10Map = new HashMap<>();
        argo11Map = new HashMap<>();
        argo16Map = new HashMap<>();
        argo29Map = new HashMap<>();
        programPlanMap = new HashMap<>();
        cgeMap = new HashMap<>();
        creditRequiredMap = new HashMap<>();


        List<Argo10> fullArgo10List = argo10Services.getAll();
        List<Argo11> fullArgo11List = argo11Services.getAll();
        List<Argo16> fullArgo16List = argo16Services.getAll();
        List<Argo29> fullArgo29List = argo29Services.getAll();
        List<ProgramPlan> fullProgramPlanList = programPlanServices.getAll();
        List<Cge> fullCgeList = cgeServices.getAll();

        for (Argo10 item : fullArgo10List) {

            List<Argo10> valueInMap = argo10Map.get(item.getStudentId());
            if (valueInMap != null) {
                valueInMap.add(item);
                argo10Map.put(item.getStudentId(), valueInMap);
            } else {
                valueInMap = new ArrayList<>();
                valueInMap.add(item);
                argo10Map.put(item.getStudentId(), valueInMap);
            }
            fullCourseList.put(item.getShrtcknSubjCode() + item.getShrtcknCrseNumb(), item.getShrtcknCrseTitle());

        }
        for (Argo11 item : fullArgo11List) {
            argo11Map.put(item.getStudentId(), item);
        }
        for (Argo16 item : fullArgo16List) {
            List<Argo16> valueInMap = argo16Map.get(item.getStudId());
            if (valueInMap != null) {
                valueInMap.add(item);
                argo16Map.put(item.getStudId(), valueInMap);
            } else {
                valueInMap = new ArrayList<>();
                valueInMap.add(item);
                argo16Map.put(item.getStudId(), valueInMap);
            }

        }
        for (Argo29 item : fullArgo29List) {
            List<Argo29> valueInMap = argo29Map.get(item.getSpridenId());
            if (valueInMap != null) {
                valueInMap.add(item);
                argo29Map.put(item.getSpridenId(), valueInMap);
            } else {
                valueInMap = new ArrayList<>();
                valueInMap.add(item);
                argo29Map.put(item.getSpridenId(), valueInMap);
            }

        }
        for (ProgramPlan item : fullProgramPlanList) {

            if (item.getCourse().charAt(0) != '_') {
                String combinedWord = item.getProgram() + "-" + item.getYear();

                List<ProgramPlan> valueInMap = programPlanMap.get(combinedWord);
                if (valueInMap != null) {
                    valueInMap.add(item);
                    programPlanMap.put(combinedWord, valueInMap);
                } else {
                    valueInMap = new ArrayList<>();
                    valueInMap.add(item);
                    programPlanMap.put(combinedWord, valueInMap);
                }
                if (item.getType().equals("Core") || item.getType().equals("CGE")) {
                    //Auto count the required cred of core and cge course
                    String combinedWord_ = item.getProgram() + "-" + item.getType() + "-" + item.getYear();
                    Integer valueInMap_ = creditRequiredMap.get(combinedWord_);
                    if (valueInMap_ != null) {
                        valueInMap_ += item.getCredit();
                        creditRequiredMap.put(combinedWord_, valueInMap_);
                    } else {
                        valueInMap_ = item.getCredit();
                        creditRequiredMap.put(combinedWord_, valueInMap_);
                    }

                }
            } else {
                String combinedWord = item.getProgram() + "-" + item.getType() + "-" + item.getYear();
                creditRequiredMap.put(combinedWord, item.getCredit());
            }
        }
        for (Cge item : fullCgeList) {
            cgeMap.put(item.getCode(), item);
        }


    }

    //Main logic
    public GradeReport getSingleStudent(String sid, boolean multiple) {
        //Get related information from db
        List<Argo10> argo10List = argo10Map.get(sid);
        Argo11 argo11 = argo11Map.get(sid);
        List<Argo16> argo16List = argo16Map.get(sid);
        List<Argo29> argo29List = argo29Map.get(sid);
        List<ProgramPlan> programPlanList = programPlanMap.get(argo11.getProgCode() + "-" + argo11.getCohort());

//        List<Cge> cgeList = cgeServices.getAll();

        GradeReport gradeReport = new GradeReport();

        //Report head
        gradeReport.setName(argo11.getLastName() + " " + argo11.getFirstName() + "" + argo11.getChineseName());
        gradeReport.setSid(argo11.getStudentId());
        gradeReport.setEmail(argo11.getCampusEmail());
        gradeReport.setProgram(argo11.getProgCode());
        gradeReport.setCohort(argo11.getCohort());
        gradeReport.setStatus(argo11.getAcadStatusDesc());

        //init the course list
        List<GradeReportItem> core = new ArrayList<>();
        List<GradeReportItem> language = new ArrayList<>();
        List<GradeReportItem> cge = new ArrayList<>();
        List<GradeReportItem> e1 = new ArrayList<>();
        List<GradeReportItem> e2 = new ArrayList<>();
        List<GradeReportItem> e3 = new ArrayList<>();
        List<GradeReportItem> s1 = new ArrayList<>();
        List<GradeReportItem> s2 = new ArrayList<>();
        List<GradeReportItem> s3 = new ArrayList<>();
        List<GradeReportItem> cgeOthers = new ArrayList<>();

        //init required course codes
        List<String> req_core = new ArrayList<>();
        List<String> req_language = new ArrayList<>();
        List<String> req_cge = new ArrayList<>();
        List<String> req_e1 = new ArrayList<>();
        List<String> req_e2 = new ArrayList<>();
        List<String> req_e3 = new ArrayList<>();
        List<String> req_s1 = new ArrayList<>();
        List<String> req_s2 = new ArrayList<>();
        List<String> req_s3 = new ArrayList<>();

        //For counting for unregistered course
        List<String> unreq_core = new ArrayList<>();
        List<String> unreq_language = new ArrayList<>();
        List<String> unreq_cge = new ArrayList<>();
        List<String> unreq_e1 = new ArrayList<>();
        List<String> unreq_e2 = new ArrayList<>();
        List<String> unreq_e3 = new ArrayList<>();
        List<String> unreq_s1 = new ArrayList<>();
        List<String> unreq_s2 = new ArrayList<>();
        List<String> unreq_s3 = new ArrayList<>();

        //init credit required for types
        Map<String, Integer> creditRequired = new HashMap<>();
        //Separate course into semesters
        Map<String, List<GradeReportItem>> coursesBySemester = new HashMap<>();
        Map<String, String> semesterStatus = new HashMap<>();


        //create required courses item
        if (programPlanList != null) {
            for (ProgramPlan programPlan : programPlanList) {
                String combinedWord = programPlan.getProgram() + "-" + programPlan.getType() + "-" + programPlan.getYear();
                creditRequired.put(programPlan.getType(), creditRequiredMap.get(combinedWord));

                if (programPlan.getType().equals("Language")) {
                    req_language.add(programPlan.getCourse());
                    unreq_language.add(programPlan.getCourse());
                } else if (programPlan.getType().equals("Core")) {
                    req_core.add(programPlan.getCourse());
                    unreq_core.add(programPlan.getCourse());
                } else if (programPlan.getType().equals("CGE")) {
                    req_cge.add(programPlan.getCourse());
                    unreq_cge.add(programPlan.getCourse());
                } else if (programPlan.getType().equals("E1")) {
                    req_e1.add(programPlan.getCourse());
                    unreq_e1.add(programPlan.getCourse());
                } else if (programPlan.getType().equals("E2")) {
                    req_e2.add(programPlan.getCourse());
                    unreq_e2.add(programPlan.getCourse());
                } else if (programPlan.getType().equals("E3")) {
                    req_e3.add(programPlan.getCourse());
                    unreq_e3.add(programPlan.getCourse());
                } else if (programPlan.getType().equals("S1")) {
                    req_s1.add(programPlan.getCourse());
                    unreq_s1.add(programPlan.getCourse());
                } else if (programPlan.getType().equals("S2")) {
                    req_s2.add(programPlan.getCourse());
                    unreq_s2.add(programPlan.getCourse());
                } else if (programPlan.getType().equals("S3")) {
                    unreq_s3.add(programPlan.getCourse());
                }
            }
        }

        //Put course into the list
        for (Argo10 argo10 : argo10List) {

            //Create new reportItem for a subject
            String courseCode = argo10.getShrtcknSubjCode() + argo10.getShrtcknCrseNumb();
            GradeReportItem newGradeReportItem = new GradeReportItem(courseCode,
                    argo10.getShrtcknCrseTitle(),
                    convertIntoTermString(argo10.getShrtcknTermCode()),
                    argo10.getShrtckgGrdeCodeFinal(),
                    courseGradeConvert.get(argo10.getShrtckgGrdeCodeFinal()),
                    argo10.getShrtckgCreditHours(),
                    argo10.getExcludeSubject());

            //Put the item into the coursesBySemester hashMap
            List<GradeReportItem> list = coursesBySemester.get(newGradeReportItem.getCohort());
            if (list != null) {
                list.add(newGradeReportItem);
                coursesBySemester.put(newGradeReportItem.getCohort(), list);
            } else {
                List<GradeReportItem> item = new ArrayList<>();
                item.add(newGradeReportItem);
                coursesBySemester.put(newGradeReportItem.getCohort(), item);
            }


            if (req_core.contains(courseCode)) {
                core.add(newGradeReportItem);
                int i = unreq_core.indexOf(courseCode);
                if (i > -1)
                    unreq_core.remove(i);
            } else if (req_language.contains(courseCode)) {
                language.add(newGradeReportItem);
                int i = unreq_language.indexOf(courseCode);
                if (i > -1)
                    unreq_language.remove(i);
            } else if (req_cge.contains(courseCode)) {
                cge.add(newGradeReportItem);
                int i = unreq_cge.indexOf(courseCode);
                if (i > -1)
                    unreq_cge.remove(i);
            } else if (req_e1.contains(courseCode)) {
                e1.add(newGradeReportItem);
                int i = unreq_e1.indexOf(courseCode);
                if (i > -1)
                    unreq_e1.remove(i);
            } else if (req_e2.contains(courseCode)) {
                e2.add(newGradeReportItem);
                int i = unreq_e2.indexOf(courseCode);
                if (i > -1)
                    unreq_e2.remove(i);
            } else if (req_e3.contains(courseCode)) {
                e3.add(newGradeReportItem);
                int i = unreq_e3.indexOf(courseCode);
                if (i > -1)
                    unreq_e3.remove(i);
            } else if (req_s1.contains(courseCode)) {
                s1.add(newGradeReportItem);
                int i = unreq_s1.indexOf(courseCode);
                if (i > -1)
                    unreq_s1.remove(i);
            } else if (req_s2.contains(courseCode)) {
                s2.add(newGradeReportItem);
                int i = unreq_s2.indexOf(courseCode);
                if (i > -1)
                    unreq_s2.remove(i);
            } else if (req_s3.contains(courseCode)) {
                s3.add(newGradeReportItem);
                int i = unreq_s3.indexOf(courseCode);
                if (i > -1)
                    unreq_s3.remove(i);
            } else {
                cgeOthers.add(newGradeReportItem);
            }
        }

        //Add empty item to list
        for (String item : unreq_core) {
            core.add(new GradeReportItem(item, fullCourseList.get(item)));
        }
        for (String item : unreq_language) {
            language.add(new GradeReportItem(item, fullCourseList.get(item)));
        }
        for (String item : unreq_cge) {
            cge.add(new GradeReportItem(item, fullCourseList.get(item)));
        }
        for (String item : unreq_e1) {
            e1.add(new GradeReportItem(item, fullCourseList.get(item)));
        }
        for (String item : unreq_e2) {
            e2.add(new GradeReportItem(item, fullCourseList.get(item)));
        }
        for (String item : unreq_e3) {
            e3.add(new GradeReportItem(item, fullCourseList.get(item)));
        }
        for (String item : unreq_s1) {
            s1.add(new GradeReportItem(item, fullCourseList.get(item)));
        }
        for (String item : unreq_s2) {
            s2.add(new GradeReportItem(item, fullCourseList.get(item)));
        }
        for (String item : unreq_s3) {
            s3.add(new GradeReportItem(item, fullCourseList.get(item)));
        }

        for (Argo29 argo29 : argo29List) {
            semesterStatus.put(convertIntoTermString(argo29.getShrttrmTermCode()),argo29.getStvastdDesc());
        }

        //Sort the result by course code
        core.sort(Comparator.comparing(GradeReportItem::getCourseCode));
        language.sort(Comparator.comparing(GradeReportItem::getCourseCode));
        cge.sort(Comparator.comparing(GradeReportItem::getCourseCode));
        e1.sort(Comparator.comparing(GradeReportItem::getCourseCode));
        e2.sort(Comparator.comparing(GradeReportItem::getCourseCode));
        e3.sort(Comparator.comparing(GradeReportItem::getCourseCode));
        s1.sort(Comparator.comparing(GradeReportItem::getCourseCode));
        s2.sort(Comparator.comparing(GradeReportItem::getCourseCode));
        s3.sort(Comparator.comparing(GradeReportItem::getCourseCode));
        cgeOthers.sort(Comparator.comparing(GradeReportItem::getCourseCode));


        //Set values to gradeReport
        gradeReport.setCore(core);
        gradeReport.setLanguage(language);
        gradeReport.setCge(cge);
        gradeReport.setE1(e1);
        gradeReport.setE2(e2);
        gradeReport.setE3(e3);
        gradeReport.setS1(s1);
        gradeReport.setS2(s2);
        gradeReport.setS3(s3);
        gradeReport.setCgeOthers(cgeOthers);

        gradeReport.setCreditsRequired(creditRequired);
        gradeReport.setCGPA(calculateCGPA(coursesBySemester));
        gradeReport.setSemesterStatus(semesterStatus);
        gradeReport.setRemarks(argo11.getStudentComment());

        return gradeReport;
    }


    public String convertIntoTermString(String cohort) {
        String result = "";

        int year = Integer.parseInt(cohort.substring(0, 4)) % 100;
        String letter = " ";
        String month = cohort.substring(4);

        if (month.equals("09") || month.equals("10")) {
            letter += "A";
        } else if (month.equals("01") || month.equals(("02"))) {
            letter += "B";
            year--;
        } else if (month.equals("06")) {
            letter += "C";
            year--;
        }

        result = year + "/" + (year + 1) + letter;

        return result;
    }

    public Map<String, String> calculateCGPA(Map<String, List<GradeReportItem>> coursesBySemester) {
        Map<String, String> result = new HashMap<>();
        List<String> semesters = new ArrayList<>();
        //For overall GPA
        float totalGrade = 0;
        int totalCredit = 0;

        //Save and sort all the available terms
        for (String key : coursesBySemester.keySet()) {
            semesters.add(key);
        }
        semesters = semesters.stream().sorted().collect(Collectors.toList());

        for (String sem : semesters) {
            //for semester gpa
            float tempTotalGrade = 0;
            int tempTotalCredits = 0;

            for (GradeReportItem item : coursesBySemester.get(sem)) {
//                System.out.println(item.getCredit() + ", " + item.getGradePoint() + ", " + item.getGrade());
                if (item.getGradePoint() != null) {
                    int credit = item.getCredit();
                    float gradePoint = credit * Float.parseFloat(item.getGradePoint());

                    tempTotalCredits += credit;
                    tempTotalGrade += gradePoint;

                    //Add to total
                    totalCredit += credit;
                    totalGrade += gradePoint;
                }

            }

            String tempCGPA = String.format("%.2f", tempTotalGrade / tempTotalCredits);
            result.put(sem, tempCGPA);
//            System.out.println(sem + ": " + tempCGPA);
        }

        String CGPA = String.format("%.2f", totalGrade / totalCredit);
//        System.out.println("totalGrade: " + totalGrade + ", totalCredit: " + totalCredit + ", CGPA: " + CGPA);
        result.put("Overall", CGPA);

        return result;

    }
}
