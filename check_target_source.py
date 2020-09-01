import os

target_files, target_directories, source_files, source_directories = (
    [] for _ in range(4))

for root, dirs, files in os.walk("./src/"):
    for file in files:
        source_files.append(file)
    for subs in dirs:
        source_directories.append(subs)

for root, dirs, files in os.walk("./dist/"):
    for file in files:
        target_files.append(file)
    for subs in dirs:
        target_directories.append(subs)

if (len(source_directories) == len(target_directories)):
    print('Successful directory checks')

else:
    def delta_check(source, targ):
        s = set(targ)
        deltas = [x for x in source_directories if x not in s]
        if (len(deltas) != 0):
            return deltas
        else:
            from collections import Counter
            duplicates = Counter()
            for dups in source_directories:
                duplicates[dups] = target_directories.count(dups)
            return duplicates

    print('Mismatched directory count \n')
    print(delta_check(source_directories, target_directories))
