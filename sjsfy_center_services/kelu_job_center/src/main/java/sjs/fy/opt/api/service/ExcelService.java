package sjs.fy.opt.api.service;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.util.IOUtils;
import org.springframework.stereotype.Component;
import sjs.fy.opt.api.constant._Constant;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.Map;

/**
 * Created by jinguowei on 17/5/24.
 */
@Component
public class ExcelService {

    /**
     * 生成盘面的Label的EXCEL
     * @param id
     * @param rowHeader
     * @param rowData
     * @return
     */
    public boolean createJobExcel(String id, String[] rowHeader, String[] rowData){

        try{
            File file = new File(_Constant.LOCAL_PATH_KELU_LABEL+"\\" + id + ".xls");
            if(file.exists()){
                file.delete();
            }
            Workbook wb = new HSSFWorkbook();
            Sheet sheet = wb.createSheet();

            Row header = sheet.createRow((short)0);
            for(int i=0;i<rowHeader.length;i++){
                header.createCell(i).setCellValue(rowHeader[i]);
            }
            Row data = sheet.createRow((short)1);
            for(int i=0;i<rowHeader.length;i++){
                data.createCell(i).setCellValue(rowData[i]);
            }
            FileOutputStream fileOut = new FileOutputStream(file);
            wb.write(fileOut);
            fileOut.close();
        }catch (Exception e){

        } finally {

        }
        return true;
    }

    /**
     * 生成盘面的Label的EXCEL
     * @param id
     * @return
     */
    public boolean createJobLabel(String id){

        try{
            File src = new File(_Constant.LOCAL_PATH_KELU_LABEL + "\\template.std");
            File desc = new File(_Constant.LOCAL_PATH_KELU_LABEL + "\\"+id +".std");
            IOUtils.copy(new FileInputStream(src),new FileOutputStream(desc));
        }catch (Exception e){

        } finally {

        }
        return true;
    }
}
