// عدّل هذه القيم فقط
var SITE = {
  owner: "Shidomohd2",
  repo: "taghyeer",
  asset: "taghyeer.apk",
  creator: "عبدالرحمن",
  creatorUrl: "https://www.instagram.com/3bod.t7/",
  contact: "mailto:alrasheeds87@gmail.com",
  sha256: "5aa0b37c96c147b38f3fd549d6400bbc251558b9fdc6b7ecf725093943148eb0"
};

var base = "https://github.com/" + SITE.owner + "/" + SITE.repo;
document.getElementById("dl").href = base + "/releases/latest/download/" + SITE.asset;
var c = document.getElementById("creator");
c.textContent = SITE.creator; c.href = SITE.creatorUrl;
document.getElementById("contact").href = SITE.contact;
if (SITE.sha256) {
  var s = document.getElementById("sha");
  s.textContent = "بصمة الملف SHA-256: " + SITE.sha256; s.hidden = false;
}

document.querySelectorAll("figure img").forEach(function (img) {
  function mark() { img.parentElement.classList.add("empty"); }
  img.addEventListener("error", mark);
  if (img.complete && img.naturalWidth === 0) mark();
});

// عداد التحميلات: قراءة عامة من GitHub، بلا تتبع للزوار.
fetch("https://api.github.com/repos/" + SITE.owner + "/" + SITE.repo + "/releases?per_page=100")
  .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
  .then(function (rel) {
    var total = 0, latest = null;
    rel.forEach(function (r) {
      if (r.draft) return;
      r.assets.forEach(function (a) {
        if (a.name === SITE.asset) {
          total += a.download_count;
          if (!latest) latest = { tag: r.tag_name, size: a.size };
        }
      });
    });
    if (!latest) return;
    var mb = (latest.size / 1048576).toFixed(1);
    var m = document.getElementById("meta");
    m.textContent = "الإصدار " + latest.tag + " · " + mb + " ميغابايت · حُمِّل " +
      total.toLocaleString("en") + " مرة";
    m.hidden = false;
  })
  .catch(function () {});
