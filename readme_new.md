# KIM HA NEUL 포트폴리오

웹 퍼블리셔의 경력과 퍼블리싱 작업, 브랜드 프로젝트, 디자인 작업을 소개하는 원페이지 포트폴리오입니다. HTML·CSS·JavaScript로 구성되며 별도의 패키지 설치나 빌드 과정이 필요하지 않습니다.

- 홈페이지: <https://supergarlic715.github.io/portfolio/>
- 저장소: <https://github.com/SuperGarlic715/portfolio>
- 연락처: garlic0715@naver.com

이 문서는 현재 저장소의 코드와 파일 구조를 기준으로 작성한 새 안내입니다. 기존 `README.md`는 변경하지 않았으며, 기존 문서에 기록된 과거 최적화 수치와 수정 완료 내역을 현재 상태로 보증하지 않습니다.

## 로컬 실행

Python 3이 설치된 환경에서 저장소 루트로 이동한 뒤 실행합니다.

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000/`을 엽니다. 종료는 서버 터미널에서 `Ctrl+C`를 누릅니다.

`index.html`을 `file://` 방식으로 직접 열면 소스 뷰어의 `fetch()` 요청이 제한될 수 있으므로 HTTP 서버 사용을 권장합니다. 이 프로젝트에는 `npm install`, 별도 빌드, 데이터베이스나 API 키가 필요하지 않습니다.

## 화면 구성

| 순서 | 영역 | 내용 |
| --- | --- | --- |
| 1 | HERO | WebGL 배경과 소개, ABOUT ME로 이동 |
| 2 | ABOUT ME | 경력과 사용 기술 |
| 3 | WORK | 썬시멘트·엠텍정보기술·부곡컨트리클럽·에코산업개발 퍼블리싱 작업 |
| 4 | PUREP | Photography·Detail Page·Website 대표 프로젝트 |
| 5 | PROJECT | 프로젝트 아카이브 14개 카드 |
| 6 | CONTACT | Blueprint 스타일의 이메일 연락 영역 |

상단 메뉴는 ABOUT ME → WORK → PROJECT → CONTACT 순서입니다. PUREP는 WORK의 대표 사례로 분류되어 해당 구간에서도 WORK 메뉴가 활성화됩니다.

## 주요 기능

### 메뉴와 스크롤 전환

- 아래로 스크롤하면 헤더가 숨겨지고 위로 조금 스크롤하면 다시 나타납니다.
- 모바일 메뉴를 열면 헤더를 유지하며, Esc·바깥 클릭·메뉴 선택으로 닫습니다.
- HERO에서 ABOUT ME로 넘어갈 때 GSAP ScrollTrigger로 배경과 글자색을 전환합니다.
- WORK 하단 여백에 접근하면 WORK와 PUREP의 배경이 함께 흰색으로 전환됩니다. 여백만 따로 덮는 흰색 오버레이는 사용하지 않습니다.
- 탭 복귀·페이지 복원·창 크기 변경 시 스크롤 전환 진행률을 동기화합니다.
- 동작 줄이기 설정(`prefers-reduced-motion`)에 따라 일부 애니메이션을 생략합니다.

### 퍼블리싱 작업과 소스 뷰어

- **퍼블리싱 데모 보기**: 저장소의 각 프로젝트 `index.html`을 새 탭으로 엽니다.
- **코드 보기**: 홈페이지 내부 모달에서 해당 프로젝트의 HTML·CSS·JavaScript를 읽기 전용으로 표시합니다.
- 소스 목록은 `js/source-manifest.json`에 저장됩니다. 파일 내용은 선택 시 HTTP 요청으로 읽습니다.

프로젝트의 HTML·CSS·JavaScript 파일을 추가·삭제하거나 이름을 변경했을 때는 루트에서 목록을 갱신합니다.

```bash
python3 scripts/generate-source-manifest.py
```

