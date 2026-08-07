// 씨앤에이케어 서비스워커 — "홈 화면에 추가(PWA 설치)"를 위한 최소 구성
//
// 아이폰(Safari)에서 데이터가 안 뜨는 문제가 있어서, 실제 요청을 가로채는 로직을
// 전부 제거하고 "설치 요건만 충족하는" 가장 안전한 형태로 만들었습니다.
// 즉, 이 서비스워커는 어떤 요청도 대신 처리하지 않고, 전부 브라우저 기본 동작 그대로
// 흘려보냅니다 — Firebase 데이터 로딩과는 완전히 무관하게 동작합니다.
const CACHE_NAME = 'cnacare-shell-v2';
const SHELL_FILES = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_FILES).catch(() => {})) // 캐싱 실패해도 설치 자체는 계속 진행
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// 의도적으로 아무 요청도 가로채지 않음(요청을 대신 처리하지 않음).
// respondWith()를 전혀 호출하지 않으므로, 모든 요청(같은 사이트든 Firebase 같은 외부 서버든)이
// 서비스워커 없이 접속했을 때와 완전히 동일하게 처리됩니다.
self.addEventListener('fetch', () => {});
