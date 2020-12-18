#!/usr/bin/env bash

#SBATCH --job-name=titans_seawulf_job
#SBATCH --output=titans_seawulf_job.out
#SBATCH --ntasks-per-node=28
#SBATCH --nodes=4
#SBATCH --time=24:00:00
#SBATCH -p long-28core

cat << EOF > mpi_algostarter.py
from mpi4py import MPI
import sys
import json
import time
import os


start_time = time.time()

comm = MPI.COMM_WORLD
size = comm.Get_size()
rank = comm.Get_rank()

with open("submitted_jobs/seawulf_job.json") as f:
    data = json.load(f)
job_id = data["id"]
num_districtings = data["numDistrictings"]

# one master process at rank 0 and rest are workers
if rank == 0:
    print("rank {}: size: {} num_districtings: {}".format(rank, size, num_districtings))
    districting_ctr = 0
    while districting_ctr < num_districtings:
        print("rank {}: ok im looping".format(rank))
        # send out size at a time
        i = 1
        while i < size:
            if i + districting_ctr > num_districtings:
                data = {'work_on_this' : -1}
                print("rank {}: sending to worker {} districting -1".format(rank, i))
            else:
                data = {'work_on_this' : i + districting_ctr}
                print("rank {}: sending to worker {} districting {}".format(rank, i, i + districting_ctr))
            req = comm.isend(data, dest=i, tag=11)
            req.wait()
            i += 1
        districting_ctr += size-1

    # everything is issued out so send out a -1 to everyone
    for k in range(1, size):
        data = {'work_on_this' : -1}
        comm.isend(data, dest=k, tag=11)

else:
    districting_to_work_on = 1
    while districting_to_work_on > 0:
        req = comm.irecv(source=0, tag=11)
        data = req.wait()
        districting_to_work_on = data['work_on_this']
        if districting_to_work_on > 0:
            print("rank {}: I gotta work on districting #{}".format(rank, districting_to_work_on))
            os.system("module load anaconda && python algorithm.py {}".format(districting_to_work_on))

print("rank {}: ok im done".format(rank))
comm.barrier()

if rank == 0:
    status_f = open("job_districtings/job{}/status".format(job_id), "w")
    status_f.write("COMPLETE")

print("completed in {:2f}s for rank {}:".format(time.time() - start_time, rank))

EOF

start=`date +%s`

module load mpi4py

job_id=$(cat submitted_jobs/seawulf_job.json | python3 -c "import sys, json; print(json.load(sys.stdin)['id'])")
mkdir -p job_districtings/job"$job_id"
echo RUNNING > job_districtings/job"$job_id"/status
date
echo job $job_id
echo starting algorithm
mpirun -np 112 python mpi_algostarter.py

end=`date +%s`
runtime=$((end-start))
echo runtime: $runtime
