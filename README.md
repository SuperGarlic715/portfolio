# KIM HA NEUL 포트폴리오

웹 퍼블리셔 지원용 원페이지 포트폴리오입니다. 기존 작업과 같은 방식으로 `css/thema/`, `js/` 로 나눠 두었습니다.

```
index.html
css/thema/basic.css   색상 변수, 리셋, 버튼 (다크 모드 포함)
css/thema/nav.css     헤더, 모바일 메뉴
css/thema/main.css    히어로, 소개, 작업, 디자인, 연락처
css/thema/footer.css
js/nav.js             메뉴, 현재 섹션 표시, 맨 위로
js/main.js            이름 실측 칩, 이메일 복사, 시안 이미지 자리, 미입력 링크 안내
images/common/        파비콘 (og-image.png 포함)
images/work/          작업 캡처 (PC 1440 / 모바일 390)
images/design/        ← 디자인 시안 이미지 4장을 여기에
files/                ← resume.pdf 를 여기에
projects/bugok|eco|purep   데모 사이트 (아래 수정 내역 참고)
```

## 1. 제출 전에 채울 것

주황 점선으로 표시된 곳이 채울 자리입니다. 브라우저 개발자도구 콘솔에 남은 개수가 나옵니다. 0이 되면 제출해도 됩니다.

- [ ] 경력 2줄 (기간, 회사명, 팀/직무, 담당 업무 한 문장) — `index.html` 소개 섹션
- [ ] 작업 3개의 퍼블리싱 기여도 %
- [ ] 다루는 기술의 '도구' 줄 — 실제로 쓰는 것만
- [ ] 이메일 3곳 (`mailto:`, `data-copy`, 화면 표시) + 전화(선택) + GitHub
- [ ] `files/resume.pdf` 넣기
- [ ] 디자인 시안 4개: `images/design/design01.jpg ~ 04.jpg` (1600×1000 권장), 제목·설명, Figma 공유 링크
- [ ] 각 작업의 '코드 보기' 링크 (GitHub 저장소). 없으면 버튼 줄을 지워도 됩니다
- [ ] 링크를 넣은 `<a>` 에서 `data-todo-link` 속성 지우기
- [ ] 배포 주소가 정해지면 `<meta property="og:url">`, `og:image` 를 절대 주소로
- [ ] 코드 프로젝트를 2개만 넣으려면 `<article class="work_item">` 하나와 히어로·meta 문구의 '3곳, 90여 개'를 고치기

## 2. 배포 (Netlify)

1. 이 폴더 전체를 Netlify 대시보드의 Sites → 'Deploy manually' 영역에 끌어다 놓기
2. 나온 주소에서 PC와 휴대폰으로 각 '사이트 열기' 버튼이 데모를 여는지 확인
3. 도메인을 연결했다면 1번 체크리스트의 og 주소 수정 후 다시 배포

용량은 약 62MB입니다. 이 중 데모 사이트가 대부분을 차지합니다.

## 3. 데모 사이트 수정 내역 (자동 적용)

원본 zip은 그대로 두고 복사본만 고쳤습니다. 파일 구조와 파일명 규칙은 유지했고, 이미지 확장자가 바뀐 경우 HTML·CSS 참조도 함께 바꿨습니다.

### 부곡컨트리클럽 (projects/bugok) — 101.3MB → 29MB

- 400KB 이상 PNG 7개를 가로 최대 1920px로 줄이고 변환 (불투명 → JPG, 투명 → WebP). HTML·CSS 참조 경로도 함께 수정
- href="/" 와 "/로 시작하는 경로"를 상대경로로 변경 (45개 파일). projects/bugok/ 같은 하위 폴더에서도 로고·CSS가 제자리를 찾음
- 없는 파일을 가리키던 경로 32곳을 실제 파일 위치로 보정
- 약관 페이지(etc/)에서 프로젝트에 없는 slick 라이브러리 링크 제거
- css/thema/basic.css 끝에 한글 줄바꿈(keep-all) 보정 추가, 유틸 메뉴 줄바꿈 방지
- 영상이 뜨기 전 보여 줄 poster 이미지(images/thema/main/visual_poster.jpg)를 영상 18초 지점에서 추출해 추가
- 메인 영상 video/main_visual.mp4 를 소리 없이 다시 인코딩 (74MB → 12MB, 1920px 유지)
- 파비콘 favicon.ico 가 없어 로고 엠블럼으로 만들어 추가
- gallery_lists.html : 없는 jquery-3.3.1 → 프로젝트에 있는 jquery-3.7.1 로 변경
- 없는 sub4_3.html 링크를 첫 하위 페이지 sub4_3_1.html 로 연결

### (주)에코산업개발 (projects/eco) — 149.4MB → 9.9MB

