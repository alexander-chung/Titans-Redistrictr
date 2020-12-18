echo this is the monitor script for job ${1}
ssh talin@login.seawulf.stonybrook.edu "COMPLETE=false
FILE=~/titans_temp/job_districtings/job${1}/status
while [ \$COMPLETE = false ]
do
  if test -f \$FILE; then
    status=\$(<\$FILE)
    if [ \$status == \"COMPLETE\" ]; then
      COMPLETE=true
    fi
  else
    sleep 600
  fi
done
exit"