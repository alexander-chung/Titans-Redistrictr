echo starting seawulf slurm script
cat src/main/resources/scripts/mpi_batch.slurm | ssh talin@login.seawulf.stonybrook.edu 'source /etc/profile.d/modules.sh; module load slurm; cd ~/titans_temp/; sbatch'