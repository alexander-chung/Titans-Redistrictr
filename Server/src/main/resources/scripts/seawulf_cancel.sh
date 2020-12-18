echo canceling seawulfjob
ssh talin@login.seawulf.stonybrook.edu 'source /etc/profile.d/modules.sh; module load slurm; scancel -u talin'