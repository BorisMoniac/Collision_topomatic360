import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
  unlinkSync,
} from "node:fs";
import { resolve, dirname } from "node:path";
const root = process.cwd(),
  version = JSON.parse(
    readFileSync(resolve(root, "package.json"), "utf8"),
  ).version;
const url = "https://borismoniac.github.io/Collision_topomatic360/";
const install =
  "https://360.topomatic.ru/?extensionInstallPath=" + encodeURIComponent(url);
const html = `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>НашеПО · Проверки коллизий</title><style>:root{color-scheme:dark;font:17px/1.6 system-ui;background:#111923;color:#e5edf7}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;box-sizing:border-box}main{max-width:800px;padding:36px;background:#1d2a39;border:1px solid #3a4b61;border-radius:18px}h1{font-size:38px;line-height:1.2}p,li{color:#b5c6d9}input{box-sizing:border-box;width:100%;font:14px ui-monospace,monospace;background:#121d2a;color:#e5edf7;border:1px solid #4b607b;padding:13px;border-radius:7px;margin:8px 0}.buttons{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0 24px}a{color:#e8c763}button,.button{background:#e8c763;color:#1a2432;border:0;border-radius:7px;padding:10px 15px;font:inherit;text-decoration:none;cursor:pointer}small{color:#a3b5ca}@media(max-width:600px){main{padding:22px}h1{font-size:28px}}</style><main><small>Версия ${version}</small><h1>НашеПО · Проверки коллизий</h1><p>Бесплатный плагин для поиска пересечений и дубликатов в моделях Топоматик 360. Создавайте выборки по свойствам, запускайте проверки и передавайте результаты коллегам.</p><label for="address">Адрес плагина</label><input id="address" readonly value="${url}"><div class="buttons"><button id="copy">Копировать ссылку</button><a class="button" href="${install}">Установить в веб-версии</a></div><ol><li>Откройте раздел «Плагины» в Топоматик 360.</li><li>Нажмите «Установить плагин» и вставьте адрес выше.</li><li>После установки перезапустите приложение или обновите страницу веб-версии.</li><li>Откройте проект с IFC/SMDX, затем нижнюю вкладку «Проверки».</li><li>Обновите модели, создайте проверку и задайте выборки А и Б.</li></ol><p>Пересечения проверяются по треугольной геометрии; вложенность — для замкнутых тел. Поиск дубликатов распознаёт совпадающие треугольники в одном месте. Разная триангуляция одинаковой формы пока не сопоставляется.</p><p><a href="https://nashepo.ru/">НашеПО</a> · <a href="https://t.me/RoburFan">Telegram</a> · <a href="https://github.com/BorisMoniac/Collision_topomatic360">Исходный код</a></p></main><script>const b=document.getElementById('copy'),i=document.getElementById('address');b.onclick=async()=>{try{await navigator.clipboard.writeText(i.value)}catch{i.select();document.execCommand('copy')}b.textContent='Скопировано'}</script></html>`;
writeFileSync(resolve(root, "dist/index.html"), html);
const out = resolve(root, "docs");
mkdirSync(out, { recursive: true });
if (existsSync(resolve(out, "js")))
  for (const f of readdirSync(resolve(out, "js"), { withFileTypes: true }))
    if (f.isFile()) unlinkSync(resolve(out, "js", f.name));
const manifest = JSON.parse(
  readFileSync(resolve(root, "dist/package.json"), "utf8"),
);
for (const file of ["index.html", "package.json", manifest.main]) {
  const target = resolve(out, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, readFileSync(resolve(root, "dist", file)));
}
writeFileSync(resolve(out, ".nojekyll"), "");
