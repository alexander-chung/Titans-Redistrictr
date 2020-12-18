#!/usr/bin/env bash

#SBATCH --job-name=titans_seawulf_job
#SBATCH --output=titans_seawulf_job.out
#SBATCH --ntasks-per-node=28
#SBATCH --nodes=1
#SBATCH --time=24:00:00
#SBATCH -p extended-28core

module load gnu-parallel/6.0
module load anaconda/3

job_id=`cat submitted_jobs/seawulf_job.json | python3 -c "import sys, json; print(json.load(sys.stdin)['id'])"`
num_districtings=`cat submitted_jobs/seawulf_job.json | python3 -c "import sys, json; print(json.load(sys.stdin)['numDistrictings'])"`
job_ctr=1

mkdir -p job_districtings/job"$job_id"
touch job_districtings/job"$job_id"/commands
while [ $job_ctr -le $num_districtings ]
do
  echo python3 algorithm.py $job_ctr >> job_districtings/job"$job_id"/commands
  ((job_ctr=job_ctr+1))
done

date
echo job $job_id
echo

echo RUNNING > job_districtings/job"$job_id"/status
parallel --verbose --jobs $num_districtings < job_districtings/job"$job_id"/commands
echo COMPLETE > job_districtings/job"$job_id"/status
