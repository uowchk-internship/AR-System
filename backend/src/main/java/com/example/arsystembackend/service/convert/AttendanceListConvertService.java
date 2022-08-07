package com.example.arsystembackend.service.convert;

import com.example.arsystembackend.entity.source.Argo10;
import com.example.arsystembackend.entity.source.Argo12;
import com.example.arsystembackend.service.source.Argo12Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AttendanceListConvertService {
    private Argo12Services argo12Services;

    Map<String, List<Argo12>> argo12Map = new HashMap<>();

    @Autowired
    public AttendanceListConvertService(Argo12Services argo12Services) {
        this.argo12Services = argo12Services;
        updateHashmap();
    }

    public void updateHashmap() {
        argo12Map = new HashMap<>();

        List<Argo12> fullArgo12List = argo12Services.getAll();

        for (Argo12 item : fullArgo12List) {
            String crn = item.getCrn();
            List<Argo12> valueInMap = argo12Map.get(crn);
            if (valueInMap != null) {
                valueInMap.add(item);
                argo12Map.put(crn, valueInMap);
            } else {
                valueInMap = new ArrayList<>();
                valueInMap.add(item);
                argo12Map.put(crn, valueInMap);
            }
        }
    }

    public List<Argo12> getArgo12ListByCrn(String crn) {
        return argo12Map.get(crn);
    }
}
