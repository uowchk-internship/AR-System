package com.example.arsystembackend.controller.api.report;

import com.example.arsystembackend.entity.source.Argo12;
import com.example.arsystembackend.service.convert.AttendanceListConvertService;
import com.example.arsystembackend.service.report.AttendanceListServices;
import com.example.arsystembackend.service.report.GradeReportServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RestController
@RequestMapping("/api/report/attendanceList")
public class attendanceList {

    private AttendanceListConvertService attendanceListConvertService;

    @Autowired
    public attendanceList(AttendanceListConvertService attendanceListConvertService) {
        this.attendanceListConvertService = attendanceListConvertService;
    }

    @GetMapping("/updateHashmap")
    public void updateHashmap() {
        attendanceListConvertService.updateHashmap();
    }


    @PostMapping("/zip")
    public void downloadZip(HttpServletResponse response, @RequestParam Map<String, String> body) throws IOException {
        List<String> crnList = Arrays.asList(body.get("crn").split(","));

        if (crnList.stream().count() == 1) {
            List<Argo12> argo12ListByCrn = attendanceListConvertService.getArgo12ListByCrn(crnList.get(0));

//        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            String courseCode = argo12ListByCrn.get(0).getCourseCode();
            String session = argo12ListByCrn.get(0).getSubjType();

            response.setHeader("Content-Disposition", "attachment; filename=" + courseCode + "-" + session + ".xlsx");

            ServletOutputStream outputStream = response.getOutputStream();

            AttendanceListServices attendanceListServices = new AttendanceListServices(argo12ListByCrn);
            attendanceListServices.exportExcel(outputStream);

        } else {


            response.setContentType("application/zip");
            response.setHeader("Content-Disposition", "attachment; filename=GradeReports.zip");
            ZipOutputStream zipOut = new ZipOutputStream(response.getOutputStream());

            for (String crn : crnList) {
                List<Argo12> argo12ListByCrn = attendanceListConvertService.getArgo12ListByCrn(crn);

                String courseCode = argo12ListByCrn.get(0).getCourseCode();
                String session = argo12ListByCrn.get(0).getSubjType();

                String filename = courseCode + "-" + session + ".xlsx";
                ByteArrayOutputStream fileOutputStream = new ByteArrayOutputStream();
                AttendanceListServices attendanceListServices = new AttendanceListServices(argo12ListByCrn);
                attendanceListServices.exportExcel(fileOutputStream);


                byte[] bytes = fileOutputStream.toByteArray();

                ZipEntry zipEntry = new ZipEntry(filename);
                zipOut.putNextEntry(zipEntry);

                zipOut.write(bytes);

                zipOut.closeEntry();

            }
            zipOut.finish();
            zipOut.close();
        }

    }


//    @GetMapping("/demo")
//    public void excelDemo(HttpServletResponse response) throws IOException {
//        List<Argo12> argo12ListByCrn = attendanceListConvertService.getArgo12ListByCrn("10773");
//
////        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
//        response.setHeader("Content-Disposition", "attachment; filename=demo.xlsx");
//
//        ServletOutputStream outputStream = response.getOutputStream();
//
//        AttendanceListServices attendanceListServices = new AttendanceListServices(argo12ListByCrn);
//        attendanceListServices.exportExcel(outputStream);
//
//
//    }
}