이 명령은 추적 파일인 `js/source-manifest.json`을 다시 작성합니다. 생성된 변경도 검토해 함께 반영해야 합니다.

### PUREP 대표 프로젝트

| 카드 | 클릭 동작 | 사용 자료 |
| --- | --- | --- |
| Photography | 촬영 이미지 모달 갤러리 | 현재 사진 목록은 비어 있으며 `이미지 준비중` 표시 |
| Detail Page | PC에서 화면 너비·높이 약 80%의 모달, 모바일에서 확대된 모달 | `images/brand/purep-detail.png` |
| Website | PUREP 실제 HTML을 새 탭으로 열기 | `projects/purep/index.html` |

Detail Page 모달의 **오픈마켓에서 보기** 버튼은 다음 주소로 연결됩니다.

<https://smartstore.naver.com/purep/products/11994081727>

촬영 사진은 파일을 저장한 뒤 `js/purep-feature.js`의 `photographs` 배열에 등록합니다.

```javascript
const photographs = [
  { src: 'images/brand/purep-photo-01.jpg', alt: 'PUREP 제품 정면 촬영' },
  { src: 'images/brand/purep-photo-02.jpg', alt: 'PUREP 제품 측면 촬영' }
];
```

위 파일명은 등록 형식을 설명하는 예시이며, 현재 제공되는 사진 파일이 아닙니다. 갤러리에는 이전·다음 버튼과 좌우 방향키 이동이 구현되어 있습니다.

### 프로젝트 아카이브

- 최초 6개 카드를 표시하며 **더보기**를 누르면 최대 6개씩 추가합니다.
- 추가 카드는 순차적으로 나타나며, 동작 줄이기 설정에서는 애니메이션을 생략합니다.
- 각 카드 설정에 따라 운영 사이트·로컬 데모·작업물 이미지 모달로 연결됩니다.
- 믿음레이저 PUREP 카드는 브랜드 데모를 새 탭으로 엽니다.
- 스마트시설관리 대시보드의 작업물 보기에는 PC와 모바일을 겹쳐 배치한 이미지가 표시됩니다.
- 경남 대시보드의 회사명과 스마트시설관리의 사무실·개발자 식별 문구는 공개 목업 이미지에서 가렸습니다.

아카이브 썸네일 영역은 `16:10`이며 기본적으로 `object-fit: cover`를 사용합니다. 새 이미지는 **1600×1000px** 제작을 권장하며, 중요한 기기·문구는 가장자리에서 여유를 두고 배치합니다. PUREP 대표 섹션의 카드 크기는 별도 CSS를 사용합니다.

### CONTACT

- 옅은 격자와 브라우저 윤곽을 배경으로 사용하는 간결한 Blueprint 구성입니다.
- 이메일 주소, 주소 복사, 메일 보내기만 표시합니다.
- 전화번호와 이력서 다운로드는 CONTACT에서 제거했습니다.
- 메일 링크는 사용자의 기본 메일 앱을 엽니다. 별도의 메일 발송 서버는 없습니다.
- 주소 복사는 Clipboard API를 사용하며 실패하면 직접 복사 안내를 표시합니다.

## 프로젝트 데모

아래 수량은 저장소에 있는 HTML 파일 수이며, 빈 템플릿과 약관 페이지 등을 포함합니다. 고유하게 디자인한 화면 수나 실제 운영 기능 수를 의미하지 않습니다.

