from pathlib import Path
path = Path('src/views/Home/IndexPage.vue')
for i,line in enumerate(path.read_text(encoding='utf-8').splitlines()):
    if 'deep' in line:
        print(i+1, repr(line))
        if i > 330:
            break
