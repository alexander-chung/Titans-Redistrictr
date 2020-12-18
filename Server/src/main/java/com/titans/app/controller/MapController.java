package com.titans.app.controller;

import com.titans.app.enums.MinorityGroup;
import com.titans.app.enums.StateEnum;
import com.titans.app.handler.MapHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController("/map")
public class MapController {
    @Autowired
    private MapHandler mapHandler;

    @GetMapping("/getPrecincts")
    public @ResponseBody Object getPrecincts(@RequestParam StateEnum state) {
        return mapHandler.getPrecincts(state);
    }

    @GetMapping("/getEnactedDistricting")
    public @ResponseBody Object getEnactedDistricting(@RequestParam StateEnum state) { return mapHandler.getEnactedDistricting(state); }

    @GetMapping("/getSummaryData")
    public @ResponseBody Object getSummaryData(@RequestParam int jobid) { return mapHandler.getSummaryData(jobid); }

    @GetMapping("/getBoxData")
    public @ResponseBody Object getBoxData(@RequestParam int jobid) { return mapHandler.getBoxData(jobid); }

}
