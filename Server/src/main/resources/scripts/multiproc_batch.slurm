#!/usr/bin/env bash

#SBATCH --job-name=titans_seawulf_job
#SBATCH --output=titans_seawulf_job.out
#SBATCH --ntasks-per-node=28
#SBATCH --nodes=2
#SBATCH --time=24:00:00
#SBATCH -p extended-28core

module load anaconda/3

job_id=$(cat submitted_jobs/seawulf_job.json | python3 -c "import sys, json; print(json.load(sys.stdin)['id'])")
mkdir -p job_districtings/job"$job_id"
echo RUNNING > job_districtings/job"$job_id"/status

date
echo job $job_id
echo starting algorithm
python3 totalDistrictings.py

echo COMPLETE > job_districtings/job"$job_id"/status
