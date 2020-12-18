# usage: seawulf_extract.sh [job number] [number of districtings]
mkdir -p src/main/resources/jobs/job"${1}"
scp talin@login.seawulf.stonybrook.edu:~/titans_temp/job_districtings/job"${1}"/*.json src/main/resources/jobs/job"${1}"