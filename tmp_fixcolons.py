from pathlib import Path
path = Path('src/views/Home/IndexPage.vue')
text = path.read_text(encoding='utf-8')
print(text.count(':::v-deep'))
print(text.count('::v-deep'))
text = text.replace(':::v-deep', '::v-deep')
path.write_text(text, encoding='utf-8')
