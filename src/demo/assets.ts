// Local SVG illustrations: no image service or network connection is required.
const wrap = (content: string) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="280" height="210" viewBox="0 0 280 210">${content}</svg>`)}`;

export const lampImage = wrap(`
  <defs><linearGradient id="shade" x2="1" y2="1"><stop stop-color="#f5ac75"/><stop offset="1" stop-color="#d16a39"/></linearGradient><linearGradient id="base" x2="1" y2="0"><stop stop-color="#b8734e"/><stop offset=".5" stop-color="#e5b992"/><stop offset="1" stop-color="#b8734e"/></linearGradient></defs>
  <ellipse cx="143" cy="185" rx="69" ry="9" fill="#6f4b3d" opacity=".1"/>
  <path d="M136 86h13v88h-13z" fill="url(#base)"/><ellipse cx="142" cy="177" rx="43" ry="9" fill="#a86d47"/><ellipse cx="142" cy="173" rx="43" ry="9" fill="#d9ae84"/>
  <path d="M101 35h82l25 75H77z" fill="url(#shade)"/><ellipse cx="142" cy="110" rx="65" ry="9" fill="#9e492a"/><ellipse cx="142" cy="108" rx="57" ry="5" fill="#ffd7a3"/><path d="M105 38l-16 64" stroke="#ffd0a6" stroke-width="3" opacity=".65"/>`);

export const headphonesImage = wrap(`
  <defs><linearGradient id="band"><stop stop-color="#293d39"/><stop offset=".5" stop-color="#5c7770"/><stop offset="1" stop-color="#233c36"/></linearGradient><linearGradient id="cup" x2="1" y2="1"><stop stop-color="#69867c"/><stop offset="1" stop-color="#304e43"/></linearGradient></defs>
  <ellipse cx="141" cy="186" rx="72" ry="8" fill="#31533e" opacity=".12"/>
  <path d="M79 128V94a61 61 0 0 1 122 0v34" fill="none" stroke="url(#band)" stroke-width="20"/><path d="M81 92a59 59 0 0 1 118 0" fill="none" stroke="#8da99a" stroke-width="5"/>
  <rect x="61" y="100" width="44" height="78" rx="21" fill="url(#cup)" transform="rotate(-9 83 139)"/><rect x="177" y="100" width="44" height="78" rx="21" fill="url(#cup)" transform="rotate(9 199 139)"/>
  <rect x="88" y="111" width="13" height="57" rx="6" fill="#233c34"/><rect x="181" y="111" width="13" height="57" rx="6" fill="#233c34"/><path d="M69 114v40" stroke="#91b1a0" stroke-width="3" stroke-linecap="round"/>`);

export const plantImage = wrap(`
  <defs><linearGradient id="pot" x2="1"><stop stop-color="#c6b8a1"/><stop offset=".5" stop-color="#e9dcc8"/><stop offset="1" stop-color="#beaf96"/></linearGradient></defs>
  <ellipse cx="142" cy="189" rx="57" ry="8" fill="#5e6244" opacity=".1"/>
  <path d="M142 145V55M142 106l-32-32M143 94l34-31M142 133l-42-22M142 123l37-15" fill="none" stroke="#466842" stroke-width="4"/>
  <path d="M141 83c-37-28-25-54 2-58 22 23 21 42-2 58" fill="#688c51"/><path d="M112 87c-36-2-49-19-42-41 32-1 48 15 42 41" fill="#466e42"/><path d="M169 80c-2-34 14-50 38-48 7 27-12 44-38 48" fill="#7c9b5d"/>
  <path d="M110 123c-34 5-52-7-55-30 26-9 47 1 55 30" fill="#7b965e"/><path d="M169 121c-4-29 10-45 36-45 7 26-7 42-36 45" fill="#4e7544"/>
  <ellipse cx="141" cy="139" rx="36" ry="10" fill="#b5a58c"/><path d="M105 137h72l-9 45q-27 15-54 0z" fill="url(#pot)"/><ellipse cx="141" cy="137" rx="30" ry="6" fill="#62503a"/>`);

export const mugImage = wrap(`
  <defs><linearGradient id="mug" x2="1"><stop stop-color="#b9a6cb"/><stop offset=".45" stop-color="#dfd4e6"/><stop offset="1" stop-color="#bca5cc"/></linearGradient></defs>
  <ellipse cx="140" cy="183" rx="61" ry="8" fill="#6d567b" opacity=".1"/><path d="M177 80h16q29 0 29 34t-37 34" fill="none" stroke="#bfa9cd" stroke-width="14"/>
  <path d="M86 67h98v94q-49 30-98 0z" fill="url(#mug)"/><ellipse cx="135" cy="68" rx="49" ry="13" fill="#e2d9e9"/><ellipse cx="135" cy="68" rx="40" ry="8" fill="#8a6c78"/><path d="M101 88v61" stroke="#f8f1fb" stroke-width="4" opacity=".7" stroke-linecap="round"/>`);
