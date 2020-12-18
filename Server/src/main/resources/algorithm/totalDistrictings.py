from multiprocessing import Pool, Queue, Process, Manager
import signal
import os
from os import system
import json

with open('src/main/resources/json/local_job.json') as f:
    config = json.load(f)

num_readers = 4
NUMBER_OF_DISTRICTINGS = config['numDistrictings']
ALGO_FILE_NAME = "src/main/resources/algorithm/algorithm.py"

dir = "src/main/resources/jobs/job{}".format(config["id"])
if not os.path.isdir(dir):
    os.makedirs(dir)

def init_worker():
    """
    Pool worker initializer for keyboard interrupt on Windows
    """
    signal.signal(signal.SIGINT, signal.SIG_IGN)


def reader(i, q):
    """
    Queue reader worker
    """
    if q.empty():
        return

    districtingID = q.get()
    cmd = "python %s %i" % (ALGO_FILE_NAME, districtingID)
    system(cmd)
    # Read the top message from the queue
    return


if __name__ == "__main__":
    # Create manager
    m = Manager()

    # Create multiprocessing queue
    q = m.Queue()

    for i in range(NUMBER_OF_DISTRICTINGS):
        q.put(i + 1)

    # Create multiprocessing pool
    p = Pool(num_readers, init_worker)

    # Create a group of parallel readers and start them
    # Number of readers is matching the number of writers
    # However, the number of simultaneously running
    # readers is constrained to the pool size
    readers = []
    for i in range(NUMBER_OF_DISTRICTINGS):
        readers.append(p.apply_async(reader, (i, q,)))

    # Wait for the asynchrounous reader threads to finish
    try:
        [r.get() for r in readers]
    except Exception as e:
        print(e)
        p.terminate()
        p.join()

