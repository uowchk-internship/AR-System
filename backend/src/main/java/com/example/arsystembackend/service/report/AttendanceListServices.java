package com.example.arsystembackend.service.report;

import com.example.arsystembackend.entity.source.Argo12;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

@Service
public class AttendanceListServices {

    int rowCounter;
    List<Argo12> argo12List;
    Workbook workbook;
    Sheet sheet;
    CellStyle headerStyle;
    CellStyle boldStyle;

    public AttendanceListServices(List<Argo12> argo12List) {
        this.rowCounter = 0;
        this.argo12List = argo12List;

        this.workbook = new XSSFWorkbook();
        this.sheet = workbook.createSheet("Attendance");

        //Header orange style
        this.headerStyle = workbook.createCellStyle();
        headerStyle.setFillForegroundColor(IndexedColors.LIGHT_ORANGE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFFont font = ((XSSFWorkbook) workbook).createFont();
        font.setBold(true);
        headerStyle.setFont(font);

        //Bold style
        this.boldStyle = workbook.createCellStyle();
        boldStyle.setFont(font);
    }

    public void exportExcel(OutputStream response) throws IOException {
        this.argo12List = argo12List;

        sheet.setColumnWidth(0, 5000);
        sheet.setColumnWidth(1, 2500);
//        sheet.setColumnWidth(2, 6000);

        firstRow();
        secondRow();
        thirdRow();


        for (Argo12 argo12 : argo12List) {
            bodyRow(sheet, argo12);
        }

        workbook.write(response);
        workbook.close();
    }

    public void firstRow() {
        //1st row: title
        Row title = sheet.createRow(rowCounter);
        Cell titleCell = title.createCell(1);
        titleCell.setCellValue("Course:");
        titleCell.setCellStyle(boldStyle);
        titleCell = title.createCell(2);
        titleCell.setCellValue(argo12List.get(0).getCourseCode());
        titleCell = title.createCell(3);
        titleCell.setCellValue(argo12List.get(0).getCourseTitle());
    }

    public void secondRow() {
        //2nd row
        Row title = sheet.createRow(++rowCounter);
        Cell titleCell = title.createCell(1);
        titleCell.setCellValue("CRN:");
        titleCell.setCellStyle(boldStyle);
        titleCell = title.createCell(2);
        titleCell.setCellValue(argo12List.get(0).getCrn());
        titleCell = title.createCell(3);
        titleCell.setCellValue("Session:");
        titleCell.setCellStyle(boldStyle);
        titleCell = title.createCell(4);
        titleCell.setCellValue(argo12List.get(0).getSubjType());
        titleCell = title.createCell(5);
        titleCell.setCellValue("Cohort:");
        titleCell.setCellStyle(boldStyle);
        titleCell = title.createCell(6);
        titleCell.setCellValue(convertIntoTermString(argo12List.get(0).getTermCode()));

    }

    public void thirdRow() {
        //3rd row: header
        int cellCounter = 0;
        Row header = sheet.createRow(++rowCounter);
        Cell headerCell = header.createCell(cellCounter);
        headerCell.setCellValue("Studnet Name");
        headerCell.setCellStyle(headerStyle);
        headerCell = header.createCell(++cellCounter);
        headerCell.setCellValue("SID");
        headerCell.setCellStyle(headerStyle);

        for (int i = 1; i <= 13; i++) {
            headerCell = header.createCell(++cellCounter);
            headerCell.setCellValue("wk"+i);
            headerCell.setCellStyle(headerStyle);
        }

    }

    public void bodyRow(Sheet sheet, Argo12 argo12) {
        rowCounter++;
        Row row = sheet.createRow(rowCounter);
        Cell cell = row.createCell(0);
        cell.setCellValue(argo12.getStudentName());
        cell = row.createCell(1);
        cell.setCellValue(argo12.getStudNo());

//            cell = row.createCell(1);
//            cell.setCellValue(20);

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

}