| 프로젝트 | 경로 | HTML 파일 수 | 데모 |
| --- | --- | --- | --- |
| 썬시멘트 | `projects/suncement/` | 30 | [열기](https://supergarlic715.github.io/portfolio/projects/suncement/index.html) |
| 엠텍정보기술 | `projects/mtek/` | 35 | [열기](https://supergarlic715.github.io/portfolio/projects/mtek/index.html) |
| 부곡컨트리클럽 | `projects/bugok/` | 45 | [열기](https://supergarlic715.github.io/portfolio/projects/bugok/index.html) |
| 에코산업개발 | `projects/eco/` | 33 | [열기](https://supergarlic715.github.io/portfolio/projects/eco/index.html) |
| PUREP | `projects/purep/` | 16 | [열기](https://supergarlic715.github.io/portfolio/projects/purep/index.html) |

데모는 정적 퍼블리싱 결과물입니다. 로그인·예약·게시판 등록·문의 접수와 같은 서버 기능이 실제로 제공된다는 의미는 아닙니다. 썬시멘트의 `board_lists.html`은 끊어진 링크를 방지하기 위해 추가한 빈 게시판 화면입니다.

PUREP 메인 영상은 YouTube 임베드 `WX0QbUyMJiA`를 사용합니다. 데스크톱에서는 음소거 자동 재생을 요청하고, 실제 재생 시간이 진행된 것을 확인한 뒤 영상을 표시합니다. 로딩·정지·오류 상태와 모바일에서는 제품 사진을 사용합니다. 화면 높이는 `100dvh`를 우선하고 구형 브라우저를 위해 `100vh`를 대체값으로 둡니다. YouTube UI·자동 재생 정책은 브라우저와 서비스 상태의 영향을 받습니다.

## 파일 구조

```text
index.html                      포트폴리오 진입점
css/thema/
  basic.css                     공통 변수, 리셋, 버튼, 테마
  main.css                      주요 섹션과 아카이브 스타일
  nav.css                       헤더와 모바일 메뉴
  footer.css                    포트폴리오 푸터
  purep-feature.css              PUREP 카드·모달·WORK 배경 전환
  contact.css                    이메일 전용 CONTACT
  source-viewer.css             소스 뷰어
js/
  nav.js                        메뉴, 스크롤 방향별 헤더 표시
  main.js                       이메일 복사 등 공통 기능
  mesh-gradient.js              HERO WebGL 배경
  hero-transition.js            HERO → ABOUT ME 전환
  purep-transition.js           WORK → PUREP 전환
  scroll-transition-sync.js     전환 상태 복원과 동기화
  section-reveal.js              AOS 섹션 노출
  purep-feature.js               PUREP 모달·촬영 갤러리
  archive.js                    더보기·아카이브 이미지 모달
  source-viewer.js               소스 탐색과 표시
  source-manifest.json           프로젝트별 소스 목록
images/
  common/                       파비콘·공유 이미지
  work/                         퍼블리싱 작업 PC·모바일 캡처
  archive/                      아카이브와 대표 프로젝트 목업
  brand/                        PUREP 상세페이지 이미지
projects/                       정적 프로젝트 데모 5개
scripts/generate-source-manifest.py
```

프로젝트마다 CSS·JavaScript의 위치와 구조가 다릅니다. 예를 들어 엠텍 푸터는 별도 `css/footer.css`가 아니라 `projects/mtek/css/thema/basic.css`에 정의되어 있습니다.

## 외부 의존성과 배포

프로젝트에는 라이브러리 일부가 저장소에 포함되어 있습니다. 웹폰트 등은 CDN을 사용하며, YouTube·지도·운영 사이트·스마트스토어는 외부 서비스입니다. 오프라인 환경에서는 해당 콘텐츠가 제한될 수 있습니다.

현재 공개 주소는 GitHub Pages의 `/portfolio/` 하위 경로입니다. 내부 링크는 이 하위 경로를 유지하도록 상대경로를 사용해야 합니다. GitHub Pages는 파일명의 대소문자를 구분하므로 경로를 실제 파일명과 정확히 맞춥니다.

변경 사항을 커밋하고 `main`에 푸시한 뒤, GitHub Pages 배포 상태를 확인합니다. 푸시 성공만으로 공개 페이지 배포 완료가 보장되지는 않습니다. 배포 후 실제 홈페이지에서 해당 변경을 재확인합니다. 저장소에 전용 빌드나 자동화된 테스트 명령은 정의되어 있지 않습니다.

## 검증 방법

1. 로컬 HTTP 서버로 홈페이지와 각 프로젝트를 엽니다.
2. PC와 모바일 크기에서 가로 넘침·이미지 잘림·메뉴 동작을 확인합니다.
3. 퍼블리싱 데모 링크와 코드 보기, 아카이브 더보기, PUREP 모달, 이메일 복사를 확인합니다.
4. 맨 아래에서 맨 위로 돌아오기, 탭을 전환했다 복귀하기, 동작 줄이기 설정에서 배경 상태를 확인합니다.
5. 개발자 도구에서 JavaScript 오류와 로컬 리소스의 404 응답을 확인합니다. 외부 서비스 차단과 로컬 파일 누락은 구분합니다.

개별 JavaScript 파일 구문은 Node.js가 있을 때 다음과 같이 확인할 수 있습니다.

```bash
node --check js/nav.js
node --check js/purep-feature.js
node --check js/archive.js
```

구문 검사 통과는 실제 화면 동작을 보증하지 않습니다.

## 확인된 남은 사항

다음은 현재 저장소에서 확인한 제한과 정리 대상입니다. 이미 해결한 항목을 다시 미완료 목록에 포함하지 않도록 관리합니다.

### 포트폴리오

- `index.html`의 메타 설명에 이전 프로젝트 수를 가리키는 `3곳, 90여 개` 문구가 남아 있습니다. 현재 표시 내용에 맞춰 갱신이 필요합니다.
- `og:url`이 비어 있고 `og:image`는 상대경로입니다. 공개 주소에 맞춘 설정이 필요합니다.
- Photography 갤러리의 원본 사진은 추후 등록해야 합니다.
- `files/resume.pdf`는 없습니다. 현재 CONTACT에는 다운로드 링크가 없어 필수 실행 파일은 아닙니다.

### 부곡컨트리클럽

- 일부 로고 링크의 `href="/"`는 프로젝트가 아닌 배포 사이트의 루트로 이동합니다.
- 일부 예약·회원·사이트맵 링크가 없는 페이지를 가리킵니다.
- 메인 영상 포스터 `images/thema/main/visual_poster.jpg`가 없습니다.
- `gallery_lists.html`에 없는 jQuery 3.3.1과 `js/sub_side.js` 참조, 일부 갤러리 이미지 누락이 남아 있습니다.
- 메인 영상은 현재 약 71MiB입니다. 기존 README의 12MB 최적화 완료 설명과 다릅니다.

### 엠텍정보기술

- 일부 루트 경로 링크, 게시글 수정 링크, 이미지 경로 등 추가 정리 대상이 남아 있습니다.
- `sub2_2_1.html`에서 PC 가로 넘침이 확인된 바 있어 레이아웃 보완이 필요합니다.
- `Potable_BD` 이미지 대소문자 오류는 수정했고, 없는 `tab-hover.js`와 `css/footer.css` 참조는 제거했습니다.

### PUREP

- `css/product.css` 4행에 잘못된 폰트 문자열이 남아 있습니다.
- `sub3_2.html`은 홍보영상 메뉴의 갤러리 화면이며 `images/gallery_01.jpg`~`03.jpg`가 없습니다.
- 문의 메뉴의 `sub4_3.html`·`sub4_4.html`, 게시글 수정 페이지와 일부 검색·보안문자 이미지가 없습니다.
- `sub4_2.html`에 없는 `css/bootstrap.min.css` 참조가 남아 있습니다.
- `point_cutting.gif`는 약 12MiB로, 페이지 로딩 비용을 줄일 여지가 있습니다.

과거 이미지 변환 개수·원본 용량·전체 기능의 운영 가능 여부는 이 문서에서 검증 완료로 주장하지 않습니다.
