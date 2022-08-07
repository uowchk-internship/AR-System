package com.example.arsystembackend.controller.api.report;

import com.example.arsystembackend.entity.report.grade.GradeReport;
import com.example.arsystembackend.entity.report.grade.GradeTemp;
import com.example.arsystembackend.service.convert.GradeReportConvertService;
import com.example.arsystembackend.service.report.GradeReportServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RestController
@RequestMapping("/api/report/grade")
public class grade {

    private GradeReportConvertService gradeReportConvertService;

    @Autowired
    public grade(GradeReportConvertService gradeReportConvertService) {
        this.gradeReportConvertService = gradeReportConvertService;
    }

    @PostMapping("/tempResult")
    public GradeTemp getTempResult(@RequestBody List<String> idList) {
        System.out.println(idList.stream().count());
        return gradeReportConvertService.getTempResult(idList);
    }

    @GetMapping("/updateHashmap")
    public String generateWithId() {
        System.out.println("Start---Update hashmap");
        gradeReportConvertService.updateHashmap();
        System.out.println("Finish---Update hashmap");
        return "ok";
    }

    @GetMapping("/single/{headerType}/{sid}")
    public void downloadSingleDeliveryNoteCsv(HttpServletResponse response, @PathVariable String sid, @PathVariable String headerType) throws IOException {
//        String fileHeader = "attachment; filename="+"demo"+".pdf";
        String fileHeader = headerType+"; filename=" + sid + ".pdf";
        response.setContentType("application/pdf");
        response.addHeader("Content-Disposition", fileHeader);

        //Get student info
        GradeReport reportInfo = gradeReportConvertService.getSingleStudent(sid, false);

        GradeReportServices gradeReportServices = new GradeReportServices();
        gradeReportServices.export(response.getOutputStream(), reportInfo);
    }

    @PostMapping("/zip")
    public void downloadZip(HttpServletResponse response, @RequestParam Map<String, String> body) throws IOException {
        List<String> sidList = Arrays.asList(body.get("sid").split(","));

        response.setContentType("application/zip");
        response.setHeader("Content-Disposition", "attachment; filename=GradeReports.zip");
        ZipOutputStream zipOut = new ZipOutputStream(response.getOutputStream());

        //Get student info
        List<GradeReport> reportList = gradeReportConvertService.getResultByIdList(sidList);

        System.out.println("Total reports generated: " + reportList.size());

        for (GradeReport gradeReport : reportList) {
            String filename = gradeReport.getSid() + ".pdf";
            ByteArrayOutputStream fileOutputStream = new ByteArrayOutputStream();
            GradeReportServices gradeReportServices = new GradeReportServices();
            gradeReportServices.export(fileOutputStream, gradeReport);


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