- 400KB 이상 PNG 52개를 가로 최대 1920px로 줄이고 변환 (불투명 → JPG, 투명 → WebP). HTML·CSS 참조 경로도 함께 수정
- href="/" 와 "/로 시작하는 경로"를 상대경로로 변경 (32개 파일). projects/eco/ 같은 하위 폴더에서도 로고·CSS가 제자리를 찾음
- 없는 파일을 가리키던 경로 44곳을 실제 파일 위치로 보정
- css/thema/basic.css 끝에 한글 줄바꿈(keep-all) 보정 추가
- css/thema/main.css : 없는 경로(thema/main/slide02·03)를 가리키던 메인 슬라이드 배경을 thema/common 폴더의 실제 파일로 연결 — 의도한 이미지가 맞는지 확인 필요
- 약관·사이트맵(etc/page/) 페이지의 JS·파비콘 경로를 ../../ 기준으로 보정 (기존엔 스크립트가 전부 404)

### PUREP (projects/purep) — 41.2MB → 23MB

- 400KB 이상 PNG 1개를 가로 최대 1920px로 줄이고 변환 (불투명 → JPG, 투명 → WebP). HTML·CSS 참조 경로도 함께 수정
- href="/" 와 "/로 시작하는 경로"를 상대경로로 변경 (16개 파일). projects/purep/ 같은 하위 폴더에서도 로고·CSS가 제자리를 찾음
- 없는 파일을 가리키던 경로 17곳을 실제 파일 위치로 보정
- css/basic.css 끝에 한글 줄바꿈(keep-all) 보정 추가, 모바일 가로 스크롤 제거
- index.html : 없는 .video_swiper를 감시하던 IntersectionObserver 오류 수정
- index.html : 개발자도구에서 복사돼 들어간 aos-init aos-animate 클래스 9곳 제거 (AOS가 직접 붙임)
- images/sub/product/purep_device.svg 안에 들어 있던 2761×5252 PNG를 WebP로 바꿔 다시 넣음 (16.8MB → 77KB, 파일명·마크업 그대로)
- 잘못된 파비콘 경로 image/favicon.ico → images/favicon.ico (16개 페이지)
- /board/board_lists.html (없는 파일) → board_list.html
- AOS fade-left/right 시작 위치 때문에 생기던 모바일 가로 스크롤 제거 (css/basic.css 끝)

공통으로 모든 사이트의 기본 CSS 끝에 `body {word-break: keep-all;}` 을 추가했습니다. 모바일에서 '기술,'이 '기 / 술,'로, '장치'가 '장 / 치'로 끊기던 문제가 없어집니다.

## 4. 남은 수정 제안 (직접 판단이 필요해 손대지 않은 것)

### 부곡컨트리클럽 (projects/bugok)

- 메뉴의 sub5_1~3.html (회원관리 하위 3개) 페이지가 없음 — 만들거나 메뉴에서 빼기
- 사이트맵의 certificate.html, contact.html, sub2_3·2_4.html 링크가 없는 페이지를 가리킴
- view.html 의 board_edit.html, gallery_lists.html 의 js/sub_side.js 없음
- 팝업 '오늘 하루 보지 않기' 체크박스에 저장 기능이 없음 → localStorage 에 날짜 저장 후 확인하는 코드 추가
- 팝업이 keyboard:false 라 Esc 로 닫히지 않음 → true 로
- 맨 위로 버튼이 <div> → <button type="button" aria-label="맨 위로">
- 45개 페이지 <title> 이 전부 '부곡컨트리클럽' → '예약안내 | 부곡컨트리클럽' 처럼 페이지명 넣기
- 390px 화면에서 로고와 '로그인' 사이가 붙음 → 모바일에서는 유틸 메뉴를 드로어 안으로 옮기는 것을 권장

### (주)에코산업개발 (projects/eco)

- index.html·board_lists.html 의 view.html (게시글 상세) 없음
- 사이트맵의 sub1_5, sub1_6, sub3, sub5, gallery_lists 링크가 없는 페이지를 가리킴
- 모든 페이지 <title> 이 '(주)에코산업개발' 하나 → 페이지명 넣기

### PUREP (projects/purep)

- images/sub/product/point_cutting.gif 12.7MB — MP4로 바꾸고 <video autoplay muted loop playsinline> 로 교체하면 1MB 안팎
- 메뉴의 sub4_3.html, sub4_4.html (1:1 문의·대량구매 문의 메뉴) 없음 — board_form.html / board_form_bulk.html 로 연결할지 결정 필요
- sub3_2.html 갤러리 이미지 3장, captcha_sample.png, refresh.png, board_lock.png, search_icon.svg, search_arrow.svg 없음
- sub4_2.html 의 css/bootstrap.min.css 없음 (안 쓰면 줄 삭제)
- board_view.html 의 board_edit.html 없음

## 5. 면접 전 점검

- 데모를 휴대폰으로 열어 메뉴 열기·닫기, 슬라이더 넘기기를 직접 해 보기 (면접관이 가장 먼저 해 봅니다)
- 각 작업의 '구현한 부분'은 코드에서 확인한 내용으로 적었습니다. 직접 하지 않은 부분이 있으면 빼 주세요
