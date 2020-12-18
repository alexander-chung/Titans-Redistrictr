package com.titans.app.handler;

import com.fasterxml.jackson.core.util.DefaultPrettyPrinter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.titans.app.entity.Job;
import com.titans.app.enums.ComputeLocation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
public class DispatchHandler {
    @Value("${seawulf.threshold}")
    private int threshold;

    public ComputeLocation determineComputeLocation(int numDistrictings) {
        return numDistrictings > threshold ? ComputeLocation.SEAWULF : ComputeLocation.LOCAL;
    }

    public Process startLocalJob(Job job) throws IOException {
        packageLocalData(job);
        ProcessBuilder pb = new ProcessBuilder("python", "src/main/resources/algorithm/totalDistrictings.py");
        pb.redirectErrorStream(true);
        return pb.start();
    }

    public Process startSeaWulfJob(Job job) throws IOException {
        packageSeawulfData(job);
        String command = "scp src/main/resources/json/seawulf_job.json talin@login.seawulf.stonybrook.edu:~/titans_temp/submitted_jobs";
        Runtime.getRuntime().exec(command);
        command = "cmd.exe /c set PATH=C:\\cygwin64\\bin;%PATH% && C:\\cygwin64\\bin\\bash src/main/resources/scripts/seawulf_submit.sh";
        return Runtime.getRuntime().exec(command);
    }

    private void packageLocalData(Job job) {
        try {
            System.out.println("PACKING LOCAL JOB");
            ObjectMapper mapper = new ObjectMapper();
            ObjectWriter writer = mapper.writer(new DefaultPrettyPrinter());
            writer.writeValue(new File("src/main/resources/json/local_job.json"), job);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void packageSeawulfData(Job job) {
        try {
            System.out.println("PACKING SEAWULF JOB");
            ObjectMapper mapper = new ObjectMapper();
            ObjectWriter writer = mapper.writer(new DefaultPrettyPrinter());
            writer.writeValue(new File("src/main/resources/json/seawulf_job.json"), job);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Process monitorSeawulfJob(Job job) throws IOException {
        System.out.println("Checking for job" + job.getId() + "'s status");
        String command = "cmd.exe /c set PATH=C:\\cygwin64\\bin;%PATH% && C:\\cygwin64\\bin\\bash "
                + "src/main/resources/scripts/seawulf_monitor.sh "
                + job.getId();
        return Runtime.getRuntime().exec(command);
    }

    public Process extractSeawulfDistrictings(int jobId, int numDistrictings) throws IOException  {
        String command = "cmd.exe /c set PATH=C:\\cygwin64\\bin;%PATH% && C:\\cygwin64\\bin\\bash "
                + "src/main/resources/scripts/seawulf_extract.sh "
                + jobId + " " + numDistrictings;
        return Runtime.getRuntime().exec(command);
    }

    public void cancelSeawulfJob() throws IOException {
        String command = "cmd.exe /c set PATH=C:\\cygwin64\\bin;%PATH% && C:\\cygwin64\\bin\\bash "
                + "src/main/resources/scripts/seawulf_cancel.sh";
        Runtime.getRuntime().exec(command);
    }

    public void printProcessOutput(Process process) {
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder builder = new StringBuilder();
            String line = null;
            while((line = reader.readLine()) != null) {
                builder.append(line);
                builder.append(System.getProperty("line.separator"));
            }
            String result = builder.toString();
            System.out.println("Job log:");
            System.out.println(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
