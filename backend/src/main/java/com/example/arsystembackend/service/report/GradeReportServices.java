package com.example.arsystembackend.service.report;

import com.example.arsystembackend.entity.report.grade.GradeReport;
import com.example.arsystembackend.entity.report.grade.GradeReportItem;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.*;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GradeReportServices {
    private GradeReport studentReport;

    public void export(OutputStream response, GradeReport studentReport) throws DocumentException, IOException {
        this.studentReport = studentReport;

        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response);

        document.open();
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setSize(12);

        Paragraph p = new Paragraph("Grade Draft", font);
        p.setAlignment(Paragraph.ALIGN_CENTER);

        document.add(p);

        document.add(studentInfo());
        document.add(detailTable());

        document.add(CGPATable());
        document.add(remarks());

        document.close();

    }

    private PdfPTable studentInfo() {
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100f);
        table.setWidths(new float[]{1.5f, 3.5f, 1.5f, 3.5f});
        table.setSpacingBefore(5);

        PdfPCell cell = new PdfPCell();
        cell.setPadding(5);

        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setSize(8);

        //Fullname
        cell.setPhrase(new Phrase("Name", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase(studentReport.getName(), font));
        table.addCell(cell);

        //SID
        cell.setPhrase(new Phrase("SID", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase(studentReport.getSid(), font));
        table.addCell(cell);


        //Email
        cell.setPhrase(new Phrase("Email", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase(studentReport.getEmail(), font));
        table.addCell(cell);


        //Programme
        cell.setPhrase(new Phrase("Programme", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase(studentReport.getProgram(), font));
        table.addCell(cell);

        //Entry Cohort
        cell.setPhrase(new Phrase("Entry Cohort", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase(studentReport.getCohort(), font));
        table.addCell(cell);

        //Status
        cell.setPhrase(new Phrase("Status", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase(studentReport.getStatus(), font));
        table.addCell(cell);


        return table;
    }

    private PdfPTable detailTable() {
        PdfPTable table = new PdfPTable(7);
        table.setWidthPercentage(100f);
        table.setWidths(new float[]{0.5f, 3.5f, 0.4f, 0.3f, 0.3f, 0.3f, 0.4f});
//        table.setSpacingBefore(5);

        PdfPCell cell = new PdfPCell();
        cell.setPadding(5);
        cell.setBackgroundColor(Color.LIGHT_GRAY);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);

        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setSize(8);
//        font.setColor(Color.WHITE);

        detailTableSectionHeader(table, "Core Course", "Core", studentReport.getCore());
        for (GradeReportItem gradeReportItem : studentReport.getCore()) {
            detailTableRow(table, gradeReportItem);
        }
        detailTableSectionHeader(table, "Language Course", "Language", studentReport.getLanguage());
        for (GradeReportItem gradeReportItem : studentReport.getLanguage()) {
            detailTableRow(table, gradeReportItem);
        }
        if (studentReport.getCge().size() != 0) {
            detailTableSectionHeader(table, "CGE Course", "CGE", studentReport.getCge());
            for (GradeReportItem gradeReportItem : studentReport.getCge()) {
                detailTableRow(table, gradeReportItem);
            }
        }
        if (studentReport.getE1().size() != 0) {
            detailTableSectionHeader(table, "Elective Group 1", "E1", studentReport.getE1());
            for (GradeReportItem gradeReportItem : studentReport.getE1()) {
                detailTableRow(table, gradeReportItem);
            }
        }
        if (studentReport.getE2().size() != 0) {
            detailTableSectionHeader(table, "Elective Group 2", "E2", studentReport.getE2());
            for (GradeReportItem gradeReportItem : studentReport.getE2()) {
                detailTableRow(table, gradeReportItem);
            }
        }
        if (studentReport.getE3().size() != 0) {
            detailTableSectionHeader(table, "Elective Group 3", "E3", studentReport.getE3());
            for (GradeReportItem gradeReportItem : studentReport.getE3()) {
                detailTableRow(table, gradeReportItem);
            }
        }
        if (studentReport.getS1().size() != 0) {
            detailTableSectionHeader(table, "Subject Group 1", "S1", studentReport.getS1());
            for (GradeReportItem gradeReportItem : studentReport.getS1()) {
                detailTableRow(table, gradeReportItem);
            }
        }
        if (studentReport.getS2().size() != 0) {
            detailTableSectionHeader(table, "Subject Group 2", "S2", studentReport.getS2());
            for (GradeReportItem gradeReportItem : studentReport.getS2()) {
                detailTableRow(table, gradeReportItem);
            }
        }
        if (studentReport.getS3().size() != 0) {
            detailTableSectionHeader(table, "Subject Group 3", "S3", studentReport.getS3());
            for (GradeReportItem gradeReportItem : studentReport.getS3()) {
                detailTableRow(table, gradeReportItem);
            }
        }
        detailTableSectionHeader(table, "Others", "", studentReport.getCgeOthers());
        for (GradeReportItem gradeReportItem : studentReport.getCgeOthers()) {
            detailTableRow(table, gradeReportItem);
        }


        return table;
    }

    private PdfPTable CGPATable() {
        int tableSize = studentReport.getCGPA().keySet().size() + 1;
        PdfPTable table = new PdfPTable(tableSize);
        table.setWidthPercentage(100f);

        float[] widthArray = new float[tableSize];
        Arrays.fill(widthArray, (1.0f / (tableSize -1)));
        widthArray[0] = 0.1f;
        widthArray[tableSize - 1] = 0.1f;
        table.setWidths(widthArray);
        table.setSpacingBefore(5);

        PdfPCell cell = new PdfPCell();
        cell.setPadding(5);

        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setSize(8);

        //First line
        cell.setBackgroundColor(Color.LIGHT_GRAY);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPhrase(new Phrase("Term", font));
        table.addCell(cell);

        List<String> semesterList = studentReport.getCGPA().keySet().stream().sorted().collect(Collectors.toList());
        for (String key : semesterList) {
            cell.setPhrase(new Phrase(key, font));
            table.addCell(cell);
        }

        //Second line
        cell.setBackgroundColor(Color.LIGHT_GRAY);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPhrase(new Phrase("Status", font));
        table.addCell(cell);

        cell.setBackgroundColor(Color.WHITE);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);

        for (String key : semesterList) {
            cell.setPhrase(new Phrase(studentReport.getSemesterStatus().get(key), font));
            table.addCell(cell);
        }

        //Third line
        cell.setBackgroundColor(Color.LIGHT_GRAY);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPhrase(new Phrase("GPA", font));
        table.addCell(cell);

        cell.setBackgroundColor(Color.WHITE);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);

        for (String key : semesterList) {
            cell.setPhrase(new Phrase(studentReport.getCGPA().get(key), font));
            table.addCell(cell);
        }


        return table;
    }

    private PdfPTable remarks() {
        PdfPTable table = new PdfPTable(1);
        table.setWidthPercentage(100f);
        table.setSpacingBefore(5);

        PdfPCell cell = new PdfPCell();
        cell.setPadding(5);

        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setSize(8);

        //1st line
        float[] color = Color.RGBtoHSB(238, 238, 238,null);
        cell.setBackgroundColor(Color.getHSBColor(color[0],color[1],color[2]));
        cell.setHorizontalAlignment(Element.ALIGN_LEFT);
        cell.setPhrase(new Phrase("Comment", font));
        table.addCell(cell);

        //2nd line
        cell.setBackgroundColor(Color.WHITE);
        cell.setPhrase(new Phrase(studentReport.getRemarks(), font));
        table.addCell(cell);


        return table;
    }

    private void detailTableSectionHeader(PdfPTable table, String sectionName, String type, List<GradeReportItem> itemList) {
        PdfPCell cell = new PdfPCell();
//        cell.setPadding(5);
        cell.setBackgroundColor(Color.LIGHT_GRAY);
        cell.setHorizontalAlignment(Element.ALIGN_LEFT);

        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setSize(8);
//        font.setColor(Color.WHITE);


        if (!type.equals("")) {
            //Calculate total credit earned
            int creditEarned = 0;
            for (GradeReportItem item : itemList) {
                creditEarned += item.getCredit();
            }

            cell.setPhrase(new Phrase(sectionName, font));
            cell.setColspan(5);
            table.addCell(cell);

            cell.setPhrase(new Phrase("Required : " + studentReport.getCreditsRequired().get(type) + "\nEarned    : " + creditEarned, font));
            cell.setColspan(2);
            table.addCell(cell);
        } else {
            cell.setPhrase(new Phrase(sectionName, font));
            cell.setColspan(7);
            table.addCell(cell);
        }

        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPhrase(new Phrase("Course", font));
        cell.setColspan(0);
        table.addCell(cell);
        cell.setPhrase(new Phrase("Course Name", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Cohort", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Grade", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Point", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Credit", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Remarks", font));
        table.addCell(cell);

    }

    private void detailTableRow(PdfPTable table, GradeReportItem gradeReportItem) {
        PdfPCell cell = new PdfPCell();
//        cell.setPadding(5);

        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setSize(8);

        if (gradeReportItem.getGradePoint() == null && gradeReportItem.getGrade() != null) {
            gradeReportItem.setGradePoint("0");
        }

        cell.setPhrase(new Phrase(gradeReportItem.getCourseCode(), font));
        table.addCell(cell);
        cell.setPhrase(new Phrase(gradeReportItem.getCourseName(), font));
        table.addCell(cell);
        cell.setPhrase(new Phrase(gradeReportItem.getCohort(), font));
        table.addCell(cell);
        cell.setPhrase(new Phrase(gradeReportItem.getGrade(), font));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(cell);
        cell.setPhrase(new Phrase(gradeReportItem.getGradePoint(), font));
        table.addCell(cell);

        cell.setPhrase(new Phrase(gradeReportItem.getGrade() == null ? "" : String.valueOf(gradeReportItem.getCredit()), font));
        table.addCell(cell);
        cell.setPhrase(new Phrase(gradeReportItem.getRemarks(), font));
        table.addCell(cell);

    }


}
