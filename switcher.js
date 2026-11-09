// Demo sitesinde tasarımlar arasında geçiş düğmesi. Yayın sırasında her tasarımın
// sayfasına eklenir; sitenin kendi kodunda yer almaz. Stiller gölge DOM içinde kalır.
(() => {
  const DESIGNS = [
    { slug: 'yuzey', name: 'Yüzey', note: 'Optik yüzey zemin, belge sayfaları' },
    { slug: 'ufuk', name: 'Ufuk', note: 'Yatay yolculuk, ufuk çizgisi' },
    { slug: 'iz', name: 'İz', note: 'Şeritlerde akan çizgi' },
    { slug: 'sahne', name: 'Sahne', note: 'Tam ekran sinematik sahneler' },
  ];
  const parts = location.pathname.split('/').filter(Boolean);
  const current = DESIGNS.find((d) => parts.includes(d.slug));
  if (!current) return;

  const host = document.createElement('div');
  host.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:2147483000';
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `
    <style>
      :host { all: initial; }
      * { box-sizing: border-box; font-family: "Also Sans", "Helvetica Neue", Arial, sans-serif; }
      .wrap { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
      .toggle, .list { background: rgba(13, 26, 54, 0.92); color: #fff; border: 1px solid rgba(255,255,255,0.16);
        -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); box-shadow: 0 12px 40px -16px rgba(0,0,0,0.6); }
      .toggle { display: inline-flex; align-items: center; gap: 10px; height: 40px; padding: 0 16px; border-radius: 999px;
        font-size: 13.5px; cursor: pointer; }
      .toggle span { color: rgba(255,255,255,0.6); }
      .toggle i { width: 7px; height: 7px; border-left: 1.5px solid currentColor; border-top: 1.5px solid currentColor;
        transform: translateY(2px) rotate(45deg); transition: transform .3s; }
      .open .toggle i { transform: translateY(-2px) rotate(225deg); }
      .list { display: none; min-width: 240px; padding: 6px; border-radius: 16px; }
      .open .list { display: block; }
      a { display: block; padding: 10px 12px; border-radius: 10px; color: #fff; text-decoration: none; font-size: 14px; }
      a small { display: block; margin-top: 2px; font-size: 12px; color: rgba(255,255,255,0.55); }
      a:hover { background: rgba(255,255,255,0.08); }
      a[aria-current] { background: #f47e52; color: #0d1a36; }
      a[aria-current] small { color: rgba(13,26,54,0.7); }
      .all { border-top: 1px solid rgba(255,255,255,0.12); margin-top: 4px; border-radius: 0 0 10px 10px; font-size: 13px; color: rgba(255,255,255,0.7); }
    </style>
    <div class="wrap">
      <nav class="list" aria-label="Tasarımlar">
        ${DESIGNS.map((d) => `<a href="../${d.slug}/"${d === current ? ' aria-current="page"' : ''}>${d.name}<small>${d.note}</small></a>`).join('')}
        <a class="all" href="../">Tüm tasarımlar</a>
      </nav>
      <button class="toggle" aria-expanded="false"><span>Tasarım</span>${current.name}<i aria-hidden="true"></i></button>
    </div>`;
  const wrap = root.querySelector('.wrap');
  const toggle = root.querySelector('.toggle');
  toggle.addEventListener('click', () => {
    const open = !wrap.classList.contains('open');
    wrap.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.body.append(host);
})();
